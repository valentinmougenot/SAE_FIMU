SET SEARCH_PATH = common;

DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS utilisateurs;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS reseauxsociaux;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS typeprestataire;
DROP TABLE IF EXISTS typescenes;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS pays;
DROP TABLE IF EXISTS saisons;

CREATE TABLE IF NOT EXISTS saisons(
   annee INTEGER,
   couleur1 VARCHAR(255),
   couleur2 VARCHAR(255),
   PRIMARY KEY(annee)
);

CREATE TABLE IF NOT EXISTS pays(
   id SERIAL,
   libelle VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS categories(
   id SERIAL,
   libelle VARCHAR(255),
   couleur VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS genres(
   id SERIAL,
   libelle VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS typescenes(
   id SERIAL,
   libelle VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS typeprestataire(
   id SERIAL,
   libelle VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS services(
   id SERIAL,
   libelle VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS reseauxsociaux(
   id SERIAL,
   libelle VARCHAR(255),
   logo VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS roles(
   id SERIAL,
   libelle VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS utilisateurs(
   identifiant VARCHAR(255),
   mot_de_passe VARCHAR(255),
   id_role INTEGER,
   PRIMARY KEY(identifiant),
   FOREIGN KEY(id_role) REFERENCES roles(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS notifications(
   id SERIAL,
   date_envoi TIMESTAMP,
   message VARCHAR(255),
   PRIMARY KEY(id)
);

INSERT INTO saisons (annee, couleur1, couleur2) VALUES
(2022, '#34ABE8', '#185BEF'),
(2021, '#111111', '#222222');

INSERT INTO pays (libelle) VALUES
('France'),
('Allemagne'),
('Espagne');

INSERT INTO categories (libelle, couleur) VALUES
('Musique du monde', '#ffffff'),
('Musique actuelle', '#ffffff'),
('Musique classique', '#ffffff'),
('Musique improvisée', '#ffffff');

INSERT INTO genres (libelle) VALUES
('Pop'),
('Fusion jazz'),
('Rock'),
('Traditionnelle');

INSERT INTO typescenes (libelle) VALUES
('Extérieur'),
('Intérieur');

INSERT INTO roles (libelle) VALUES
('Administrateur'),
('Editeur');

INSERT INTO utilisateurs VALUES
('jdoe', 'mdp1', 1),
('srogole', 'mdp2', 2),
('pskuzov', 'mdp3', 2);

INSERT INTO notifications(date_envoi, message) VALUES
(NOW(), 'notification message 1');

INSERT INTO reseauxsociaux(libelle, logo) VALUES
('Instagram', 'logo_insta'),
('Snapchat', 'logo_snap'),
('Facebook', 'logo_face');

