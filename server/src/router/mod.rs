mod auth;

use axum::{extract::FromRef, Router};
use axum_extra::extract::cookie::Key;
use sqlx::{Pool, Sqlite};
use std::env;
use std::net::SocketAddr;
use std::path::PathBuf;
use std::sync::Arc;
use tokio::net::TcpListener;

#[derive(Debug, Clone)]
pub struct ReqState {
    pub db: Arc<Pool<Sqlite>>,
    pub auth_key: Key,
}

impl FromRef<ReqState> for Key {
    fn from_ref(input: &ReqState) -> Self {
        input.auth_key.clone()
    }
}

pub async fn serve(state: ReqState) -> Result<(), tokio::io::Error> {
    if cfg!(debug_assertions) {
        let mut path = PathBuf::from(env!("CARGO_MANIFEST_DIR").to_string());
        path.pop();
        path.push("client");
        path.push("generated");
        path.push("api.d.ts");

        let path_str = path.to_str().expect("invalid ts bindings path");
        specta::export::ts(path_str).expect("error exporting typescript bindings");
    }

    let router = Router::new()
        .nest("/auth", auth::router())
        .with_state(state);

    let port = env::var("API_PORT")
        .ok()
        .and_then(|p| p.parse::<u16>().ok())
        .expect("invalid api port");

    let addr = SocketAddr::from(([127, 0, 0, 1], port));
    let listener = TcpListener::bind(addr).await?;

    axum::serve(listener, router).await?;
    Ok(())
}
