import dbConfig from "../config/db.config";
import {DataTypes, Dialect, Sequelize} from "sequelize";

import Actualite from "./actualite.model";
import Artiste from "./artiste.model";
import Categorie from "./categorie.model";
import Concert from "./concert.model";
import Genre from "./genre.model";
import Notification from "./notification.model";
import Pays from "./pays.model";
import RefreshToken from "./refreshToken.model";
import ReseauxSociaux from "./reseauxSociaux.model";
import Role from "./role.model";
import Saison from "./saison.model";
import Scene from "./scene.model";
import Service from "./service.model";
import Stand from "./stand.model";
import TypeActu from "./typeactu.model";
import TypeScene from "./typescene.model";
import TypeStand from "./typestand.model";
import Utilisateur from "./utilisateur.model";

import actualiteData from "../data/actualite.data.json";
import artisteData from "../data/artiste.data.json";
import categorieData from "../data/categorie.data.json";
import concertData from "../data/concert.data.json";
import paysData from "../data/pays.data.json";
import genreData from "../data/genre.data.json";
import notificationData from "../data/notification.data.json";
import reseauxSociauxData from "../data/reseauxSociaux.data.json";
import roleData from "../data/role.data.json";
import saisonData from "../data/saison.data.json";
import sceneData from "../data/scene.data.json";
import serviceData from "../data/service.data.json";
import standData from "../data/stand.data.json";
import typeactuData from "../data/typeactu.data.json";
import typesceneData from "../data/typescene.data.json";
import typestandData from "../data/typestand.data.json";
import utilisateurData from "../data/utilisateur.data.json";

async function createSchemaIfNotExist(sequelize: Sequelize, schema: string) {
    return sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
}

async function createCommonSchema() {
    const sequelizeCommon = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect as Dialect,
        schema: "common",
        define: {
            timestamps: false
        },
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });

    await createSchemaIfNotExist(sequelizeCommon, "common");

    const dbCommon = {
        sequelize: sequelizeCommon,
        actualites: Actualite(sequelizeCommon, "common"),
        categories: Categorie(sequelizeCommon, "common"),
        genres: Genre(sequelizeCommon, "common"),
        notifications: Notification(sequelizeCommon, "common"),
        pays: Pays(sequelizeCommon, "common"),
        refreshTokens: RefreshToken(sequelizeCommon, "common"),
        reseauxSociaux: ReseauxSociaux(sequelizeCommon, "common"),
        roles: Role(sequelizeCommon, "common"),
        saisons: Saison(sequelizeCommon, "common"),
        services: Service(sequelizeCommon, "common"),
        typeActus: TypeActu(sequelizeCommon, "common"),
        typeScenes: TypeScene(sequelizeCommon, "common"),
        typeStands: TypeStand(sequelizeCommon, "common"),
        utilisateurs: Utilisateur(sequelizeCommon, "common")
    };

    await Promise.all(Object.values(dbCommon))
        .then(() => {
            console.log('Tous les modèles ont été initialisés avec succès !');
        })
        .catch((err) => {
            console.error('Erreur lors de l\'initialisation des modèles :', err);
        });
    
    dbCommon.saisons.belongsTo(dbCommon.pays, {foreignKey: "paysId"});
    dbCommon.pays.hasMany(dbCommon.saisons, {foreignKey: "paysId"});

    dbCommon.actualites.belongsTo(dbCommon.typeActus, {foreignKey: "typeactuId"});
    dbCommon.typeActus.hasMany(dbCommon.actualites, {foreignKey: "typeactuId"});

    dbCommon.utilisateurs.belongsTo(dbCommon.roles, {foreignKey: "roleId"});
    dbCommon.roles.hasMany(dbCommon.utilisateurs, {foreignKey: "roleId"});

    dbCommon.refreshTokens.belongsTo(dbCommon.utilisateurs, {foreignKey: "utilisateurId"});
    dbCommon.utilisateurs.hasMany(dbCommon.refreshTokens, {foreignKey: "utilisateurId"});

    return dbCommon;
}

