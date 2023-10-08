use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgQueryResult, query, PgExecutor};

#[derive(sqlx::FromRow, Serialize, Deserialize)]
pub struct AuthRow {
    pub user_id: i64,
    pub password_hash: Option<Box<str>>,
    pub password_salt: Option<Box<str>>,
    pub session_token: Option<Box<str>>,
}

impl AuthRow {
    pub async fn insert<'a>(
        &self,
        exec: impl PgExecutor<'a>,
    ) -> Result<PgQueryResult, sqlx::Error> {
        query("INSERT INTO auth (user_id, password_hash, password_salt, session_token) VALUES ($1, $2, $3)")
            .bind(self.user_id)
            .bind(
                self.password_hash
                    .as_ref()
                    .and_then(|p| Some(p.as_ref().to_string())),
            )
            .bind(self.password_salt.as_ref().and_then(|s| Some(s.as_ref().to_string())))
            .bind(
                self.session_token
                    .as_ref()
                    .and_then(|t| Some(t.as_ref().to_string())),
            )
            .execute(exec)
            .await
    }
}
