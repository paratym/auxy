use super::PasswordCredentials;
use crate::{
    router::ReqState,
    utils::{ApiError, ApiResult, ID},
};
use argon2::{password_hash::SaltString, Argon2, PasswordHasher};
use axum::{
    extract::{Json, State},
    response::Redirect,
};
use garde::Validate;
use rand::rngs::OsRng;
use sqlx::query;

pub async fn signup_handler(
    state: State<ReqState>,
    body: Json<PasswordCredentials>,
) -> ApiResult<Redirect> {
    body.validate(&())?;

    let id = ID::new().into_inner();
    let salt = SaltString::generate(&mut OsRng);
    let hash = Argon2::default()
        .hash_password(body.password.as_bytes(), &salt)
        .map_err(|_| ApiError::InternalError)?
        .to_string();

    query!(
        "INSERT INTO users (id, username, password) VALUES ($1, $2, $3)",
        id,
        body.username,
        hash
    )
    .execute(state.db.as_ref())
    .await
    .map_err(|e| match e {
        sqlx::Error::Database(err) if err.kind() == sqlx::error::ErrorKind::UniqueViolation => {
            ApiError::Message("Username already taken".into())
        }
        _ => ApiError::InternalError,
    })?;

    Ok(Redirect::temporary("/auth/sign-in"))
}
