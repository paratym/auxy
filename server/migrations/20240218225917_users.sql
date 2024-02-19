CREATE TABLE users (
    id BIGINT PRIMARY KEY NOT NULL,
    username VARCHAR(32) UNIQUE NOT NULL
);

CREATE TYPE auth_provider AS ENUM (
	'password'
);

CREATE TABLE auth (
    id BIGINT PRIMARY KEY NOT NULL,
    password VARCHAR(255) NULL,
    session_token VARCHAR(255),
    session_provider auth_provider,

	CONSTRAINT auth_id_foreign FOREIGN KEY(id) REFERENCES users(id)
);
