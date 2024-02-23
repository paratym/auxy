use rand::{rngs::OsRng, Rng};
use serde::{Deserialize, Serialize};
use sqlx::{database::HasArguments, Decode, Encode, Postgres};

#[derive(Debug, Clone, Copy)]
pub struct ID(i64);

impl ID {
    pub fn new() -> Self {
        Self(OsRng.gen())
    }

    pub fn into_inner(self) -> i64 {
        self.into()
    }

    pub fn from_inner(inner: i64) -> Self {
        inner.into()
    }
}

impl From<i64> for ID {
    fn from(value: i64) -> Self {
        Self(value)
    }
}

impl From<ID> for i64 {
    fn from(ID(value): ID) -> i64 {
        value
    }
}

impl Serialize for ID {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        self.into_inner().serialize(serializer)
    }
}

impl<'de> Deserialize<'de> for ID {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        i64::deserialize(deserializer).map(Self::from)
    }
}

impl<'q> Encode<'q, Postgres> for ID {
    fn encode_by_ref(
        &self,
        buf: &mut <Postgres as HasArguments<'q>>::ArgumentBuffer,
    ) -> sqlx::encode::IsNull {
        Encode::<Postgres>::encode_by_ref(&self.0, buf)
    }
}

impl<'r> Decode<'r, Postgres> for ID {
    fn decode(
        value: <Postgres as sqlx::database::HasValueRef<'r>>::ValueRef,
    ) -> Result<Self, sqlx::error::BoxDynError> {
        Ok(Self(Decode::<Postgres>::decode(value)?))
    }
}

impl sqlx::Type<Postgres> for ID {
    fn type_info() -> <Postgres as sqlx::Database>::TypeInfo {
        <i64 as sqlx::Type<Postgres>>::type_info()
    }
}
