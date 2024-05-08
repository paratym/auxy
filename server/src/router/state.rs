use axum::extract::FromRef;
use axum_extra::extract::cookie;
use cached::proc_macro::once;
use sqlx::{Pool, Sqlite};
use std::{env, sync::Arc};

#[derive(Debug, Clone)]
pub struct ReqState {
    pub db: Arc<Pool<Sqlite>>,
}

#[once(time = 30, sync_writes = true)]
fn get_auth_key() -> cookie::Key {
    // TODO: fail better here
    let secret = env::var("AUTH_SECRET").unwrap();
    cookie::Key::derive_from(secret.as_bytes())
}

impl FromRef<ReqState> for cookie::Key {
    fn from_ref(input: &ReqState) -> Self {
        get_auth_key()
    }
}
