use std::path::PathBuf;

use rspc::{Config, Router};

pub fn auxy_api_router() -> Router {
    let mut config = Config::new();
    if cfg!(debug_assertions) {
        config = config.export_ts_bindings(
            PathBuf::from(env!("CARGO_MANIFEST_DIR")).join(dotenv!("CLIENT_BINDINGS_PATH")),
        );
    }

    Router::<()>::new()
        .config(config)
        .query("echo", |t| t(|_, input: String| input))
        .build()
}
