use async_trait::async_trait;
use tokio::io::AsyncRead;
use crate::AuxyError;

#[async_trait]
pub trait TrackStore {
  async fn get(&self, id: &str) -> Result<Box<dyn AsyncRead>, AuxyError>;
  async fn put(&self, src: &mut dyn AsyncRead) -> Result<Box<str>, AuxyError>;
  async fn delete(&self, id: &str) -> Result<(), AuxyError>;
}