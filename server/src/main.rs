mod procedures;
mod services;
mod db;

use axum::Server;
use procedures::BaseCtx;
use sqlx::postgres::PgPoolOptions;
use std::{error::Error, net::SocketAddr, sync::Arc};
use tower_http::cors::CorsLayer;

#[macro_use]
extern crate dotenv_codegen;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let http_client = Arc::new(hyper::Client::new());
    let db_pool = Arc::new(
        PgPoolOptions::new()
            .max_connections(5)
            .connect("postgres://postgres:password@localhost:5432/postgres")
            .await?,
    );

    println!("Connected to database");

    sqlx::migrate!("./db/migrations")
        .run(db_pool.as_ref())
        .await?;

    println!("Migrations completed");

    let build_rpc_ctx = move || BaseCtx {
        http_client: http_client.clone(),
        db: db_pool.clone(),
    };

    let rpc_router = procedures::router().build().arced();
    let http_router = axum::Router::new()
        .nest("/rpc", rpc_router.endpoint(build_rpc_ctx).axum())
        .layer(CorsLayer::very_permissive());

    let port = dotenv!("PORT").parse()?;
    let addr = SocketAddr::from(([0, 0, 0, 0], port));

    Server::bind(&addr)
        .serve(http_router.into_make_service())
        .await
        .unwrap();

    Ok(())
}
