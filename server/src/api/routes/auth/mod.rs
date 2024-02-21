mod error;
mod sign_in;
mod sign_out;
mod sign_up;

pub use error::*;

use crate::api::routes::ReqState;
use axum::{
    async_trait, extract::FromRequestParts, http::request, routing::post, RequestPartsExt, Router,
};
use axum_extra::{
    headers::{authorization::Bearer, Authorization},
    TypedHeader,
};
use garde::Validate;
use hmac::{Hmac, Mac};
use jwt::VerifyWithKey;
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use sha2::Sha256;
use sign_in::signin_handler;
use sign_up::signup_handler;
use sign_out::signout_handler;
use specta::Type;
use std::{
    env,
    time::{SystemTime, UNIX_EPOCH},
};

#[derive(Debug, Type, Deserialize, Validate)]
pub struct PasswordCredentials {
    #[garde(alphanumeric, length(min = 2, max = 32))]
    username: String,
    #[garde(length(min = 4))]
    password: String,
}

lazy_static! {
    static ref JWT_SECRET: String = env::var("JWT_SECRET").expect("missing jwt secret");
    pub(super) static ref PRIVATE_KEY: Hmac<Sha256> = Hmac::new_from_slice(JWT_SECRET.as_bytes())
        .expect("unable to generate private key from jwt secret");
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TokenClaims {
    sub: i64,
    exp: u64,
}

#[async_trait]
impl FromRequestParts<ReqState> for TokenClaims {
    type Rejection = AuthError;

    async fn from_request_parts(
        parts: &mut request::Parts,
        state: &ReqState,
    ) -> Result<Self, Self::Rejection> {
        let TypedHeader(Authorization(bearer)) = parts
            .extract::<TypedHeader<Authorization<Bearer>>>()
            .await
            .map_err(|_| AuthError::InvalidToken)?;

        let claims: TokenClaims = bearer
            .token()
            .verify_with_key(&*PRIVATE_KEY)
            .map_err(|_| AuthError::InvalidToken)?;

        if claims.exp
            > SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .map_err(|_| AuthError::InternalError)?
                .as_secs()
        {
            return Ok(claims);
        }

        return Ok(claims);
    }
}

pub fn router() -> Router<ReqState> {
    Router::new()
        .route("/sign-in", post(signin_handler))
        .route("/sign-out", post(signout_handler))
        .route("/sign-up", post(signup_handler))
}
