mod database;
mod procedures;
mod router;
mod services;

use axum::{routing::get, Router, Server};
use std::net::SocketAddr;
use tower_http::cors::{self, CorsLayer};

#[macro_use]
extern crate dotenv_codegen;

#[tokio::main]
async fn main() {
    let rpc_router = router::auxy_api_router().arced();
    
    let cors_policy = CorsLayer::new()
        .allow_methods(cors::Any)
        .allow_headers(cors::Any)
        .allow_origin(cors::Any);

    let http_router = Router::<()>::new()
        .route("/", get(|| async { "Hello, world!" }))
        .nest("/rpc", rpc_router.endpoint(|| ()).axum())
        .layer(cors_policy);

    let port = dotenv!("PORT").parse().unwrap();
    let addr = SocketAddr::from(([0, 0, 0, 0], port));

    Server::bind(&addr)
        .serve(http_router.into_make_service())
        .await
        .unwrap();
}
