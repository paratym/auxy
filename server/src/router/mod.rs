mod auth;

use axum::{extract::FromRef, Router};
use axum_extra::extract::cookie::Key;
use sqlx::{Pool, Postgres};
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::net::TcpListener;

#[derive(Debug, Clone)]
pub struct ReqState {
    pub db: Arc<Pool<Postgres>>,
    pub private_key: Key,
}

impl FromRef<ReqState> for Key {
    fn from_ref(input: &ReqState) -> Self {
        input.private_key.clone()
    }
}

pub async fn serve(state: ReqState) -> Result<(), tokio::io::Error> {
    if cfg!(debug_assertions) {
        let mut path = env!("CARGO_MANIFEST_DIR").to_string();
        path.push_str("/client/generated.ts");
        specta::export::ts(path.as_str()).expect("error exporting typescript bindings");
    }

    let router = Router::new()
        .nest("/auth", auth::router())
        .with_state(state);

    let port = env!("PUBLIC_API_PORT").parse::<u16>().unwrap();
    let addr = SocketAddr::from(([127, 0, 0, 1], port));
    let listener = TcpListener::bind(addr).await?;

    axum::serve(listener, router).await?;
    Ok(())
}
