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


db.nationalite.belongsTo(db.artiste, {foreignKey: 'id_artiste'});
db.nationalite.belongsTo(db.pays, {foreignKey: 'id_pays'});
db.artiste.hasMany(db.nationalite, {foreignKey: 'id_artiste'});
db.pays.hasMany(db.nationalite, {foreignKey: 'id_pays'});

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
