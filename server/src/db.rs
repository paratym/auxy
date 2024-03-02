use sqlx::{migrate, postgres::PgPoolOptions, Pool, Postgres};
use std::env;

pub async fn connect() -> Result<Pool<Postgres>, sqlx::Error> {
    let url = env::var("DATABASE_URL").expect("missing database url");
    let pool = PgPoolOptions::new().connect(&url).await?;
    log::info!("successfully connected to database");

    migrate!("../migrations").run(&pool).await?;
    log::info!("successfully migrated database");

    Ok(pool)
}
