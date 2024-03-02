use super::PasswordCredentials;
use crate::{
    router::ReqState,
    utils::{ApiError, ApiResult, AuthToken, ID},
};
use argon2::{Argon2, PasswordHash, PasswordVerifier};
use axum::{
    extract::{Json, State},
    response::IntoResponse,
};
use axum_extra::extract::SignedCookieJar;
use garde::Validate;
use serde::Deserialize;
use sqlx::{query, query_as, types::time::PrimitiveDateTime};
use time::{Duration, OffsetDateTime};

#[derive(Debug, Deserialize)]
struct UserRecord {
    id: ID,
    password: String,
}

pub async fn signin_handler(
    state: State<ReqState>,
    body: Json<PasswordCredentials>,
) -> ApiResult<impl IntoResponse> {
    body.validate(&())?;

    let user = query_as!(
        UserRecord,
        "SELECT id, password FROM users WHERE username = $1",
        body.username
    )
    .fetch_one(state.db.as_ref())
    .await
    .map_err(|e| match e {
        sqlx::Error::RowNotFound => ApiError::Message("No account with that username".into()),
        _ => ApiError::InternalError,
    })?;

    let parsed_hash = PasswordHash::new(&user.password).map_err(|_| ApiError::InternalError)?;
    Argon2::default()
        .verify_password(body.password.as_bytes(), &parsed_hash)
        .map_err(|_| ApiError::Message("Wrong password".into()))?;

    let session_id = ID::new();
    let _session_expires = OffsetDateTime::now_utc().saturating_add(365 * Duration::DAY);
    let session_expires = PrimitiveDateTime::new(_session_expires.date(), _session_expires.time());

    let token = AuthToken::new(user.id, session_id);

    query!(
        "INSERT INTO sessions (id, user_id, refresh_id, expires_at) VALUES ($1, $2, $3, $4)",
        session_id.into_inner(),
        user.id.into_inner(),
        token.id.into_inner(),
        session_expires
    )
    .execute(state.db.as_ref())
    .await
    .map_err(|_| ApiError::InternalError)?;

    Ok((
        SignedCookieJar::new(state.auth_key.clone()).add(token),
        Json(()),
    ))
}
