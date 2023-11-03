CREATE TABLE IF NOT EXISTS "users" (
  "id" BIGINT PRIMARY KEY,
  "username" VARCHAR(255) NOT NULL UNIQUE,
);

CREATE TABLE IF NOT EXISTS "auth" (
  "user_id" BIGINT NOT NULL PRIMARY KEY,
  "password_hash" VARCHAR(255),
  "password_salt" VARCHAR(255),
  "session_token" VARCHAR(255),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);
