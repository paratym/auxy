use crate::{
    router::{AuthToken, ReqState},
    utils::{ApiError, ApiResult, ID},
};
use axum::{
    extract::{Request, State},
    http::{HeaderMap, StatusCode},
    response::IntoResponse,
};
use axum_extra::{headers::ContentType, TypedHeader};
use axum_typed_multipart::{FieldData, TryFromMultipart, TypedMultipart};
use std::{env, path::Path};
use tempfile::NamedTempFile;

#[derive(TryFromMultipart)]
pub struct UploadBody {
    #[form_data(limit = "unlimited")]
    file: FieldData<NamedTempFile>,
}

pub async fn upload_handler(
    State(state): State<ReqState>,
    session: AuthToken,
    TypedMultipart(UploadBody { file }): TypedMultipart<UploadBody>,
) -> ApiResult<impl IntoResponse> {
    let id = ID::new();
    // TODO cache env var
    let library_path = env::var("LIBRARY_PATH").map_err(|_| ApiError::InternalError)?;
    let path = Path::new(&library_path)
        .join(session.user_id.to_string())
        .join(format!("{}.idk", id));

    file.contents
        .persist_noclobber(path)
        .map_err(|_| ApiError::InternalError)
        .map(|_| StatusCode::CREATED)
}

// use axum_extra::headers::{ContentType, HeaderMapExt};
// use futures::TryStreamExt;
// use mime_guess::get_mime_extensions;
// use std::{env, path::PathBuf};
// use tokio::{fs::File, io::BufWriter};
// use tokio_util::io::StreamReader;
// let file_ext = headers
//     .typed_get::<ContentType>()
//     .and_then(|header| header.to_string().parse().ok())
//     .and_then(|ref mime| get_mime_extensions(mime))
//     .and_then(|exts| exts.get(0))
//     .ok_or(ApiError::InvalidInput(None))?;
//
// let mut path = env::var("LIBRARY_PATH")
//     .map(PathBuf::from)
//     .map_err(|_| ApiError::InternalError)?;
//
// let id = ID::new();
// path.push(session.user_id.to_string());
// path.set_file_name(id.as_inner().to_string());
// path.set_extension(file_ext);
//
// let file = File::create(path)
//     .await
//     .map_err(|_| ApiError::InternalError)?;
//
// let body_with_io_error = request
//     .into_body()
//     .into_data_stream()
//     .map_err(|err| std::io::Error::new(std::io::ErrorKind::Other, err));
//
// let body_reader = StreamReader::new(body_with_io_error);
// futures::pin_mut!(body_reader);
//
//
// let mut writer = BufWriter::new(file);
// tokio::io::copy(&mut body_reader, &mut writer)
//     .await
//     .map(|_| ())
//     .map_err(|_| ApiError::InternalError)
