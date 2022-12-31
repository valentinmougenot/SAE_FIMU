SET SEARCH_PATH = currentseason;

DROP TABLE IF EXISTS nationalites;
DROP TABLE IF EXISTS propose;
DROP TABLE IF EXISTS associe;
DROP TABLE IF EXISTS fait;
DROP TABLE IF EXISTS possede;
DROP TABLE IF EXISTS concerts;
DROP TABLE IF EXISTS stands;
DROP TABLE IF EXISTS scenes;
DROP TABLE IF EXISTS artistes;
DROP TABLE IF EXISTS partenaires;

CREATE TABLE IF NOT EXISTS partenaires(
   id SERIAL,
   nom VARCHAR(255),
   logo VARCHAR(255),
   PRIMARY KEY(id)
);

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

CREATE TABLE IF NOT EXISTS scenes(
   id SERIAL,
   libelle VARCHAR(255),
   jauge INTEGER,
   latitude VARCHAR(50),
   longitude VARCHAR(50),
   id_typescene INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_typescene) REFERENCES common.typescenes(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS stands(
   id SERIAL,
   libelle VARCHAR(255),
   latitude VARCHAR(50),
   longitude VARCHAR(50),
   id_typestand INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_typestand) REFERENCES common.typestand(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS concerts(
   id SERIAL,
   id_scene INTEGER,
   id_artiste INTEGER,
   heure_debut TIME,
   date_debut DATE,
   duree INTEGER,
   nb_personnes INTEGER,
   annee INT NOT NULL,
   PRIMARY KEY(id_scene, id_artiste, heure_debut, date_debut),
   FOREIGN KEY(id_scene) REFERENCES scenes(id) ON DELETE CASCADE,
   FOREIGN KEY(id_artiste) REFERENCES artistes(id) ON DELETE CASCADE,
   FOREIGN KEY(annee) REFERENCES common.saisons(annee) ON DELETE CASCADE
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

CREATE TABLE IF NOT EXISTS associe(
   annee INTEGER,
   id_partenaire INTEGER,
   PRIMARY KEY(annee, id_partenaire),
   FOREIGN KEY(annee) REFERENCES common.saisons(annee) ON DELETE CASCADE,
   FOREIGN KEY(id_partenaire) REFERENCES partenaires(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS propose(
   id_service INTEGER,
   id_stand INTEGER,
   PRIMARY KEY(id_service, id_stand),
   FOREIGN KEY(id_service) REFERENCES common.services(id) ON DELETE CASCADE,
   FOREIGN KEY(id_stand) REFERENCES stands(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS nationalites(
    id_artiste INTEGER,
    id_pays INTEGER,
    PRIMARY KEY(id_artiste, id_pays),
    FOREIGN KEY(id_artiste) REFERENCES artistes(id) ON DELETE CASCADE,
    FOREIGN KEY(id_pays) REFERENCES common.pays(id) ON DELETE CASCADE
);

INSERT INTO artistes (nom, photo, biographie, lien_video, lien_site, id_categorie) VALUES
('#TRAD', 'https://www.fimu.com/fileadmin/_processed_/a/d/csm_MM__TRAD__ff2b63e800.jpg', 'Ayant baignés dès leur plus jeune âge dans la musique traditionnelle du Centre-France, les deux jeunes frères du groupe #TRAD'' ont l’objectif de faire découvrir cette culture musicale hors du commun tout en apportant une touche de modernité à ', 'https://www.youtube.com/embed/eX65HDpKykA', NULL, 1),
('2PanHeads', 'https://www.fimu.com/fileadmin/_processed_/5/7/csm_MM_2PanHeads_1400_cad6a9572a.jpg', '2PanHeads c’est le petit frère de Paranoid London ! Amoureux du live, le groupe propose un univers disco rock teinté d’influences acid house et post punk. Le rock et la rave party se mélangent et nous donnent envie de faire la fête. Adeptes inconditionnels de la scène, on a déjà pu les voir dans bon nombre de salles et de festivals du Grand Est et de Franche Comté. Un concert qui promet une énergie transcendante. A ne pas manquer !', 'https://www.youtube.com/embed/0_gMla8hycU', 'https://2panheads.bandcamp.com/', 2),
('Aleph Quintet', 'https://www.fimu.com/fileadmin/_processed_/f/5/csm_J_Aleph_Quintet_ad33dc29d4.jpg', 'Tout droit venus de Bruxelles, ces cinq musiciens proposent un voyage dépaysant grâce à leur musique d’improvisation Jazz, teintée de rythmes Gnawa et de culture Soufi. Un mélange hétéroclite de nationalités et de parcours. Leur objectif ? Transmettre leur énergie et leur passion au travers de leur musique. Leurs compositions se caractérisent par la rencontre du jazz moderne (piano, basse, batterie) et l''alliance des sonorités du oud et du violon, proche des musiques traditionnelles du Maghreb et du Moyen-Orient.', 'https://www.youtube.com/embed/g_BzTSdJLqM', NULL, 3),
('AMA', 'https://www.fimu.com/fileadmin/_processed_/8/7/csm_MM_Ama_033bdbc747.jpg', 'Ce groupe burkinabé rassemble trois jeunes talents qui unissent leurs univers musicaux sur scène. Un savant mélange inspiré du terroir et de la tradition musicale burkinabé. Au son de la kora et du balafon laissez-vous emporter en Afrique de l''Ouest grâce à la voix unique de leur chanteuse, Awa Guindo. ', NULL, NULL, 4);

INSERT INTO nationalites (id_artiste, id_pays) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 1),
(4, 3);

INSERT INTO scenes (libelle, jauge, latitude, longitude, id_typescene) VALUES
('L''arsenal', NULL, 2.3948449, 3.141592653, 1),
('Grande scène', NULL, 3.3948449, 4.141592653, 1),
('Jazz', NULL, 4.3948449, 5.141592653, 1),
('Hôtel du département', 1000, 5.3948449, 6.141592653, 2),
('St Christophe', 500, 6.3948449, 7.141592653, 2),
('Kiosque', 800, 7.3948449, 8.141592653, 2),
('Salle des fêtes', 300, 8.3948449, 9.141592653, 2),
('Savoureuse', NULL, 9.3948449, 10.141592653, 1);

INSERT INTO fait (id_artiste, id_genre) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3),
(4, 4);

INSERT INTO concerts (id_scene, id_artiste, heure_debut, date_debut, duree, nb_personnes, annee) VALUES
(1, 1, '12:45', '2022-12-10', 75, 958, 2022),
(4, 2, '15:30', '2022-12-10', 120, 0, 2022),
(3, 3, '17:00', '2022-12-11', 90, 0, 2022),
(4, 4, '20:00', '2022-12-12', 45, 0, 2022);

INSERT INTO possede VALUES
(1, 1, 'lien-1'),
(1, 2, 'lien-2'),
(2, 2, 'lien-3');

INSERT INTO stands (libelle, latitude, longitude, id_typestand) VALUES
('Stand 1', 1.3948449, 2.141592653, 1),
('Stand 2', 2.3948449, 3.141592653, 1),
('Stand 3', 3.3948449, 4.141592653, 1),
('Stand 4', 4.3948449, 5.141592653, 1),
('Stand 5', 5.3948449, 6.141592653, 1),
('Stand 6', 6.3948449, 7.141592653, 1),
('Stand 7', 7.3948449, 8.141592653, 1),
('Stand 8', 8.3948449, 9.141592653, 1),
('Stand 9', 9.3948449, 10.141592653, 1),
('Stand 10', 10.3948449, 11.141592653, 2),
('Stand 11', 11.3948449, 12.141592653, 2),
('Stand 12', 12.3948449, 13.141592653, 2),
('Stand 13', 13.3948449, 14.141592653, 2),
('Stand 14', 14.3948449, 15.141592653, 3),
('Stand 15', 15.3948449, 16.141592653, 3),
('Stand 16', 16.3948449, 17.141592653, 3),
('Stand 17', 17.3948449, 18.141592653, 3),
('Stand 18', 18.3948449, 19.141592653, 4),
('Stand 19', 19.3948449, 20.141592653, 4),
('Stand 20', 20.3948449, 21.141592653, 4),
('Stand 21', 21.3948449, 22.141592653, 4),
('Stand 22', 22.3948449, 23.141592653, 5),
('Stand 23', 23.3948449, 24.141592653, 5);

INSERT INTO propose(id_stand, id_service) VALUES
(1, 1),
(1, 3),
(2, 3),
(5, 2);