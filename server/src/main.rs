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

    let private_key = env::var("PRIVATE_KEY").expect("missing private key");
    let state = ReqState {
        db: Arc::new(pool),
        private_key: Key::derive_from(private_key.as_bytes()),
    };

    join!(router::serve(state), public::serve());
}
