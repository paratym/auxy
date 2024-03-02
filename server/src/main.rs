pub mod router;
pub mod utils;

mod db;
mod logger;
mod public;

use crate::router::ReqState;
use axum_extra::extract::cookie::Key;
use std::{env, sync::Arc};
use tokio::join;

#[tokio::main]
async fn main() {
    logger::init();
    let pool = db::connect().await.unwrap();

    let auth_secret = env::var("AUTH_SECRET").expect("missing auth secret");
    let state = ReqState {
        db: Arc::new(pool),
        auth_key: Key::derive_from(auth_secret.as_bytes()),
    };

    join!(router::serve(state), public::serve());
}
