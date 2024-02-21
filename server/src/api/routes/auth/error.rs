use std::fmt::Display;

use axum::{http::StatusCode, response::IntoResponse};

#[derive(Debug)]
pub enum AuthError {
    InternalError,
    InvalidCredentials,
    UserNotFound,
    UserAlreadyExists,
    InvalidToken,
}

impl Display for AuthError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::InternalError => write!(f, "iternal error"),
            Self::InvalidCredentials => write!(f, "invalid credentials"),
            Self::UserNotFound => write!(f, "user not found"),
            Self::UserAlreadyExists => write!(f, "user already exists"),
            Self::InvalidToken => write!(f, "invalid token"),
        }
    }
}

impl IntoResponse for AuthError {
    fn into_response(self) -> axum::response::Response {
        let status = match self {
            Self::InternalError => StatusCode::INTERNAL_SERVER_ERROR,
            Self::InvalidCredentials => StatusCode::BAD_REQUEST,
            Self::UserNotFound => StatusCode::NOT_FOUND,
            Self::UserAlreadyExists => StatusCode::CONFLICT,
            Self::InvalidToken => StatusCode::UNAUTHORIZED,
        };

        (status, self.to_string()).into_response()
    }
}
