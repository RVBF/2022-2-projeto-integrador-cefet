CREATE SCHEMA
IF NOT EXISTS `pis-grupo1` DEFAULT CHARACTER
SET utf8
COLLATE utf8_unicode_ci ;
USE `pis-grupo1`
;

CREATE TABLE
IF NOT EXISTS `pis-grupo1`.`aluno`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR
(255) NULL,
  `cpf` CHAR
(11) NULL,
  `telefone` INT NULL,
  `email` VARCHAR
(45) NULL,
  PRIMARY KEY
(`id`))
ENGINE = InnoDB;

CREATE TABLE
IF NOT EXISTS `pis-grupo1`.`curso`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `codigo` CHAR
(5) NULL,
  `nome` VARCHAR
(255) NULL,
  `situacao` ENUM
('não iniciado', 'iniciado', 'finalizado') NULL,
  `inicio` DATETIME NULL,
  `termino` DATETIME NULL,
  PRIMARY KEY
(`id`))
ENGINE = InnoDB;

CREATE TABLE
IF NOT EXISTS `pis-grupo1`.`funcionario`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR
(255) NULL,
  `cpf` CHAR
(11) NULL,
  `email` VARCHAR
(45) NULL,
  `senha` VARCHAR
(255) NULL,
  `curso_id` INT NOT NULL,
  PRIMARY KEY
(`id`, `curso_id`),
  INDEX `fk_funcionario_curso1_idx`
(`curso_id` ASC) VISIBLE,
  CONSTRAINT `fk_funcionario_curso1`
    FOREIGN KEY
(`curso_id`)
    REFERENCES `pis-grupo1`.`curso`
(`id`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE
IF NOT EXISTS `pis-grupo1`.`aluno_curso`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `numero_matricula` CHAR
(6) NULL,
  `nota_av1` DECIMAL
(4,2) NULL,
  `nota_av2` DECIMAL
(4,2) NULL,
  `nota_af` DECIMAL
(4,2) NULL,
  `faltas` INT NULL,
  `aluno_id` INT NOT NULL,
  `curso_id` INT NOT NULL,
  PRIMARY KEY
(`id`, `aluno_id`, `curso_id`),
  INDEX `fk_aluno_curso_aluno_idx`
(`aluno_id` ASC) VISIBLE,
  INDEX `fk_aluno_curso_curso1_idx`
(`curso_id` ASC) VISIBLE,
  CONSTRAINT `fk_aluno_curso_aluno`
    FOREIGN KEY
(`aluno_id`)
    REFERENCES `pis-grupo1`.`aluno`
(`id`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION,
  CONSTRAINT `fk_aluno_curso_curso1`
    FOREIGN KEY
(`curso_id`)
    REFERENCES `pis-grupo1`.`curso`
(`id`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION)
ENGINE = InnoDB;