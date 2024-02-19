use crate::api::{routes::ReqState, ApiError};
use argon2::{password_hash::SaltString, Argon2, PasswordHasher};
use axum::extract::{Query, State};
use garde::Validate;
use rand::{rngs::OsRng, Rng};
use serde::Deserialize;
use specta::Type;
use sqlx::query;

#[derive(Debug, Type, Deserialize, Validate)]
pub struct SignupParams {
    #[garde(alphanumeric, length(min = 2, max = 32))]
    username: String,
    #[garde(length(min = 4))]
    password: String,
}

pub async fn signup_handler(
    state: State<ReqState>,
    params: Query<SignupParams>,
) -> Result<(), ApiError> {
    params.validate(&())?;

    let user_id: i64 = OsRng.gen();

    let salt = SaltString::generate(&mut OsRng);
    let hash = Argon2::default().hash_password(params.password.as_bytes(), &salt)?;

    let mut transaction = state.db.begin().await?;

    query!(
        "INSERT INTO users (id, username) VALUES ($1, $2)",
        user_id,
        params.username
    )
    .execute(&mut *transaction)
    .await?;

    query!(
        "INSERT INTO auth (id, password) VALUES ($1, $2)",
        user_id,
        hash.to_string()
    )
    .execute(&mut *transaction)
    .await?;

    transaction.commit().await?;
    Ok(())
}
