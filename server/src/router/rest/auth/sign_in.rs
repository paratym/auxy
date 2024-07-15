use super::PasswordCredentials;
use crate::{
    router::{AuthToken, ReqState},
    utils::{ApiError, ApiResult, ID},
};
use argon2::{Argon2, PasswordHash, PasswordVerifier};
use axum::{
    extract::State,
    response::{IntoResponse, Redirect},
};
use axum_typed_multipart::TypedMultipart;
use garde::Validate;
use serde::Deserialize;
use sqlx::query_as;

#[derive(Debug, Deserialize)]
struct UserRecord {
    id: ID,
    password: String,
}

pub async fn signin_handler(
    State(state): State<ReqState>,
    TypedMultipart(body): TypedMultipart<PasswordCredentials>,
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

    let token = AuthToken::new_session(&state, user.id).await?;
    Ok((token, Redirect::to(env!("PUBLIC_SERVER_CLIENT_PATH"))))
}
