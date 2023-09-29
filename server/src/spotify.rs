use axum::{
    extract::Query,
    http::StatusCode,
    response::{IntoResponse, Redirect},
    routing::get,
    Json, Router,
};
use base64::{engine::general_purpose, Engine};
use hyper::{body, Body, Client, Request};
use rand::{distributions::Alphanumeric, Rng};
use serde::{Deserialize, Serialize};
use url::Url;

async fn signin() -> Result<Redirect, StatusCode> {
    let state: String = rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(16)
        .map(char::from)
        .collect();

    // "user-read-email user-read-private user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follower-read user-follower-modify user-top-read user-read-recently-played user-read-playback-position user-read-currently-playing user-read-playback-state user-modify-playback-state streaming"
    match Url::parse_with_params(
        "https://accounts.spotify.com/authorize",
        &[
            ("response_type", "code"),
            ("client_id", dotenv!("SPOTIFY_CLIENT_ID")),
            (
                "redirect_uri",
                format!("{}/service/spotify/auth/callback", dotenv!("EXTERNAL_URL")).as_str(),
            ),
            ("scope", "user-read-email user-read-private"),
            ("state", state.as_str()),
        ],
    ) {
        Ok(url) => Ok(Redirect::temporary(url.as_str())),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

#[derive(Deserialize)]
struct AuthCallbackParams {
    state: String,
    code: Option<String>,
    error: Option<String>,
}

async fn auth_callback(Query(params): Query<AuthCallbackParams>) -> impl IntoResponse {
    
}

#[derive(Deserialize)]
struct AuthTokenParams {
    refresh_token: String,
}

#[derive(Serialize, Deserialize)]
struct AuthTokenResponse {
    access_token: String,
    scope: String,
    expires_in: u32,
}

async fn auth_token(
    Query(params): Query<AuthTokenParams>,
) -> Result<impl IntoResponse, StatusCode> {
    let authorization = general_purpose::URL_SAFE.encode(format!(
        "{}:{}",
        dotenv!("SPOTIFY_CLIENT_ID"),
        dotenv!("SPOTIFY_CLIENT_SECRET")
    ));

    let refresh_req = match Request::builder()
        .header("Authorization", format!("Basic {}", authorization))
        .uri("https://accounts.spotify.com/api/token")
        .body(Body::from(format!(
            "grant_type=refresh_token&refresh_token={}",
            params.refresh_token
        ))) {
        Ok(req) => req,
        Err(_) => return Err(StatusCode::INTERNAL_SERVER_ERROR),
    };

    let client = Client::new();
    let refresh_res = match client.request(refresh_req).await {
        Ok(res) if res.status().is_success() => res,
        _ => return Err(StatusCode::INTERNAL_SERVER_ERROR),
    };

    let body_bytes = match body::to_bytes(refresh_res.into_body()).await {
        Ok(body) => body,
        Err(_) => return Err(StatusCode::INTERNAL_SERVER_ERROR),
    };

    let res_body: AuthTokenResponse = match serde_json::from_slice(&body_bytes) {
        Ok(body) => body,
        Err(_) => return Err(StatusCode::INTERNAL_SERVER_ERROR),
    };

    Ok(Json(res_body))
}

pub fn spotify_router() -> Router {
    Router::new()
        .route("/auth/signin", get(signin))
        .route("/auth/token", get(auth_token))
}
