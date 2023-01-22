SET SEARCH_PATH = common;

DROP TABLE IF EXISTS actualites;
DROP TABLE IF EXISTS typeactu;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS utilisateurs;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS reseauxsociaux;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS typestand;
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

CREATE TABLE IF NOT EXISTS typestand(
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
   date_envoi DATE,
   heure_envoi TIME,
   message VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS typeactu (
    id SERIAL,
    libelle VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS actualites(
    id SERIAL,
    date_envoi TIMESTAMP,
    titre VARCHAR(255),
    contenu TEXT,
    id_typeactu INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(id_typeactu) REFERENCES typeactu(id) ON DELETE SET NULL
);

INSERT INTO saisons (annee, couleur1, couleur2) VALUES
(2023, '#34ABE8', '#185BEF'),
(2022, '#34ABE8', '#185BEF'),
(2021, '#111111', '#222222'),
(2020, '#111111', '#222222');

INSERT INTO pays (libelle) VALUES
('France'),
('Allemagne'),
('Espagne');

INSERT INTO categories (libelle, couleur) VALUES
('Musique du monde', '#dc331e'),
('Musique actuelle', '#39b7ab'),
('Musique classique', '#f5a8ae'),
('Musique improvisée', '#f6d914');

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
('admin', '$2a$10$guQcEKLVrLObnENrzX3vAOMiep1nMk8ppJ0l5zhpAU0FEPLVstuV2', 1),
('editor', '$2y$10$VjkDzzYgKjHALQK69oEFUuo0Ojzk6RqaE/XUSG2oqXP6g97anfH1i', 2);

INSERT INTO notifications(date_envoi, heure_envoi, message) VALUES
(NOW(), NOW(), 'notification message 1');

INSERT INTO reseauxsociaux(libelle, logo) VALUES
('Instagram', 'mdi-instagram'),
('Snapchat', 'mdi-snapchat'),
('Facebook', 'mdi-facebook'),
('Twitter', 'mdi-twitter');

INSERT INTO typeactu(libelle) VALUES
('Info'),
('Avertissement'),
('Urgent');

INSERT INTO actualites(date_envoi, titre, contenu, id_typeactu) VALUES
(NOW(), 'titre', 'contenu cool', 1),
(NOW(), 'titre1', 'contenu cool1', 2),
(NOW(), 'titre2', 'contenu cool2', 3),
(NOW(), 'titre3', 'contenu cool3', 1);

INSERT INTO typestand (libelle) VALUES
('Restauration'),
('Buvette'),
('Boutique'),
('WC'),
('Divers');

INSERT INTO services (libelle) VALUES
('Frites'),
('Coca'),
('Bière'),
('Chips'),
('Saucisse');