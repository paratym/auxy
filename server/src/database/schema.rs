mod id {
    use base64::engine::{general_purpose::URL_SAFE_NO_PAD as base64Engine, Engine};
    use rand::{rngs::OsRng, RngCore};
    use time::{macros::datetime, OffsetDateTime};

    const AUXY_EPOCH: OffsetDateTime = datetime!(2023-01-01 0:00 UTC);
    const MACHINE_ID: u16 = 0;

    pub struct ID(u64);

    impl ID {
        pub fn new() -> Self {
            let time_bits = (OffsetDateTime::now_utc() - AUXY_EPOCH).whole_seconds() as u32;
            let rand_bits = (OsRng.next_u32() >> 16) as u16;

            Self(((time_bits as u64) << 32) | ((MACHINE_ID as u64) << 16) | (rand_bits as u64))
        }

        pub fn try_from_str(id: &str) -> Result<Self, ()> {
            if let Ok(bytes) = base64Engine.decode(id.as_bytes()) {
                if let Ok(bytes) = bytes.try_into() {
                    return Ok(Self(u64::from_be_bytes(bytes)));
                }
            }

            Err(())
        }

        pub fn to_string(&self) -> String {
            base64Engine.encode(self.0.to_be_bytes())
        }
    }

    impl From<u64> for ID {
        fn from(id: u64) -> Self {
            Self(id)
        }
    }

    impl From<ID> for u64 {
        fn from(id: ID) -> Self {
            id.0
        }
    }
}

pub use id::*;

pub struct UserRow {
    pub id: ID,
    pub username: Box<str>,
}

