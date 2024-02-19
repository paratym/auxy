#[derive(Debug)]
pub enum DatabaseError {}

impl From<sqlx::error::Error> for DatabaseError {
    fn from(value: sqlx::error::Error) -> Self {
        todo!()
    }
}

impl From<sqlx::migrate::MigrateError> for DatabaseError {
    fn from(value: sqlx::migrate::MigrateError) -> Self {
        todo!()
    }
}
