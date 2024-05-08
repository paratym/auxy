use crate::router::ReqState;
use axum::Router;

mod auth;
mod library;

pub fn router() -> Router<ReqState> {
    Router::new()
        .nest("/auth", auth::router())
        .nest("/library", library::router())
}
