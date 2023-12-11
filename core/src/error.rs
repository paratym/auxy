use std::io;

pub enum AuxyError {
  NotFound
}

impl From<io::Error> for AuxyError {
    fn from(value: io::Error) -> Self {
        todo!()
    }
}