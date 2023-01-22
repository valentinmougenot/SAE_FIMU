import Sequelize from 'sequelize';
import {dbConfig} from '../db/db.config.js';
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
import { typeactu } from './typeactu.model.js';
import { actualite } from './actualite.model.js';
import { typestand } from './typestand.model.js';
import { stand } from './stand.model.js';
import { standNext } from './standNext.model.js';
import { service } from './service.model.js';
import { propose } from './propose.model.js';
import { proposeNext } from './proposeNext.model.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    logging: false,
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
db.typeactu = typeactu(sequelize, Sequelize);
db.actualite = actualite(sequelize, Sequelize);
db.typestand = typestand(sequelize, Sequelize);
db.stand = stand(sequelize, Sequelize);
db.standNext = standNext(sequelize, Sequelize);
db.service = service(sequelize, Sequelize);
db.propose = propose(sequelize, Sequelize);
db.proposeNext = proposeNext(sequelize, Sequelize);


db.artiste.belongsToMany(db.pays, { through: db.nationalite, foreignKey: 'id_artiste'});
db.pays.belongsToMany(db.artiste, { through: db.nationalite, foreignKey: 'id_pays'});

db.artiste.belongsToMany(db.reseauxSociaux, { through: db.possede, foreignKey: 'id_artiste'});
db.reseauxSociaux.belongsToMany(db.artiste, { through: db.possede, foreignKey: 'id_reseaux_sociaux'});

db.artiste.belongsTo(db.categorie, {foreignKey: 'id_categorie'});
db.categorie.hasMany(db.artiste, {foreignKey: 'id_categorie'});

db.artiste.belongsToMany(db.genre, { through: db.fait, foreignKey: 'id_artiste'});
db.genre.belongsToMany(db.artiste, { through: db.fait, foreignKey: 'id_genre'});

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

db.actualite.belongsTo(db.typeactu, {foreignKey: 'id_typeactu'});
db.typeactu.hasMany(db.actualite, {foreignKey: 'id_typeactu'});

db.stand.belongsTo(db.typestand, {foreignKey: 'id_typestand'});
db.typestand.hasMany(db.stand, {foreignKey: 'id_typestand'});

db.stand.belongsToMany(db.service, { through: db.propose, foreignKey: 'id_stand'});
db.service.belongsToMany(db.stand, { through: db.propose, foreignKey: 'id_service'});

// -----------------------------------------------------------------------------

db.artisteNext.belongsToMany(db.pays, { through: db.nationaliteNext, foreignKey: 'id_artiste'});
db.pays.belongsToMany(db.artisteNext, { through: db.nationaliteNext, foreignKey: 'id_pays'});

db.artisteNext.belongsToMany(db.reseauxSociaux, { through: db.possedeNext, foreignKey: 'id_artiste'});
db.reseauxSociaux.belongsToMany(db.artisteNext, { through: db.possedeNext, foreignKey: 'id_reseaux_sociaux'});

db.artisteNext.belongsTo(db.categorie, {foreignKey: 'id_categorie'});
db.categorie.hasMany(db.artisteNext, {foreignKey: 'id_categorie'});

db.artisteNext.belongsToMany(db.genre, { through: db.faitNext, foreignKey: 'id_artiste'});
db.genre.belongsToMany(db.artisteNext, { through: db.faitNext, foreignKey: 'id_genre'});

db.concertNext.belongsTo(db.artisteNext, {foreignKey: 'id_artiste'});
db.artisteNext.hasMany(db.concertNext, {foreignKey: 'id_artiste'});

db.concertNext.belongsTo(db.sceneNext, {foreignKey: 'id_scene'});
db.sceneNext.hasMany(db.concertNext, {foreignKey: 'id_scene'});

db.concertNext.belongsTo(db.saison, {foreignKey: 'annee'});
db.saison.hasMany(db.concertNext, {foreignKey: 'annee'});

db.sceneNext.belongsTo(db.typescene, {foreignKey: 'id_typescene'});
db.typescene.hasMany(db.sceneNext, {foreignKey: 'id_typescene'});

db.standNext.belongsTo(db.typestand, {foreignKey: 'id_typestand'});
db.typestand.hasMany(db.standNext, {foreignKey: 'id_typestand'});

db.standNext.belongsToMany(db.service, { through: db.proposeNext, foreignKey: 'id_stand'});
db.service.belongsToMany(db.standNext, { through: db.proposeNext, foreignKey: 'id_service'});

// -----------------------------------------------------------------------------------

db.artistePrevious.belongsToMany(db.reseauxSociaux, {through: db.possedePrevious, foreignKey: 'id_artiste'});
db.reseauxSociaux.belongsToMany(db.artistePrevious, {through: db.possedePrevious, foreignKey: 'id_reseaux_sociaux'});

db.artistePrevious.belongsTo(db.categorie, {foreignKey: 'id_categorie'});
db.categorie.hasMany(db.artistePrevious, {foreignKey: 'id_categorie'});

db.artistePrevious.belongsToMany(db.genre, {through: db.faitPrevious, foreignKey: 'id_artiste'});
db.genre.belongsToMany(db.artistePrevious, {through: db.faitPrevious, foreignKey: 'id_genre'})

db.artistePrevious.belongsToMany(db.saison, {through: db.jouePrevious, foreignKey: 'id_artiste'});
db.saison.belongsToMany(db.artistePrevious, {through: db.jouePrevious, foreignKey: 'annee'});

db.artistePrevious.belongsToMany(db.pays, {through: db.nationalitePrevious, foreignKey: 'id_artiste'});
db.pays.belongsToMany(db.artistePrevious, {through: db.nationalitePrevious, foreignKey: 'id_pays'});