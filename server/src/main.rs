pub mod api;
pub mod db;
mod logger;

use std::sync::Arc;

use crate::api::routes::ReqState;

#[tokio::main]
async fn main() {
    logger::init();
    let pool = db::connect().await.unwrap();

    let state = ReqState {
        db: Arc::new(pool)
    };

    api::serve(state).await.unwrap();
}
