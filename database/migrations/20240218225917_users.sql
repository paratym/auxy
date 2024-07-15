CREATE TABLE users (
    id BIGINT PRIMARY KEY NOT NULL,
    username VARCHAR(32) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE sessions (
    id BIGINT PRIMARY KEY NOT NULL,
	user_id BIGINT NOT NULL,
	expires_at TIMESTAMP NOT NULL,

	CONSTRAINT session_user_id_fk FOREIGN KEY(user_id) REFERENCES users(id)
);
