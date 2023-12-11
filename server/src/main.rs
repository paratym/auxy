use std::sync::Arc;
use auxy::FsTrackStore;
use axum::{Router, routing::get, extract::{Query, State}, response::IntoResponse};
use serde::Deserialize;
use tokio::net::TcpListener;
use const_format::concatcp;

struct HttpState {
    app: auxy::App,
}

type HttpStateExtractor = State<Arc<HttpState>>;

#[derive(Debug, Deserialize)]
struct ObjectQueryParams {
    object_id: Box<str>,
    store_id: String,
}

#[tokio::main]
async fn main() {
    stderrlog::new()
        .verbosity(stderrlog::LogLevelNum::Info)
        .timestamp(stderrlog::Timestamp::Millisecond)
        .color(stderrlog::ColorChoice::Auto)
        .init()
        .unwrap();

    let track_store = FsTrackStore::new("./public/tracks".into());
    let app = auxy::App::new().with_track_store("fs", track_store);
    let state = HttpState { app };

    let router = Router::new()
        .route("/ping", get(|| async { "pong" }))
        .route("/track", get(http_get_track))
        .with_state(Arc::new(state));

    const ADDRESS: &str = concatcp!("0.0.0.0:", env!("PORT"));
    let listener = TcpListener::bind(ADDRESS).await.unwrap();

    log::info!("Listening on {}", ADDRESS);
    axum::serve(listener, router).await.unwrap();
}

async fn http_get_track(
    Query(params): Query<ObjectQueryParams>,
    State(state): HttpStateExtractor
) -> impl IntoResponse {
    let track = state.app.get_track(&params.object_id, &params.store_id).await;
    ""
}
