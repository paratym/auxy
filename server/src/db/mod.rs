mod error;

pub use error::*;

use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

pub async fn connect() -> Result<Pool<Postgres>, DatabaseError> {
    let pool = PgPoolOptions::new().connect(env!("DATABASE_URL")).await?;

    log::info!("successfully connected to database");

    sqlx::migrate!().run(&pool).await?;
    log::info!("successfully migrated database");

    Ok(pool)
}
