use super::AuthError;
use crate::api::routes::{auth::PasswordCredentials, ReqState};
use argon2::{password_hash::SaltString, Argon2, PasswordHasher};
use axum::{extract::{Query, State, Json}, response::Redirect};
use garde::Validate;
use rand::{rngs::OsRng, Rng};
use sqlx::query;

pub async fn signup_handler(
    state: State<ReqState>,
    body: Json<PasswordCredentials>,
) -> Result<Redirect, AuthError> {
    body
        .validate(&())
        .map_err(|_| AuthError::InvalidCredentials)?;

    let user_id: i64 = OsRng.gen();

    let salt = SaltString::generate(&mut OsRng);
    let hash = Argon2::default()
        .hash_password(body.password.as_bytes(), &salt)
        .map_err(|_| AuthError::InternalError)?;

    let mut transaction = state
        .db
        .begin()
        .await
        .map_err(|_| AuthError::InternalError)?;

    query!(
        "INSERT INTO users (id, username) VALUES ($1, $2)",
        user_id,
        body.username
    )
    .execute(&mut *transaction)
    .await
    .map_err(|e| match e {
        sqlx::Error::Database(err) if err.kind() == sqlx::error::ErrorKind::UniqueViolation => {
            AuthError::UserAlreadyExists
        }
        _ => AuthError::InternalError,
    })?;

    query!(
        "INSERT INTO auth (id, password) VALUES ($1, $2)",
        user_id,
        hash.to_string()
    )
    .execute(&mut *transaction)
    .await
    .map_err(|_| AuthError::InternalError)?;

    transaction
        .commit()
        .await
        .map_err(|_| AuthError::InternalError)?;

    Ok(Redirect::temporary("/auth/sign-in"))
}
