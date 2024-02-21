pub mod routes;

use std::net::SocketAddr;
use tokio::net::TcpListener;
use crate::api::routes::ReqState;

pub async fn serve(state: ReqState) -> Result<(), tokio::io::Error> {
    if cfg!(debug_assertions) {
        let mut path = env!("CARGO_MANIFEST_DIR").to_string();
        path.push_str("/client/generated.ts");
        specta::export::ts(path.as_str()).expect("error exporting typescript bindings");
    }

    let port = env!("PUBLIC_API_PORT").parse::<u16>().unwrap();
    let addr = SocketAddr::from(([127, 0, 0, 1], port));
    let listener = TcpListener::bind(addr).await?;
    axum::serve(listener, routes::router(state)).await?;
    Ok(())
}
