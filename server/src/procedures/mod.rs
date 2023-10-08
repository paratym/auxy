mod auth;

use hyper::{client::HttpConnector, Client};
use rspc::{Config, Router, RouterBuilder};
use sqlx::{Pool, Postgres};
use std::{path::PathBuf, sync::Arc};

pub struct BaseCtx {
    pub http_client: Arc<Client<HttpConnector>>,
    pub db: Arc<Pool<Postgres>>,
}

macro_rules! rspc_error {
    ($code:ident, $message:expr) => {
        rspc::Error::new(rspc::ErrorCode::$code, $message.to_string())
    };
}

pub(crate) use rspc_error;

pub fn router() -> RouterBuilder<BaseCtx> {
    let mut config = Config::new();
    if cfg!(debug_assertions) {
        config = config.export_ts_bindings(
            PathBuf::from(env!("CARGO_MANIFEST_DIR")).join(dotenv!("CLIENT_BINDINGS_PATH")),
        );
    }

    Router::<BaseCtx>::new()
        .config(config)
        .merge("auth.", auth::router())
}
