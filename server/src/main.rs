mod auth;
mod database;
mod spotify;
mod services;
mod routes;

use crate::auth::auth_router;
use crate::spotify::spotify_router;
use axum::{Router, Server};
use std::net::SocketAddr;

#[macro_use]
extern crate dotenv_codegen;

#[tokio::main]
async fn main() {
    let router = Router::new()
        .nest("/auth", auth_router())
        .nest("/services/spotify", spotify_router());

    let port = dotenv!("PORT").parse().unwrap();
    let addr = SocketAddr::from(([0, 0, 0, 0], port));

    Server::bind(&addr)
        .serve(router.into_make_service())
        .await
        .unwrap();
}