async function createPreviousSchema() {
    const sequelizePrevious = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect as Dialect,
        schema: "previous",
        define: {
            timestamps: false
        },
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });

    await createSchemaIfNotExist(sequelizePrevious, "previous");

    const dbPrevious = {
        sequelize: sequelizePrevious,
        artistes: Artiste(sequelizePrevious, "previous"),
    }

    await Promise.all(Object.values(dbPrevious))
        .then(() => {
            console.log('Tous les modèles ont été initialisés avec succès !');
        })
        .catch((err) => {
            console.error('Erreur lors de l\'initialisation des modèles :', err);
        });

    const possede = sequelizePrevious.define("possede", {lien: DataTypes.STRING}, {schema: "previous", timestamps: false, freezeTableName: true});
    dbPrevious.artistes.belongsToMany(dbCommon.reseauxSociaux, {through: possede, foreignKey: "artisteId"});
    dbCommon.reseauxSociaux.belongsToMany(dbPrevious.artistes, {through: possede, foreignKey: "reseauxSociauxId"});

    const nationalite = sequelizePrevious.define("nationalite", {}, {schema: "previous", timestamps: false});
    dbPrevious.artistes.belongsToMany(dbCommon.pays, {through: nationalite, foreignKey: "artisteId"});
    dbCommon.pays.belongsToMany(dbPrevious.artistes, {through: nationalite, foreignKey: "paysId"});

    const fait = sequelizePrevious.define("fait", {}, {schema: "previous", timestamps: false});
    dbPrevious.artistes.belongsToMany(dbCommon.genres, {through: fait, foreignKey: "artisteId"});
    dbCommon.genres.belongsToMany(dbPrevious.artistes, {through: fait, foreignKey: "genreId"});

    dbPrevious.artistes.belongsTo(dbCommon.categories, {foreignKey: "categorieId"});
    dbCommon.categories.hasMany(dbPrevious.artistes, {foreignKey: "categorieId"});

    const joue = sequelizePrevious.define("joue", {}, {schema: "previous", timestamps: false});
    dbPrevious.artistes.belongsToMany(dbCommon.saisons, {through: joue, foreignKey: "artisteId"});
    dbCommon.saisons.belongsToMany(dbPrevious.artistes, {through: joue, foreignKey: "concertId"});

    return dbPrevious;
}

async function syncModelsSchema(schema: string) {
    const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect as Dialect,
        schema: schema,
        define: {
            timestamps: false
        },
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });

    await createSchemaIfNotExist(sequelize, schema);

    const db = {
        sequelize: sequelize,
        artistes: Artiste(sequelize, schema),
        concerts: Concert(sequelize, schema),
        scenes: Scene(sequelize, schema),
        stands: Stand(sequelize, schema)
    };

    await Promise.all(Object.values(db))
        .then(() => {
            console.log('Tous les modèles ont été initialisés avec succès !');
        })
        .catch((err) => {
            console.error('Erreur lors de l\'initialisation des modèles :', err);
        });
    return db;
}

async function addConstraintsToSchema(db: any, schema: string) {
    const possede = db.sequelize.define("possede", {lien: DataTypes.STRING}, {schema: schema, timestamps: false, freezeTableName: true});
    db.artistes.belongsToMany(dbCommon.reseauxSociaux, {through: possede, foreignKey: "artisteId"});
    dbCommon.reseauxSociaux.belongsToMany(db.artistes, {through: possede, foreignKey: "reseauxSociauxId"});

    const nationalite = db.sequelize.define("nationalite", {}, {schema: schema, timestamps: false, freezeTableName: true});
    db.artistes.belongsToMany(dbCommon.pays, {through: nationalite, foreignKey: "artisteId"});
    dbCommon.pays.belongsToMany(db.artistes, {through: nationalite, foreignKey: "paysId"});

    const fait = db.sequelize.define("fait", {}, {schema: schema, timestamps: false, freezeTableName: true});
    db.artistes.belongsToMany(dbCommon.genres, {through: fait, foreignKey: "artisteId"});
    dbCommon.genres.belongsToMany(db.artistes, {through: fait, foreignKey: "genreId"});

    db.artistes.belongsTo(dbCommon.categories, {foreignKey: "categorieId"});
    dbCommon.categories.hasMany(db.artistes, {foreignKey: "categorieId"});

    db.concerts.belongsTo(db.artistes, {foreignKey: "artisteId"});
    db.artistes.hasMany(db.concerts, {foreignKey: "artisteId"});

    db.concerts.belongsTo(db.scenes, {foreignKey: "sceneId"});
    db.scenes.hasMany(db.concerts, {foreignKey: "sceneId"});

    db.scenes.belongsTo(dbCommon.typeScenes, {foreignKey: "typesceneId"});
    dbCommon.typeScenes.hasMany(db.scenes, {foreignKey: "typesceneId"});

    db.stands.belongsTo(dbCommon.typeStands, {foreignKey: "typestandId"});
    dbCommon.typeStands.hasMany(db.stands, {foreignKey: "typestandId"});

    const propose = db.sequelize.define("propose", {}, {schema: schema, timestamps: false, freezeTableName: true});
    db.stands.belongsToMany(dbCommon.services, {through: propose, foreignKey: "standId"});
    dbCommon.services.belongsToMany(db.stands, {through: propose, foreignKey: "serviceId"});

    return db;
}

