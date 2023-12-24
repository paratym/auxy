use async_trait::async_trait;
use syphon::{SignalSpec, SampleType};
use crate::AuxyError;

pub struct TrackData {
  id: Box<str>,
  release_id: Box<str>,
  artist_id: Box<str>,
  title: Box<str>,
  pcm_spec: SignalSpec<SampleType>
}

pub struct TrackUpdate {
  release_id: Option<Box<str>>,
  artist_id: Option<Box<str>>,
  title: Option<Box<str>>,
  pcm_spec: Option<SignalSpec<SampleType>>
}

pub struct ReleaseData {
  id: Box<str>,
  artist_id: Box<str>,
  title: Box<str>,
  track_ids: Vec<Box<str>>
}

pub struct ReleaseUpdate {
  artist_id: Option<Box<str>>,
  title: Option<Box<str>>,
  track_ids: Option<Vec<Box<str>>>
}

pub struct ArtistData {
  id: Box<str>,
  name: Box<str>,
  release_ids: Vec<Box<str>>
}

pub struct ArtistUpdate {
  name: Option<Box<str>>,
  release_ids: Option<Vec<Box<str>>>
}

pub enum ObjectData {
  Track(TrackData),
  Release(ReleaseData),
  Artist(ArtistData)
}

pub enum ObjectUpdate {
  Track(TrackUpdate),
  Release(ReleaseUpdate),
  Artist(ArtistUpdate)
}

#[async_trait]
pub trait DataStore {
  async fn create_track(&self, data: TrackData) -> Result<Box<str>, AuxyError>;
  async fn get_track(&self, id: &str) -> Result<TrackData, AuxyError>;
  async fn update_track(&self, id: &str, data: TrackUpdate) -> Result<(), AuxyError>;
  async fn delete_track(&self, id: &str) -> Result<(), AuxyError>;

  async fn create_release(&self, data: ReleaseData) -> Result<Box<str>, AuxyError>;
  async fn get_release(&self, id: &str) -> Result<ReleaseData, AuxyError>;
  async fn update_release(&self, id: &str, data: ReleaseUpdate) -> Result<(), AuxyError>;
  async fn delete_release(&self, id: &str) -> Result<(), AuxyError>;

  async fn create_artist(&self, data: ArtistData) -> Result<Box<str>, AuxyError>;
  async fn get_artist(&self, id: &str) -> Result<ArtistData, AuxyError>;
  async fn update_artist(&self, id: &str, data: ArtistUpdate) -> Result<(), AuxyError>;
  async fn delete_artist(&self, id: &str) -> Result<(), AuxyError>;

  async fn create(&self, data: ObjectData) -> Result<Box<str>, AuxyError> {
    use ObjectData::*;

    match data {
      Track(data) => self.create_track(data).await,
      Release(data) => self.create_release(data).await,
      Artist(data) => self.create_artist(data).await
    }
  }

  async fn update(&self, id: &str, data: ObjectUpdate) -> Result<(), AuxyError> {
    use ObjectUpdate::*;
    
    match data {
      Track(data) => self.update_track(id, data).await,
      Release(data) => self.update_release(id, data).await,
      Artist(data) => self.update_artist(id, data).await
    }
  }
}