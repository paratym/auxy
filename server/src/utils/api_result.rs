use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::Serialize;
use specta::Type;

#[derive(Debug, Type, Serialize)]
pub enum ApiError {
    InternalError,
    Unauthorized,
    InvalidInput(Option<Vec<(String, String)>>),
    Message(String),
}

pub type ApiResult<T> = Result<T, ApiError>;

impl ApiError {
    pub fn status(&self) -> StatusCode {
        match self {
            Self::InternalError => StatusCode::INTERNAL_SERVER_ERROR,
            Self::Unauthorized => StatusCode::UNAUTHORIZED,
            Self::InvalidInput(_) => StatusCode::BAD_REQUEST,
            Self::Message(_) => StatusCode::BAD_REQUEST,
        }
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> axum::response::Response {
        (self.status(), Json(self)).into_response()
    }
}

impl From<garde::Report> for ApiError {
    fn from(value: garde::Report) -> Self {
        Self::InvalidInput(Some(
            value
                .iter()
                .map(|(path, msg)| (path.to_string(), msg.to_string()))
                .collect(),
        ))
    }
}
