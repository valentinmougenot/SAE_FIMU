import Sequelize from 'sequelize';
import {dbConfig} from '../db.config.js';
import {artiste} from './artiste.model.js';
import {scene} from './scene.model.js';
import {categorie} from './categorie.model.js';
import {genre} from './genre.model.js';
import {saison} from './saison.model.js';
import {concert} from './concert.model.js';
import {notification} from './notification.model.js';
import {pays} from './pays.model.js';
import {typescene} from './typescene.model.js';
import {nationalite} from './nationalite.model.js';
import {fait} from './fait.model.js';
import { utilisateur } from './utilisateur.model.js';
import {role} from './role.model.js';
import { reseauxSociaux } from './reseauxSociaux.model.js';
import { possede } from './possede.model.js';
import { faitNext } from './faitNext.model.js';
import { faitPrevious } from './faitPrevious.model.js';
import { nationaliteNext } from './nationaliteNext.model.js';
import { nationalitePrevious } from './nationalitePrevious.model.js';
import { artisteNext } from './artisteNext.model.js';
import { artistePrevious } from './artistePrevious.model.js';
import { sceneNext } from './sceneNext.model.js';
import { concertNext } from './concertNext.model.js';
import { possedeNext } from './possedeNext.model.js';
import { possedePrevious } from './possedePrevious.model.js';
import { jouePrevious } from './jouePrevious.model.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    define: {
      timestamps: false
    }
});

export const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.artiste = artiste(sequelize, Sequelize);
db.scene = scene(sequelize, Sequelize);
db.concert = concert(sequelize, Sequelize);
db.notification = notification(sequelize, Sequelize);
db.categorie = categorie(sequelize, Sequelize);
db.genre = genre(sequelize, Sequelize);
db.saison = saison(sequelize, Sequelize);
db.pays = pays(sequelize, Sequelize);
db.typescene = typescene(sequelize, Sequelize);
db.nationalite = nationalite(sequelize, Sequelize);
db.fait = fait(sequelize, Sequelize);
db.utilisateur = utilisateur(sequelize, Sequelize);
db.role = role(sequelize, Sequelize);
db.reseauxSociaux = reseauxSociaux(sequelize, Sequelize);
db.possede = possede(sequelize, Sequelize );
db.faitNext = faitNext(sequelize, Sequelize);
db.faitPrevious = faitPrevious(sequelize, Sequelize);
db.nationaliteNext = nationaliteNext(sequelize, Sequelize);
db.nationalitePrevious = nationalitePrevious(sequelize, Sequelize);
db.artisteNext = artisteNext(sequelize, Sequelize);
db.artistePrevious = artistePrevious(sequelize, Sequelize);
db.sceneNext = sceneNext(sequelize, Sequelize);
db.concertNext = concertNext(sequelize, Sequelize);
db.possedeNext = possedeNext(sequelize, Sequelize);
db.possedePrevious = possedePrevious(sequelize, Sequelize);
db.jouePrevious = jouePrevious(sequelize, Sequelize);


db.nationalite.belongsTo(db.artiste, {foreignKey: 'id_artiste'});
db.nationalite.belongsTo(db.pays, {foreignKey: 'id_pays'});
db.artiste.hasMany(db.nationalite, {foreignKey: 'id_artiste'});
db.pays.hasMany(db.nationalite, {foreignKey: 'id_pays'});

db.possede.belongsTo(db.artiste, {foreignKey: 'id_artiste'});
db.possede.belongsTo(db.reseauxSociaux, {foreignKey: 'id_reseaux_sociaux'});
db.artiste.hasMany(db.possede, {foreignKey: 'id_artiste'});
db.reseauxSociaux.hasMany(db.possede, {foreignKey: 'id_reseaux_sociaux'});

db.artiste.belongsTo(db.categorie, {foreignKey: 'id_categorie'});
db.categorie.hasMany(db.artiste, {foreignKey: 'id_categorie'});

db.fait.belongsTo(db.artiste, {foreignKey: 'id_artiste'});
db.fait.belongsTo(db.genre, {foreignKey: 'id_genre'});
db.artiste.hasMany(db.fait, {foreignKey: 'id_artiste'});
db.genre.hasMany(db.fait, {foreignKey: 'id_genre'});

db.concert.belongsTo(db.artiste, {foreignKey: 'id_artiste'});
db.artiste.hasMany(db.concert, {foreignKey: 'id_artiste'});

db.concert.belongsTo(db.scene, {foreignKey: 'id_scene'});
db.scene.hasMany(db.concert, {foreignKey: 'id_scene'});

