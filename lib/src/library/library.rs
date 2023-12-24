use std::{collections::HashMap, sync::Arc};
use crate::library::{TrackStore, DataStore};

pub struct Library {
  track_stores: HashMap<&'static str, Arc<dyn TrackStore>>,
  data_stores: HashMap<&'static str, Arc<dyn DataStore>>
}

impl Library {
  pub fn new() -> Self {
    Self {
      track_stores: HashMap::new(),
      data_stores: HashMap::new()
    }
  }

  pub fn with_track_store(mut self, name: &'static str, store: impl TrackStore + 'static) -> Self {
    self.track_stores.insert(name, Arc::new(store));
    self
  }

  pub fn with_data_store(mut self, name: &'static str, store: impl DataStore + 'static) -> Self {
    self.data_stores.insert(name, Arc::new(store));
    self
  }

  pub fn track_store(&self, name: &'static str) -> Option<Arc<dyn TrackStore>> {
    self.track_stores.get(name).map(|s| s.clone())
  }

  pub fn data_store(&self, name: &'static str) -> Option<Arc<dyn DataStore>> {
    self.data_stores.get(name).map(|s| s.clone())
  }
}