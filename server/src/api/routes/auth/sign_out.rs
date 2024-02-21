use super::{AuthError, TokenClaims};
use crate::api::routes::ReqState;
use axum::extract::State;
use sqlx::query;

pub async fn signout_handler(state: State<ReqState>, claims: TokenClaims) -> Result<(), AuthError> {
    query!(
        "UPDATE auth SET session_token = NULL WHERE id = $1;",
        claims.sub
    )
    .execute(state.db.as_ref())
    .await
    .map_err(|_| AuthError::InternalError)?;

    Ok(())
}
