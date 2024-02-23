use sqlx::{postgres::PgPoolOptions, Pool, Postgres, migrate};

pub async fn connect() -> Result<Pool<Postgres>, sqlx::Error> {
    let pool = PgPoolOptions::new().connect(env!("DATABASE_URL")).await?;
    log::info!("successfully connected to database");

    migrate!("../migrations").run(&pool).await?;
    log::info!("successfully migrated database");

    Ok(pool)
}
