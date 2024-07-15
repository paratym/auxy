use crate::router::ReqState;
use axum::Router;
use tokio::io::Error;

#[cfg(debug_assertions)]
pub fn router() -> Result<Router<ReqState>, Error> {
    // tokio::process::Command::new("npm")
    //     .arg("run")
    //     .arg("dev")
    //     .arg("--workspace")
    //     .arg("client")
    //     .spawn()?;

    let dev_server_url = format!("http://localhost:{}", env!("DEV_CLIENT_SERVER_PORT"));
    let router = Router::new()
        .fallback(move || std::future::ready(axum::response::Redirect::to(&dev_server_url)));

    Ok(router)
}

#[cfg(not(debug_assertions))]
pub fn router() -> Result<Router<ReqState>, Error> {
    let dir_path = std::env::var("CLIENT_PATH")
        .map_err(|_| Error::new(tokio::io::ErrorKind::NotFound, "missing client path"))?;

    // TODO: redirect to sign in for unauthenticated
    Ok(Router::new().fallback_service(tower_http::services::ServeDir::new(dir_path)))
}
