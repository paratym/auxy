use rand::{rngs::OsRng, RngCore};
use std::num::ParseIntError;
use time::{macros::datetime, OffsetDateTime};

const AUXY_EPOCH: OffsetDateTime = datetime!(2023-01-01 0:00 UTC);
const MACHINE_ID: u16 = 0;

pub struct RowID(i64);

impl RowID {
    pub fn new() -> Self {
        let time_bits = (OffsetDateTime::now_utc() - AUXY_EPOCH).whole_seconds() as u32;
        let rand_bits = (OsRng.next_u32() >> 16) as u16;

        Self(((time_bits as i64) << 32) | ((MACHINE_ID as i64) << 16) | (rand_bits as i64))
    }

    pub fn from_int(id: i64) -> Self {
        Self(id)
    }

    pub fn as_int(&self) -> i64 {
        self.0
    }

    pub fn try_from_str(id: &str) -> Result<Self, ParseIntError> {
        Ok(Self(i64::from_str_radix(id, 16)?))
    }

    pub fn to_string(&self) -> String {
        format!("{:x}", self.0)
    }
}
