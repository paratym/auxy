use crate::{
    router::ReqState,
    utils::{ApiError, ApiResult, AuthToken, ID},
};
use axum::{
    extract::{Request, State},
    http::HeaderMap,
    response::IntoResponse,
};
use axum_extra::headers::{ContentType, HeaderMapExt};
use futures::TryStreamExt;
use mime_guess::get_mime_extensions;
use std::{env, path::PathBuf};
use tokio::{fs::File, io::BufWriter};
use tokio_util::io::StreamReader;

pub async fn upload_handler(
    state: State<ReqState>,
    session: AuthToken,
    headers: HeaderMap,
    request: Request,
) -> ApiResult<impl IntoResponse> {
    let file_ext = headers
        .typed_get::<ContentType>()
        .and_then(|header| header.to_string().parse().ok())
        .and_then(|ref mime| get_mime_extensions(mime))
        .and_then(|exts| exts.get(0))
        .ok_or(ApiError::InvalidInput(None))?;

    let mut path = env::var("LIBRARY_PATH")
        .map(PathBuf::from)
        .map_err(|_| ApiError::InternalError)?;

    let id = ID::new();
    path.push(session.user_id.to_string());
    path.set_file_name(id.as_inner().to_string());
    path.set_extension(file_ext);

    let file = File::create(path)
        .await
        .map_err(|_| ApiError::InternalError)?;

    let body_with_io_error = request
        .into_body()
        .into_data_stream()
        .map_err(|err| std::io::Error::new(std::io::ErrorKind::Other, err));

    let body_reader = StreamReader::new(body_with_io_error);
    futures::pin_mut!(body_reader);


    let mut writer = BufWriter::new(file);
    tokio::io::copy(&mut body_reader, &mut writer)
        .await
        .map(|_| ())
        .map_err(|_| ApiError::InternalError)
}
