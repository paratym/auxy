use crate::{
    router::ReqState,
    utils::{ApiError, ApiResult, AuthToken},
};
use axum::{
    extract::State,
    http::header::SET_COOKIE,
    response::{AppendHeaders, IntoResponse},
    Json,
};
use sqlx::query;

pub async fn signout_handler(
    state: State<ReqState>,
    session: AuthToken,
) -> ApiResult<impl IntoResponse> {
    let id = session.session_id.into_inner();
    query!("DELETE FROM sessions WHERE id = $1", id)
        .execute(state.db.as_ref())
        .await
        .map_err(|_| ApiError::InternalError)?;

    Ok((AppendHeaders([(SET_COOKIE, "session=")]), Json(())))
}
