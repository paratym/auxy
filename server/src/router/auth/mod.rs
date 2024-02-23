mod sign_in;
mod sign_out;
mod sign_up;

use axum::{routing::post, Router};
use garde::Validate;
use serde::Deserialize;
use sign_in::signin_handler;
use sign_out::signout_handler;
use sign_up::signup_handler;
use specta::Type;

use super::ReqState;

#[derive(Debug, Type, Deserialize, Validate)]
pub struct PasswordCredentials {
    #[garde(alphanumeric, length(min = 2, max = 32))]
    username: String,
    #[garde(length(min = 4))]
    password: String,
}

pub fn router() -> Router<ReqState> {
    Router::new()
        .route("/sign-in", post(signin_handler))
        .route("/sign-out", post(signout_handler))
        .route("/sign-up", post(signup_handler))
}
