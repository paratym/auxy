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
    query!(
        "DELETE FROM sessions WHERE id = $1",
        session.session_id.into_inner()
    )
    .execute(state.db.as_ref())
    .await
    .map_err(|_| ApiError::InternalError)?;

    Ok((AppendHeaders([(SET_COOKIE, "session=")]), Json(())))
}
