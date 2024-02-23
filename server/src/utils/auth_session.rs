use super::{ApiError, ID};
use crate::router::ReqState;
use axum::{async_trait, extract::FromRequestParts};
use axum_extra::extract::{cookie::Cookie, SignedCookieJar};
use garde::rules::AsStr;
use serde::{Deserialize, Serialize};
use time::{Duration, OffsetDateTime};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AuthToken {
    pub id: ID,
    pub user_id: ID,
    pub session_id: ID,
    pub refresh_exp: OffsetDateTime,
}

impl AuthToken {
    pub fn new(user_id: ID, session_id: ID) -> Self {
        Self {
            id: ID::new(),
            user_id,
            session_id,
            refresh_exp: OffsetDateTime::now_utc().saturating_add(10 * Duration::MINUTE),
        }
    }
}

const COOKIE_KEY: &str = "session";

impl From<AuthToken> for Cookie<'static> {
    fn from(value: AuthToken) -> Self {
        let token = serde_json::to_string(&value).expect("error serializing auth token");
        Self::new(COOKIE_KEY, token)
    }
}

#[async_trait]
impl FromRequestParts<ReqState> for AuthToken {
    type Rejection = ApiError;

    async fn from_request_parts(
        parts: &mut axum::http::request::Parts,
        state: &ReqState,
    ) -> Result<Self, Self::Rejection> {
        let cookie = <SignedCookieJar>::from_request_parts(parts, state)
            .await
            .ok()
            .and_then(|c| c.get(COOKIE_KEY))
            .ok_or(ApiError::Unauthorized)?;

        serde_json::from_str(cookie.value().as_str()).map_err(|_| ApiError::Unauthorized)
    }
}
