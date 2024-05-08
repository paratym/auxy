mod sign_in;
mod sign_out;
mod sign_up;

use crate::router::ReqState;
use axum::{routing::post, Router};
use axum_typed_multipart::TryFromMultipart;
use garde::Validate;
use sign_in::signin_handler;
use sign_out::signout_handler;
use sign_up::signup_handler;
use specta::Type;

#[derive(Debug, Type, TryFromMultipart, Validate)]
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
