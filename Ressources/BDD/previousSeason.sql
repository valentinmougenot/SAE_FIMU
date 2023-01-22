SET SEARCH_PATH = previousseasons;

DROP TABLE IF EXISTS nationalites;
DROP TABLE IF EXISTS fait;
DROP TABLE IF EXISTS possede;
DROP TABLE IF EXISTS joue;
DROP TABLE IF EXISTS artistes;

CREATE TABLE IF NOT EXISTS artistes(
   id SERIAL,
   nom VARCHAR(255),
   photo VARCHAR(255),
   biographie VARCHAR(5000),
   lien_video VARCHAR(255),
   lien_site VARCHAR(255),
   id_categorie INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_categorie) REFERENCES common.categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS joue(
    id_artiste INTEGER,
    annee INTEGER,
    PRIMARY KEY (id_artiste, annee),
    FOREIGN KEY (id_artiste) REFERENCES artistes(id) ON DELETE CASCADE ,
    FOREIGN KEY (annee) REFERENCES common.saisons(annee) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS possede(
   id_artiste INTEGER,
   id_reseaux_sociaux INTEGER,
   lien VARCHAR(255),
   PRIMARY KEY(id_artiste, id_reseaux_sociaux),
   FOREIGN KEY(id_artiste) REFERENCES artistes(id) ON DELETE CASCADE,
   FOREIGN KEY(id_reseaux_sociaux) REFERENCES common.reseauxsociaux(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS fait(
   id_artiste INTEGER,
   id_genre INTEGER,
   PRIMARY KEY(id_artiste, id_genre),
   FOREIGN KEY(id_artiste) REFERENCES artistes(id) ON DELETE CASCADE,
   FOREIGN KEY(id_genre) REFERENCES common.genres(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS nationalites(
    id_artiste INTEGER,
    id_pays INTEGER,
    PRIMARY KEY(id_artiste, id_pays),
    FOREIGN KEY(id_artiste) REFERENCES artistes(id) ON DELETE CASCADE,
    FOREIGN KEY(id_pays) REFERENCES common.pays(id) ON DELETE CASCADE
);

INSERT INTO artistes (nom, photo, biographie, lien_video, lien_site, id_categorie) VALUES
('#TRAD3', 'https://www.fimu.com/fileadmin/_processed_/a/d/csm_MM__TRAD__ff2b63e800.jpg', 'Ayant baignés dès leur plus jeune âge dans la musique traditionnelle du Centre-France, les deux jeunes frères du groupe #TRAD'' ont l’objectif de faire découvrir cette culture musicale hors du commun tout en apportant une touche de modernité à ', 'https://www.youtube.com/embed/eX65HDpKykA', NULL, 1),
('2PanHeads3', 'https://www.fimu.com/fileadmin/_processed_/5/7/csm_MM_2PanHeads_1400_cad6a9572a.jpg', '2PanHeads c’est le petit frère de Paranoid London ! Amoureux du live, le groupe propose un univers disco rock teinté d’influences acid house et post punk. Le rock et la rave party se mélangent et nous donnent envie de faire la fête. Adeptes inconditionnels de la scène, on a déjà pu les voir dans bon nombre de salles et de festivals du Grand Est et de Franche Comté. Un concert qui promet une énergie transcendante. A ne pas manquer !', 'https://www.youtube.com/embed/0_gMla8hycU', 'https://2panheads.bandcamp.com/', 2),
('#TRAD4', 'https://www.fimu.com/fileadmin/_processed_/a/d/csm_MM__TRAD__ff2b63e800.jpg', 'Ayant baignés dès leur plus jeune âge dans la musique traditionnelle du Centre-France, les deux jeunes frères du groupe #TRAD'' ont l’objectif de faire découvrir cette culture musicale hors du commun tout en apportant une touche de modernité à ', 'https://www.youtube.com/embed/eX65HDpKykA', NULL, 1),
('2PanHeads4', 'https://www.fimu.com/fileadmin/_processed_/5/7/csm_MM_2PanHeads_1400_cad6a9572a.jpg', '2PanHeads c’est le petit frère de Paranoid London ! Amoureux du live, le groupe propose un univers disco rock teinté d’influences acid house et post punk. Le rock et la rave party se mélangent et nous donnent envie de faire la fête. Adeptes inconditionnels de la scène, on a déjà pu les voir dans bon nombre de salles et de festivals du Grand Est et de Franche Comté. Un concert qui promet une énergie transcendante. A ne pas manquer !', 'https://www.youtube.com/embed/0_gMla8hycU', 'https://2panheads.bandcamp.com/', 2);

INSERT INTO nationalites (id_artiste, id_pays) VALUES
(1, 1),
(1, 2),
(2, 3);

INSERT INTO fait (id_artiste, id_genre) VALUES
(1, 1),
(1, 2),
(2, 2);

INSERT INTO joue VALUES
(1, 2021),
(2, 2021),
(3, 2020),
(4, 2020);