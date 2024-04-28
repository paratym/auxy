use sqlx::{migrate, sqlite::{Sqlite, SqlitePoolOptions}, Pool};
use std::env;

pub async fn connect() -> Result<Pool<Sqlite>, sqlx::Error> {
    let url = env::var("DATABASE_URL").expect("missing database url");
    let pool = SqlitePoolOptions::new().connect(&url).await?;
    log::info!("successfully connected to database");

    migrate!("../database").run(&pool).await?;
    log::info!("successfully migrated database");

    Ok(pool)
}
