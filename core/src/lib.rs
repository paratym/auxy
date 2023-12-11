mod error;

pub use error::*;

use std::{path::{Path, PathBuf}, fs::File, io::{BufRead, BufReader, Read}, collections::HashMap, borrow::Borrow, sync::Arc};
use serde::{Serialize, Deserialize};
use async_trait::async_trait;

pub enum ObjectType {
    Track
}

#[async_trait]
pub trait TrackStore<K: ?Sized, I, O> {
    async fn put(&self, key: &K, value: I) -> Result<(), AuxyError>;
    async fn get(&self, key: &K) -> Result<O, AuxyError>;
    async fn delete(&self, key: &K) -> Result<(), AuxyError>;
}

pub trait ExposedTrackStore:
    TrackStore<str, Box<dyn Read>, Box<dyn Read>>
    + Send
    + Sync
{}

pub struct FsTrackStore {
    path: PathBuf
}

impl FsTrackStore {
    pub fn new(path: PathBuf) -> Self {
        Self {
            path
        }
    }
}

#[async_trait]
impl<K: Borrow<str> + Send + Sync, I: Read + Send + 'static> TrackStore<K, I, Box<dyn Read>> for FsTrackStore {
    async fn put(&self, key: &K, mut value: I) -> Result<(), AuxyError> {
        let path = self.path.join(key.borrow());
        let mut file = File::create(path)?;
        std::io::copy(&mut value, &mut file)?;
        Ok(())
    }

    async fn get(&self, key: &K) -> Result<Box<dyn Read>, AuxyError> {
        let path = self.path.join(key.borrow());
        let file = BufReader::new(File::open(path)?);
        Ok((Box::new(file) as Box::<dyn Read>))
    }

    async fn delete(&self, key: &K) -> Result<(), AuxyError> {
        let path = self.path.join(key.borrow());
        std::fs::remove_file(path)?;
        Ok(())
    }
}

pub struct App {
    track_stores: HashMap<String, Arc<dyn ExposedTrackStore>>
}

impl App {
    pub fn new() -> Self {
        Self {
            track_stores: HashMap::new()
        }
    }

    pub fn with_track_store<K, V>(mut self, name: K, track_store: V) -> Self
    where
        K: Into<String>,
        V: ExposedTrackStore + 'static
    {
        self.track_stores.insert(name.into(), Arc::new(track_store));
        self
    }

    pub async fn get_track(&self, store_id: &str, track_id: &str) -> Result<Box<dyn Read>, AuxyError> {
        self.track_stores
            .get(store_id)
            .ok_or(AuxyError::NotFound)?
            .get(track_id)
            .await
    }
}
