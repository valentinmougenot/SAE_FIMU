DROP TABLE IF EXISTS Produit, Artiste, Genre, Scene, Lieu, User, Role;

CREATE TABLE IF NOT EXISTS Role (
    id INT AUTO_INCREMENT,
    libelle VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT,
    password VARCHAR(255),
    id_role INT,
    PRIMARY KEY (id),
    FOREIGN KEY (id_role) REFERENCES Role(id)
);

INSERT INTO Role (libelle) VALUES
('administrateur'),
('prestataire');


CREATE TABLE IF NOT EXISTS Lieu (
    id INT AUTO_INCREMENT,
    ville VARCHAR(255),
    n_rue INT,
    libelle_rue VARCHAR(255),
    code_postal VARCHAR(6),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Scene (
    id INT AUTO_INCREMENT,
    libelle VARCHAR(255),
    id_lieu INT,
    PRIMARY KEY (id),
    FOREIGN KEY (id_lieu) REFERENCES Lieu(id)
);

CREATE TABLE IF NOT EXISTS Genre (
    id INT AUTO_INCREMENT,
    libelle VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Artiste (
    id INT AUTO_INCREMENT,
    nom VARCHAR(255),
    age INT,
    description TEXT,
    id_genre INT,
    PRIMARY KEY (id),
    FOREIGN KEY (id_genre) REFERENCES Genre(id)
);

CREATE TABLE IF NOT EXISTS Produit (
    horaire DATETIME,
    id_scene INT,
    id_artiste INT,
    PRIMARY KEY (horaire, id_scene, id_artiste),
    FOREIGN KEY (id_scene) REFERENCES Scene(id),
    FOREIGN KEY (id_artiste) REFERENCES Artiste(id)
);