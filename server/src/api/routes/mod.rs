mod auth;

use axum::Router;
use sqlx::{Pool, Postgres};
use std::sync::Arc;

#[derive(Debug, Clone)]
pub struct ReqState {
    pub db: Arc<Pool<Postgres>>,
}

pub fn router(state: ReqState) -> Router {
    Router::new()
        .nest("/auth", auth::router())
        .with_state(state)
}
