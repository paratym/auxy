use crate::api::{routes::ReqState, ApiError};
use argon2::{Argon2, PasswordHash, PasswordVerifier};
use axum::extract::{Query, State};
use serde::Deserialize;
use specta::Type;
use sqlx::{query_as, query_scalar};

#[derive(Debug, Type, Deserialize)]
pub struct SigninParams {
    username: String,
    password: String,
}

pub async fn signin_handler(
    state: State<ReqState>,
    params: Query<SigninParams>,
) -> Result<(), ApiError> {
    let hash = query_scalar!(
        String,
        r"SELECT password
          FROM users JOIN auth ON users.id = auth.id
          WHERE users.username = $1;",
        params.username
    )
    .fetch_one(state.db.as_ref())
    .await?;

    let parsed_hash = PasswordHash::new(&hash)?;
    Argon2::default().verify_password(params.password.as_bytes(), &parsed_hash)?;

    Ok(())
}
