mod client;
mod rest;
mod state;

use axum::{Router, response::Redirect};
use std::{env::{self, VarError}, error::Error, net::SocketAddr, future};
use tokio::net::TcpListener;
use tower_http::trace::TraceLayer;
use tracing::debug;

pub use state::*;

pub async fn serve(state: ReqState) -> Result<(), Box<dyn Error>> {
    let router = Router::new()
        .nest(env!("PUBLIC_SERVER_CLIENT_PATH"), client::router()?)
        .nest(env!("PUBLIC_SERVER_REST_PATH"), rest::router())
        .fallback(|| future::ready(Redirect::temporary(env!("PUBLIC_SERVER_CLIENT_PATH"))))
        .layer(TraceLayer::new_for_http())
        .with_state(state);

    let listener = get_tcp_listener().await?;
    debug!("listening for connections at {}", listener.local_addr()?);

    axum::serve(listener, router).await?;
    Ok(())
}

async fn get_tcp_listener() -> Result<TcpListener, Box<dyn Error>> {
    if cfg!(debug_assertions) {
        let mut listenfd = listenfd::ListenFd::from_env();
        if let Some(listener) = listenfd.take_tcp_listener(0)? {
            debug!("using listenfd socket");
            return Ok(TcpListener::from_std(listener)?);
        }
    }

    let port = match env::var("SERVER_PORT") {
        Ok(port) => port.parse()?,
        Err(VarError::NotPresent) => 0,
        Err(e) => return Err(e.into()),
    };

    let address = SocketAddr::from(([127, 0, 0, 1], port));
    Ok(TcpListener::bind(address).await?)
}
