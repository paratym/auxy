use sqlx::{
    migrate,
    sqlite::{Sqlite, SqlitePoolOptions},
    Pool,
};
use std::env;
use tracing::debug;

pub async fn connect() -> Result<Pool<Sqlite>, sqlx::Error> {
    let url = env::var("DATABASE_URL").expect("missing database url");
    let pool = SqlitePoolOptions::new().connect(&url).await?;
    debug!("successfully connected to database");

    migrate!("../database/migrations").run(&pool).await?;
    debug!("successfully migrated database");

    Ok(pool)
}
