-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `db` ;

-- -----------------------------------------------------
-- Table `db`.`device`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`device` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `model` VARCHAR(255) NULL DEFAULT NULL,
  `price` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db`.`line`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`line` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `number` VARCHAR(255) NULL DEFAULT NULL,
  `device_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_apuh8jcy6s2br7ut0w9541yiw` (`number` ASC) VISIBLE,
  UNIQUE INDEX `UK_okea5u2jmaw2th3y6773c51l3` (`device_id` ASC) VISIBLE,
  CONSTRAINT `FKh3t1t577nsrwh0n1ovg10ma9d`
    FOREIGN KEY (`device_id`)
    REFERENCES `db`.`device` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db`.`plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`plan` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `plan_type` TINYINT NULL DEFAULT NULL,
  `price` INT NOT NULL,
  `quota` INT NOT NULL,
  `signal_range` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db`.`plan_lines`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`plan_lines` (
  `plan_id` BIGINT NOT NULL,
  `lines_id` BIGINT NOT NULL,
  UNIQUE INDEX `UK_d70vny5jmo8cvxi9r3qhlhqje` (`lines_id` ASC) VISIBLE,
  INDEX `FKhubx5tig8vmxjrr0hctyv1ven` (`plan_id` ASC) VISIBLE,
  CONSTRAINT `FKhubx5tig8vmxjrr0hctyv1ven`
    FOREIGN KEY (`plan_id`)
    REFERENCES `db`.`plan` (`id`),
  CONSTRAINT `FKl3vki9bnrgei1mly9fho8i2w6`
    FOREIGN KEY (`lines_id`)
    REFERENCES `db`.`line` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `first_name` VARCHAR(255) NULL DEFAULT NULL,
  `last_name` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_ob8kqyqqgmefl0aco34akdtpe` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db`.`user_plans`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`user_plans` (
  `user_id` BIGINT NOT NULL,
  `plans_id` BIGINT NOT NULL,
  UNIQUE INDEX `UK_b5t6b6ylq4qjvgevigsw1fo46` (`plans_id` ASC) VISIBLE,
  INDEX `FK5u9gplatq2ise9slwb5e7b4cs` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK5u9gplatq2ise9slwb5e7b4cs`
    FOREIGN KEY (`user_id`)
    REFERENCES `db`.`user` (`id`),
  CONSTRAINT `FKefnuq1tr1uyx86k59dsxeelg4`
    FOREIGN KEY (`plans_id`)
    REFERENCES `db`.`plan` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
