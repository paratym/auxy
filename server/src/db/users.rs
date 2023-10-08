use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgQueryResult, query, PgExecutor};

#[derive(sqlx::FromRow, Serialize, Deserialize)]
pub struct UsersRow {
    pub id: i64,
    pub username: Box<str>,
}

impl UsersRow {
    pub async fn insert<'a>(
        &self,
        exec: impl PgExecutor<'a>,
    ) -> Result<PgQueryResult, sqlx::Error> {
        query("INSERT INTO users (id, username) VALUES ($1, $2)")
            .bind(self.id)
            .bind(self.username.as_ref())
            .execute(exec)
            .await
    }
}
