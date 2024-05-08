use crate::router::ReqState;
use axum::{routing::post, Router};

mod upload;

pub fn router() -> Router<ReqState> {
    Router::new().route("/upload", post(upload::upload_handler))
}
