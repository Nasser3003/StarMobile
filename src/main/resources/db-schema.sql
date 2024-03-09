CREATE SCHEMA IF NOT EXISTS db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE db;

CREATE TABLE IF NOT EXISTS line (
  id BIGINT NOT NULL AUTO_INCREMENT,
  number VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX UNIQUE_line_number (number ASC)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS device (
  id BIGINT NOT NULL AUTO_INCREMENT,
  brand VARCHAR(100) NULL DEFAULT NULL,
  description VARCHAR(255) NULL DEFAULT NULL,
  model VARCHAR(100) NULL DEFAULT NULL,
  price INT NOT NULL,
  line_id BIGINT NOT NULL,
  PRIMARY KEY (id),
  INDEX INDEX_device_line_id (line_id ASC),
  CONSTRAINT FK_device_line_id
    FOREIGN KEY (line_id)
    REFERENCES line (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS plan (
  id BIGINT NOT NULL AUTO_INCREMENT,
  plan_type TINYINT NULL DEFAULT NULL,
  price INT NOT NULL,
  quota INT NOT NULL,
  signal_range VARCHAR(255) NULL DEFAULT NULL,
  device_id BIGINT NOT NULL,
  PRIMARY KEY (id),
  INDEX INDEX_plan_device_id (device_id ASC),
  CONSTRAINT FK_plan_device_id
    FOREIGN KEY (device_id)
    REFERENCES device (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS user (
  id BIGINT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NULL DEFAULT NULL,
  first_name VARCHAR(100) NULL DEFAULT NULL,
  last_name VARCHAR(100) NULL DEFAULT NULL,
  password VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX UNIQUE_user_email (email ASC)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS user_device (
  user_id BIGINT NULL,
  device_id BIGINT NULL,
  INDEX INDEX_user_id (user_id ASC),
  INDEX INDEX_device_id (device_id ASC),
  CONSTRAINT FK_user_id
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT FK_device_id
    FOREIGN KEY (device_id)
    REFERENCES device (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;