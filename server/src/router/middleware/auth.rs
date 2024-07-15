use crate::{
    router::ReqState,
    utils::{ApiError, ApiResult, ID},
};
use axum::{
    async_trait,
    extract::{FromRequestParts, MatchedPath, Request, State},
    http::{request, HeaderMap},
    middleware::Next,
    response::{IntoResponse, IntoResponseParts, Response, ResponseParts},
};
use axum_extra::extract::{
    cookie::{self, Cookie},
    SignedCookieJar,
};
use cached::proc_macro::cached;
use garde::rules::AsStr;
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use sqlx::{query, query_scalar};
use std::{env, collections::HashSet};
use time::{Duration, OffsetDateTime};
use tracing::error;

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AuthToken {
    #[serde(rename = "uid")]
    pub user_id: ID,
    #[serde(rename = "sid")]
    pub session_id: ID,
    #[serde(rename = "exp")]
    pub expires_at: OffsetDateTime,
}

lazy_static! {
    static ref SESSION_TTL: Duration = Duration::DAY * 365;
    static ref TOKEN_TTL: Duration = Duration::MINUTE * 10;
}

impl AuthToken {
    const COOKIE_KEY: &'static str = "session";

    pub fn from_headers(headers: &HeaderMap) -> ApiResult<Self> {
        SignedCookieJar::from_headers(headers, get_cookie_signing_key()?)
            .get(AuthToken::COOKIE_KEY)
            .and_then(|c| serde_json::from_str(c.value().as_str()).ok())
            .ok_or(ApiError::Unauthorized)
    }

    pub async fn new_session(state: &ReqState, user_id: ID) -> ApiResult<Self> {
        let now = OffsetDateTime::now_utc();
        let session_exp = now.clone() + *SESSION_TTL;
        let token = AuthToken {
            user_id,
            session_id: ID::new(),
            expires_at: now + *TOKEN_TTL,
        };

        query!(
            "INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)",
            token.session_id,
            token.user_id,
            session_exp
        )
        .execute(state.db.as_ref())
        .await
        .map_err(|_| ApiError::InternalError)?;

        Ok(token)
    }

    pub async fn refresh(&mut self, state: &ReqState) -> ApiResult<()> {
        let session_exp = query_scalar!(
            "SELECT expires_at FROM sessions WHERE id = $1",
            self.session_id
        )
        .fetch_one(state.db.as_ref())
        .await
        .map_err(|_| ApiError::Unauthorized)?;

        let now = OffsetDateTime::now_utc();
        if session_exp < now {
            return Err(ApiError::Unauthorized);
        }

        self.expires_at = session_exp.min(now + *TOKEN_TTL);
        Ok(())
    }
}

#[cached(time = 30, sync_writes = true, result = true)]
fn get_cookie_signing_key() -> Result<cookie::Key, ApiError> {
    match env::var("AUTH_SECRET") {
        Ok(secret) => Ok(cookie::Key::derive_from(secret.as_bytes())),
        Err(err) => {
            error!("error getting auth secret: {}", err);
            Err(ApiError::InternalError)
        }
    }
}

impl IntoResponseParts for AuthToken {
    type Error = ApiError;

    fn into_response_parts(self, res: ResponseParts) -> Result<ResponseParts, Self::Error> {
        let token = serde_json::to_string(&self).expect("error serializing auth token");
        let cookie = Cookie::build((Self::COOKIE_KEY, token))
            .secure(true)
            .build();
        SignedCookieJar::new(get_cookie_signing_key()?)
            .add(cookie)
            .into_response_parts(res)
            .map_err(|_| ApiError::InternalError)
    }
}

#[async_trait]
impl FromRequestParts<ReqState> for AuthToken {
    type Rejection = ApiError;

    async fn from_request_parts(
        parts: &mut request::Parts,
        state: &ReqState,
    ) -> Result<Self, Self::Rejection> {
        if let Some(token) = parts.extensions.get::<Self>() {
            return Ok(token.clone());
        }

        let mut token = Self::from_headers(&parts.headers)?;
        if token.expires_at < OffsetDateTime::now_utc() {
            token.refresh(state).await?;
        }

        Ok(token)
    }
}

lazy_static! {
    static ref WHITELIST: HashSet<&'static str> = {
        let mut set = HashSet::new();
        set
    };
}

pub async fn auth_layer(
    State(state): State<ReqState>,
    path: MatchedPath,
    mut req: Request,
    next: Next,
) -> Response {
    let mut token = match AuthToken::from_headers(req.headers()) {
        Ok(token) => token,
        Err(err) => return err.into_response(),
    };

    let refresh = token.expires_at < OffsetDateTime::now_utc();
    if refresh {
        if let Err(err) = token.refresh(&state).await {
            return err.into_response();
        }
    }

    req.extensions_mut().insert(token);
    let response = next.run(req).await;

    return if refresh {
        (token, response).into_response()
    } else {
        response
    };
}
