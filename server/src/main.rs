pub mod router;
pub mod utils;

mod db;

use crate::router::ReqState;
use std::{env, path::Path, sync::Arc};
use tokio::fs::create_dir_all;
use tracing::debug;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        // .with(EnvFilter::from_env("LOG_LEVEL"))
        .with(tracing_subscriber::fmt::layer().pretty())
        .init();

    if cfg!(debug_assertions) {
        let path = Path::new(env!("DEV_SERVER_TS_BINDINGS_PATH"));
        let err_msg = "error exporting typescript bindings";

        if path.parent().is_some_and(|dir| !dir.exists()) {
            create_dir_all(path.parent().expect(err_msg))
                .await
                .expect(err_msg);
        }

        specta::export::ts(path.to_str().expect(err_msg)).expect(err_msg);
        debug!("successfully exported typescripts bindings {:?}", path);
    }

    let pool = db::connect().await.expect("error connecting to database");
    let state = ReqState { db: Arc::new(pool) };

    router::serve(state)
        .await
        .expect("error serving application");
}
