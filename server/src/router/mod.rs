use axum::{middleware::from_fn_with_state, Router};
use std::{
    env::{self, VarError},
    error::Error,
    net::SocketAddr,
};
use tokio::net::TcpListener;
use tower::ServiceBuilder;
use tower_http::trace::TraceLayer;
use tracing::debug;

mod client;
mod middleware;
mod rest;
mod state;

pub use middleware::AuthToken;
pub use state::*;

use self::middleware::auth_layer;

pub async fn serve(state: ReqState) -> Result<(), Box<dyn Error>> {
    let router = Router::new()
        .nest(env!("PUBLIC_SERVER_CLIENT_PATH"), client::router()?)
        .nest(env!("PUBLIC_SERVER_REST_PATH"), rest::router())
        .layer(
            ServiceBuilder::new()
                .layer(TraceLayer::new_for_http())
                .layer(from_fn_with_state(state.clone(), auth_layer)),
        )
        .with_state(state);

    let listener = get_tcp_listener().await?;
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
    let listener = TcpListener::bind(address).await?;
    debug!("listening for connections at {}", address);
    Ok(listener)
}
