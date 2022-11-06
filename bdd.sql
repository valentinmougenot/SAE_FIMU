DROP TABLE IF EXISTS TypeScenes;
DROP TABLE IF EXISTS nationalites;
DROP TABLE IF EXISTS propose;
DROP TABLE IF EXISTS associe;
DROP TABLE IF EXISTS faits;
DROP TABLE IF EXISTS possede;
DROP TABLE IF EXISTS concerts;
DROP TABLE IF EXISTS Prestataire;
DROP TABLE IF EXISTS scenes;
DROP TABLE IF EXISTS artistes;
DROP TABLE IF EXISTS Utilisateur;
DROP TABLE IF EXISTS Role;
DROP TABLE IF EXISTS TypePrestataire;
DROP TABLE IF EXISTS Service;
DROP TABLE IF EXISTS Partenaires;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS reseauxSociaux;
DROP TABLE IF EXISTS typescene;
DROP TABLE IF EXISTS pays;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS saisons;

CREATE TABLE IF NOT EXISTS saisons(
   annee INT,
   couleur1 VARCHAR(255),
   couleur2 VARCHAR(255),
   PRIMARY KEY(annee)
);

CREATE TABLE IF NOT EXISTS genres(
   id SERIAL,
   libelle VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS pays(
   id SERIAL,
   libelle VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS typescene(
   id SERIAL,
   libelle VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS reseauxSociaux(
   id SERIAL,
   libelle VARCHAR(255),
   logo VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS notifications(
   id SERIAL,
   date_envoi TIMESTAMP,
   message VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS categories(
   id SERIAL,
   libelle VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Partenaires(
   id SERIAL,
   nom VARCHAR(255),
   logo VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Service(
   id SERIAL,
   libelle VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS TypePrestataire(
   id SERIAL,
   libelle VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Role(
   id SERIAL,
   libelle VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Utilisateur(
   identifiant INT,
   mot_de_passe VARCHAR(255),
   id_role INT,
   PRIMARY KEY(identifiant),
   FOREIGN KEY(id_role) REFERENCES Role(id)
);

CREATE TABLE IF NOT EXISTS artistes(
   id SERIAL,
   nom VARCHAR(255),
   photo VARCHAR(255),
   biographie VARCHAR(5000),
   lien_video VARCHAR(255),
   id_categorie INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_categorie) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS scenes(
   id SERIAL,
   libelle VARCHAR(255),
   jauge INT,
   latitude VARCHAR(50),
   longitude VARCHAR(50),
   id_typescene INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_typescene) REFERENCES typescene(id)
);

CREATE TABLE IF NOT EXISTS Prestataire(
   id SERIAL,
   libelle VARCHAR(255),
   id_type_prestataire INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_type_prestataire) REFERENCES TypePrestataire(id)
);

CREATE TABLE IF NOT EXISTS concerts(
   id_scene INT,
   id_artiste INT,
   date_debut TIMESTAMP,
   duree INT,
   nb_personnes INT,
   annee INT NOT NULL,
   PRIMARY KEY(id_scene, id_artiste, date_debut),
   FOREIGN KEY(id_scene) REFERENCES scenes(id),
   FOREIGN KEY(id_artiste) REFERENCES artistes(id),
   FOREIGN KEY(annee) REFERENCES saisons(annee)
);

CREATE TABLE IF NOT EXISTS possede(
   id_artiste INT,
   id_reseaux_sociaux INT,
   lien VARCHAR(255),
   PRIMARY KEY(id_artiste, id_reseaux_sociaux),
   FOREIGN KEY(id_artiste) REFERENCES artistes(id),
   FOREIGN KEY(id_reseaux_sociaux) REFERENCES reseauxSociaux(id)
);

CREATE TABLE IF NOT EXISTS faits(
   id_artiste INT,
   id_genre INT,
   PRIMARY KEY(id_artiste, id_genre),
   FOREIGN KEY(id_artiste) REFERENCES artistes(id),
   FOREIGN KEY(id_genre) REFERENCES genres(id)
);

CREATE TABLE IF NOT EXISTS associe(
   annee INT,
   id_partenaire INT,
   PRIMARY KEY(annee, id_partenaire),
   FOREIGN KEY(annee) REFERENCES saisons(annee),
   FOREIGN KEY(id_partenaire) REFERENCES Partenaires(id)
);

CREATE TABLE IF NOT EXISTS propose(
   id_service INT,
   id_prestataire INT,
   PRIMARY KEY(id_service, id_prestataire),
   FOREIGN KEY(id_service) REFERENCES Service(id),
   FOREIGN KEY(id_prestataire) REFERENCES Prestataire(id)
);

CREATE TABLE IF NOT EXISTS nationalites(
    id_artiste INT,
    id_pays INT,
    PRIMARY KEY(id_artiste, id_pays),
    FOREIGN KEY(id_artiste) REFERENCES artistes(id),
    FOREIGN KEY(id_pays) REFERENCES pays(id)
);

INSERT INTO categories (libelle) VALUES
('categorie-1');

INSERT INTO pays (libelle) VALUES
('france'),
('allemagne');

INSERT INTO artistes (id, nom, photo, biographie, lien_video, id_categorie) VALUES
(DEFAULT, 'nom-1', 'photo-1', 'bio-1', 'video-1', 1);

INSERT INTO nationalites (id_artiste, id_pays) VALUES
(1, 1),
(1, 2);

INSERT INTO typescene (libelle) VALUES
('type-scenes-1');

INSERT INTO scenes (libelle, jauge, latitude, longitude, id_typescene) VALUES
('scenes-1', 10000, 2.3948449, 3.141592653, 1);

INSERT INTO notifications(date_envoi, message) VALUES
(NOW(), 'notification message 1');

INSERT INTO saisons (annee, couleur1, couleur2) VALUES
(2022, '#34ABE8', '#185BEF');

INSERT INTO genres (libelle) VALUES
('genre-1');

INSERT INTO faits (id_artiste, id_genre) VALUES
(1, 1);

INSERT INTO concerts (id_scene, id_artiste, date_debut, duree, nb_personnes, annee) VALUES
(1, 1, NOW(), 55, 958, 2022);