CREATE TABLE user (
  id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(191) UNIQUE,
  salt VARCHAR(20),
  password VARCHAR(40),
  display_name TEXT,
  avatar_icon TEXT,
  created_at DATETIME NOT NULL,
  INDEX user_name_idx (name)
) Engine=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE channel (
  id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  description MEDIUMTEXT,
  updated_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL
) Engine=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE message (
  id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  channel_id BIGINT,
  user_id BIGINT,
  content TEXT,
  created_at DATETIME NOT NULL
) Engine=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE channel_message_num (
  channel_id BIGINT NOT NULL PRIMARY KEY,
  num BIGINT NOT NULL
) Engine=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE channel_message_read_num (
  user_id BIGINT NOT NULL,
  channel_id BIGINT NOT NULL,
  num BIGINT NOT NULL,
  PRIMARY KEY(user_id, channel_id)
) Engine=InnoDB DEFAULT CHARSET=utf8mb4