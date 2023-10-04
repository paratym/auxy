use hyper::StatusCode;
use pbkdf2::{
    password_hash::{
        rand_core::{CryptoRngCore, OsRng},
        PasswordHasher, SaltString,
    },
    Pbkdf2,
};
use serde::{Deserialize, Serialize};
use time::{macros::datetime, OffsetDateTime};

const AUXY_EPOCH: OffsetDateTime = datetime!(2023-01-01 0:00 UTC);

#[no_mangle]
fn generate_id() -> u64 {
    ((OsRng.as_rngcore().next_u32() as u64) << 32)
        & ((OffsetDateTime::now_utc() - AUXY_EPOCH).whole_seconds() as u32 as u64)
}

#[derive(Serialize, Deserialize)]
pub struct User {
    id: u64,
    username: Box<str>,
}

impl User {
    pub fn new(username: Box<str>) -> Self {
        Self {
            id: generate_id(),
            username,
        }
    }
}

#[derive(Deserialize)]
struct UserCredentials {
    username: Box<str>,
    password: Box<str>,
}

fn create_user(Json(body): Json<UserCredentials>) -> Result<Json<User>, StatusCode> {
    let salt = SaltString::generate(&mut OsRng);
    let password_hash = match Pbkdf2.hash_password(body.password.as_bytes(), &salt) {
        Ok(hash) => hash.to_string(),
        Err(_) => return Err(StatusCode::INTERNAL_SERVER_ERROR),
    };

    let user = User::new(body.username);
    Ok(Json(user))
}

#[derive(Serialize, Deserialize)]
struct JwtHeader {
    alg: Box<str>,
    typ: Box<str>,
}

#[derive(Serialize, Deserialize)]
struct JwtPayload {
    iat: u64,
    exp: u64,
    sub: Box<str>,
    scope: Box<[Box<str>]>,
}

async fn get_refresh_token(Json(body): Json<UserCredentials>) -> impl IntoResponse {

    // Pbkdf2.verify_password(body.password.as_bytes(), body.password.as_bytes());

    ""
}

async fn get_access_token() -> impl IntoResponse {
    ""
}

pub fn auth_router() -> Router {
    Router::new()
        .route("/refresh_token", get(get_refresh_token))
        .route("/access_token", get(get_access_token))
}