db.concert.belongsTo(db.saison, {foreignKey: 'annee'});
db.saison.hasMany(db.concert, {foreignKey: 'annee'});

db.scene.belongsTo(db.typescene, {foreignKey: 'id_typescene'});
db.typescene.hasMany(db.scene, {foreignKey: 'id_typescene'});

db.utilisateur.belongsTo(db.role, {foreignKey: 'id_role'});
db.role.hasMany(db.utilisateur, {foreignKey: 'id_role'});

// -----------------------------------------------------------------------------

db.nationaliteNext.belongsTo(db.artisteNext, {foreignKey: 'id_artiste'});
db.nationaliteNext.belongsTo(db.pays, {foreignKey: 'id_pays'});
db.artisteNext.hasMany(db.nationaliteNext, {foreignKey: 'id_artiste'});
db.pays.hasMany(db.nationaliteNext, {foreignKey: 'id_pays'});

db.possedeNext.belongsTo(db.artisteNext, {foreignKey: 'id_artiste'});
db.possedeNext.belongsTo(db.reseauxSociaux, {foreignKey: 'id_reseaux_sociaux'});
db.artisteNext.hasMany(db.possedeNext, {foreignKey: 'id_artiste'});
db.reseauxSociaux.hasMany(db.possedeNext, {foreignKey: 'id_reseaux_sociaux'});

db.artisteNext.belongsTo(db.categorie, {foreignKey: 'id_categorie'});
db.categorie.hasMany(db.artisteNext, {foreignKey: 'id_categorie'});

db.faitNext.belongsTo(db.artisteNext, {foreignKey: 'id_artiste'});
db.faitNext.belongsTo(db.genre, {foreignKey: 'id_genre'});
db.artisteNext.hasMany(db.faitNext, {foreignKey: 'id_artiste'});
db.genre.hasMany(db.faitNext, {foreignKey: 'id_genre'});

db.concertNext.belongsTo(db.artisteNext, {foreignKey: 'id_artiste'});
db.artisteNext.hasMany(db.concertNext, {foreignKey: 'id_artiste'});

db.concertNext.belongsTo(db.sceneNext, {foreignKey: 'id_scene'});
db.sceneNext.hasMany(db.concertNext, {foreignKey: 'id_scene'});

db.concertNext.belongsTo(db.saison, {foreignKey: 'annee'});
db.saison.hasMany(db.concertNext, {foreignKey: 'annee'});

db.sceneNext.belongsTo(db.typescene, {foreignKey: 'id_typescene'});
db.typescene.hasMany(db.sceneNext, {foreignKey: 'id_typescene'});

// -----------------------------------------------------------------------------------

db.nationalitePrevious.belongsTo(db.artistePrevious, {foreignKey: 'id_artiste'});
db.nationalitePrevious.belongsTo(db.pays, {foreignKey: 'id_pays'});
db.artistePrevious.hasMany(db.nationalitePrevious, {foreignKey: 'id_artiste'});
db.pays.hasMany(db.nationalitePrevious, {foreignKey: 'id_pays'});

db.possedePrevious.belongsTo(db.artistePrevious, {foreignKey: 'id_artiste'});
db.possedePrevious.belongsTo(db.reseauxSociaux, {foreignKey: 'id_reseaux_sociaux'});
db.artistePrevious.hasMany(db.possedePrevious, {foreignKey: 'id_artiste'});
db.reseauxSociaux.hasMany(db.possedePrevious, {foreignKey: 'id_reseaux_sociaux'});

db.artistePrevious.belongsTo(db.categorie, {foreignKey: 'id_categorie'});
db.categorie.hasMany(db.artistePrevious, {foreignKey: 'id_categorie'});

db.faitPrevious.belongsTo(db.artistePrevious, {foreignKey: 'id_artiste'});
db.faitPrevious.belongsTo(db.genre, {foreignKey: 'id_genre'});
db.artistePrevious.hasMany(db.faitPrevious, {foreignKey: 'id_artiste'});
db.genre.hasMany(db.faitPrevious, {foreignKey: 'id_genre'});

db.jouePrevious.belongsTo(db.artistePrevious, {foreignKey: 'id_artiste'});
db.jouePrevious.belongsTo(db.saison, {foreignKey: 'annee'});
db.artistePrevious.hasMany(db.jouePrevious, {foreignKey: 'id_artiste'});
db.saison.hasMany(db.jouePrevious, {foreignKey: 'annee'});