async function insertData() {
    await dbCommon.categories.bulkCreate(categorieData);
    await dbCommon.genres.bulkCreate(genreData);
    await dbCommon.pays.bulkCreate(paysData);
    await dbCommon.reseauxSociaux.bulkCreate(reseauxSociauxData);
    await dbCommon.typeScenes.bulkCreate(typesceneData);
    await dbCommon.typeActus.bulkCreate(typeactuData);
    await dbCommon.actualites.bulkCreate(actualiteData);
    await dbCommon.services.bulkCreate(serviceData);
    await dbCommon.typeStands.bulkCreate(typestandData);
    await dbCommon.roles.bulkCreate(roleData);
    await dbCommon.utilisateurs.bulkCreate(utilisateurData);
    await dbCommon.saisons.bulkCreate(saisonData);
    await dbCommon.notifications.bulkCreate(notificationData);

    await dbCurrent.artistes.bulkCreate(artisteData.current);
    await dbNext.artistes.bulkCreate(artisteData.next);
    await dbPrevious.artistes.bulkCreate(artisteData.previous);
    await dbCurrent.scenes.bulkCreate(sceneData.current);
    await dbNext.scenes.bulkCreate(sceneData.next);
    await dbCurrent.concerts.bulkCreate(concertData.current);
    await dbNext.concerts.bulkCreate(concertData.next);
    await dbCurrent.stands.bulkCreate(standData.current);
    await dbNext.stands.bulkCreate(standData.next);

    const artistesCurrent = await dbCurrent.artistes.findAll();
    const genres = await dbCommon.genres.findAll();
    const pays = await dbCommon.pays.findAll();
    const reseauxSociaux = await dbCommon.reseauxSociaux.findAll();
    const services = await dbCommon.services.findAll();
    const saisons = await dbCommon.saisons.findAll();
    let genreIdx = 0;
    let paysIdx = 0;
    let rsIdx = 0;
    let serviceIdx = 0;
    let saisonIdx = 0;
    for (const artiste of artistesCurrent) {
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
            artiste.addGenre(genres[genreIdx]);
            genreIdx++;
            if (genreIdx >= genres.length) {
                genreIdx = 0;
            }
        }
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
            artiste.addPays(pays[paysIdx]);
            paysIdx++;
            if (paysIdx >= pays.length) {
                paysIdx = 0;
            }
        }
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
            artiste.addReseauxSociaux(reseauxSociaux[rsIdx], {through: {lien: "https://www." + reseauxSociaux[rsIdx].libelle.toLowerCase() + ".com/" + artiste.id}});
            rsIdx++;
            if (rsIdx >= reseauxSociaux.length) {
                rsIdx = 0;
            }
        }
    }

    const artistesNext = await dbNext.artistes.findAll();
    for (const artiste of artistesNext) {
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
            artiste.addGenre(genres[genreIdx]);
            genreIdx++;
            if (genreIdx >= genres.length) {
                genreIdx = 0;
            }
        }
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
            artiste.addPays(pays[paysIdx]);
            paysIdx++;
            if (paysIdx >= pays.length) {
                paysIdx = 0;
            }
        }
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
            artiste.addReseauxSociaux(reseauxSociaux[rsIdx], {through: {lien: "https://www." + reseauxSociaux[rsIdx].libelle + ".com/" + artiste.id}});
            rsIdx++;
            if (rsIdx >= reseauxSociaux.length) {
                rsIdx = 0;
            }
        }
    }

    const artistesPrevious = await dbPrevious.artistes.findAll();
    for (const artiste of artistesPrevious) {
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
            artiste.addGenre(genres[genreIdx]);
            genreIdx++;
            if (genreIdx >= genres.length) {
                genreIdx = 0;
            }
        }
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
            artiste.addPays(pays[paysIdx]);
            paysIdx++;
            if (paysIdx >= pays.length) {
                paysIdx = 0;
            }
        }
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
            artiste.addReseauxSociaux(reseauxSociaux[rsIdx], {through: {lien: "https://www." + reseauxSociaux[rsIdx].libelle + ".com/" + artiste.id}});
            rsIdx++;
            if (rsIdx >= reseauxSociaux.length) {
                rsIdx = 0;
            }
        }
        for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
            artiste.addSaison(saisons[i]);
            saisonIdx++;
            if (saisonIdx >= saisons.length - 2) {
                saisonIdx = 0;
            }
        }
    }

    const standsCurrent = await dbCurrent.stands.findAll();
    for(const stand of standsCurrent) {
        for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
            stand.addService(services[serviceIdx]);
            serviceIdx++;
            if (serviceIdx >= services.length) {
                serviceIdx = 0;
            }
        }
    }

    const standsNext = await dbNext.stands.findAll();
    for(const stand of standsNext) {
        for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
            stand.addService(services[serviceIdx]);
            serviceIdx++;
            if (serviceIdx >= services.length) {
                serviceIdx = 0;
            }
        }
    }
}

let dbCommon, dbCurrent, dbNext, dbPrevious;

createCommonSchema()
    .then(async result => {
        dbCommon = result;
        dbCurrent = await syncModelsSchema("current");
        dbNext = await syncModelsSchema("next");
        dbPrevious = await createPreviousSchema();

        await dbCommon.sequelize.sync({logging: false});
        await dbPrevious.sequelize.sync({logging: false});

        dbCurrent = await addConstraintsToSchema(dbCurrent, "current");
        dbNext = await addConstraintsToSchema(dbNext, "next");
        await dbCurrent.sequelize.sync({logging: false});
        await dbNext.sequelize.sync({logging: false});
        console.log("Done !");
    })
    .then(async () => {
        //await insertData();
    });

export {dbCommon, dbCurrent, dbNext, dbPrevious};
