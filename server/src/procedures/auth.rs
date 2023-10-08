use super::{rspc_error, BaseCtx};
use crate::db::{AuthRow, RowID, UsersRow};
use lazy_static::lazy_static;
use pbkdf2::{
    password_hash::{PasswordHasher, SaltString},
    Pbkdf2,
};
use rand::rngs::OsRng;
use regex::Regex;
use rspc::{Error, Router, RouterBuilder, Type};
use serde::{Deserialize, Serialize};
use validator::Validate;

lazy_static! {
    static ref USERNAME_REGEX: Regex = Regex::new(r"^[!-~]{2,24}$").unwrap();
    static ref PASSWORD_REGEX: Regex = Regex::new(r"^[!-~]{8,64}$").unwrap();
}

#[derive(Type, Deserialize, Validate)]
#[serde(rename_all = "camelCase")]
pub struct Credentials {
    #[validate(regex = "USERNAME_REGEX")]
    username: String,
    #[validate(regex = "PASSWORD_REGEX")]
    password: String,
}

#[derive(Type, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateUserResult {
    user_id: String,
}

async fn create_user(ctx: BaseCtx, params: Credentials) -> Result<CreateUserResult, Error> {
    let salt = SaltString::generate(&mut OsRng);
    let password_hash = match Pbkdf2.hash_password(params.password.as_bytes(), &salt) {
        Ok(hash) => hash.to_string().into_boxed_str(),
        Err(_) => return Err(rspc_error!(InternalServerError, "")),
    };

    let user_id = RowID::new();
    let users_row = UsersRow {
        id: user_id.as_int(),
        username: params.username.into_boxed_str(),
    };

    let auth_row = AuthRow {
        user_id: user_id.as_int(),
        password_hash: Some(password_hash),
        password_salt: Some(salt.as_str().into()),
        session_token: None,
    };

    let mut transaction = match ctx.db.begin().await {
        Ok(transaction) => transaction,
        Err(_) => return Err(rspc_error!(InternalServerError, "")),
    };

    match users_row.insert(&mut *transaction).await {
        Ok(_) => (),
        Err(err) => {
            if err
                .into_database_error()
                .is_some_and(|err| err.is_unique_violation())
            {
                return Err(rspc_error!(Conflict, "username taken"));
            }

            return Err(rspc_error!(InternalServerError, ""));
        }
    };

    auth_row
        .insert(&mut *transaction)
        .await
        .map_err(|_| rspc_error!(InternalServerError, ""))?;

    transaction
        .commit()
        .await
        .map_err(|_| rspc_error!(InternalServerError, ""))?;

    Ok(CreateUserResult {
        user_id: user_id.to_string(),
    })
}

async fn create_session(ctx: BaseCtx, params: Credentials) {}

#[derive(Type, Deserialize)]
struct RefreshTokenParams {
    token: String,
}

fn refresh_token(ctx: BaseCtx, params: RefreshTokenParams) {}

pub fn router() -> RouterBuilder<BaseCtx> {
    Router::new()
        .query("createUser", |t| t(create_user))
        .query("createSessison", |t| t(create_session))
        .query("refreshToken", |t| t(refresh_token))
}
