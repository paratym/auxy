use std::{
    error::Error,
    fmt::{Display, Formatter},
};

use axum::response::IntoResponse;

#[derive(Debug)]
pub enum ApiError {
    NotFound,
}

impl Error for ApiError {}

impl Display for ApiError {
    fn fmt(&self, f: &mut Formatter) -> std::fmt::Result {
        todo!()
    }
}

impl From<tokio::io::Error> for ApiError {
    fn from(value: tokio::io::Error) -> Self {
        todo!()
    }
}

impl From<specta::ts::TsExportError> for ApiError {
    fn from(value: specta::ts::TsExportError) -> Self {
        todo!()
    }
}

impl From<sqlx::Error> for ApiError {
    fn from(value: sqlx::Error) -> Self {
        todo!()
    }
}

impl From<argon2::password_hash::Error> for ApiError {
    fn from(value: argon2::password_hash::Error) -> Self {
        todo!()
    }
}

impl From<garde::Report> for ApiError {
    fn from(value: garde::Report) -> Self {
        todo!()
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> axum::response::Response {
        todo!()
    }
}
