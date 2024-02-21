use super::{TokenClaims, PRIVATE_KEY};
use crate::api::routes::{
    auth::{AuthError, PasswordCredentials},
    ReqState,
};
use argon2::{Argon2, PasswordHash, PasswordVerifier};
use axum::extract::{Json, Query, State};
use garde::Validate;
use jwt::SignWithKey;
use serde::{Deserialize, Serialize};
use sqlx::query_as;
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Debug, Deserialize)]
struct UserRecord {
    id: i64,
    password: String,
}

#[derive(Debug, Serialize)]
pub struct SigninResponse {
    refresh_token: String,
}

pub async fn signin_handler(
    state: State<ReqState>,
    body: Json<PasswordCredentials>,
) -> Result<Json<SigninResponse>, AuthError> {
    body
        .validate(&())
        .map_err(|_| AuthError::InvalidCredentials)?;

    let user = query_as!(
        UserRecord,
        r"SELECT users.id, password
          FROM users JOIN auth ON users.id = auth.id
          WHERE users.username = $1;",
        body.username
    )
    .fetch_one(state.db.as_ref())
    .await
    .map_err(|e| match e {
        sqlx::Error::RowNotFound => AuthError::UserNotFound,
        _ => AuthError::InternalError,
    })?;

    let parsed_hash = PasswordHash::new(&user.password).map_err(|_| AuthError::InternalError)?;
    Argon2::default()
        .verify_password(body.password.as_bytes(), &parsed_hash)
        .map_err(|_| AuthError::InvalidCredentials)?;

    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|_| AuthError::InternalError)?;

    let session_claims = TokenClaims {
        sub: user.id,
        exp: timestamp.as_secs() + (365 * 24 * 60 * 60),
    };

    let refresh_claims = TokenClaims {
        exp: timestamp.as_secs() + (10 * 60),
        ..session_claims
    };

    let session_token = session_claims
        .sign_with_key(&*PRIVATE_KEY)
        .map_err(|_| AuthError::InternalError)?;

    let refresh_token = refresh_claims
        .sign_with_key(&*PRIVATE_KEY)
        .map_err(|_| AuthError::InternalError)?;

    sqlx::query!(
        "UPDATE auth SET session_token = $1 WHERE id = $2;",
        session_token,
        user.id
    )
    .execute(state.db.as_ref())
    .await
    .map_err(|_| AuthError::InternalError)?;

    Ok(Json(SigninResponse { refresh_token }))
}
