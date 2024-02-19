mod signin;
mod signup;

use crate::api::routes::ReqState;
use axum::{routing::post, Router};
use signin::signin_handler;
use signup::signup_handler;

pub fn router() -> Router<ReqState> {
    Router::new()
        .route("/signin", post(signin_handler))
        .route("/signup", post(signup_handler))
}
