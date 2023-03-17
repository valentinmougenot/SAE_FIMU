import {Request, Result} from "express"
import {dbCommon} from "../models";
import {getDbSaions} from "../services/saison.service";
import {Op} from "sequelize";

const getArtistes = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const nom = req.query.nom;
        const incCategorie = req.query.incCat !== 'false';
        const incGenre = req.query.incGenre !== 'false';
        const incPays = req.query.incPays !== 'false';
        const incRs = req.query.incRs !== 'false';
        const incSaison = req.query.incSaison !== 'false';
        const incConcert = req.query.incConcert !== 'false';
        const incScene = req.query.incScene !== 'false';
        const saisonId = req.query.saisonId;

        const db = getDbSaions(saison);

        const conditions = {};
        if (nom) {
            conditions['nom'] = {
                [Op.like]: `%${nom}%`
            }
        }

        const options = {
            where: conditions,
            include: []
        }
        if (incCategorie) {
            options.include.push({
                model: dbCommon.categories,
            });
        }
        if (incGenre) {
            options.include.push({
                model: dbCommon.genres,
                through: {
                    attributes: []
                }
            });
        }
        if (incPays) {
            options.include.push({
                model: dbCommon.pays,
                through: {
                    attributes: []
                }
            });
        }
        if (incRs) {
            options.include.push({
                model: dbCommon.reseauxSociaux,
                through: {
                    attributes: ['lien']
                }
            });
        }
        if (saison === 'previous' && incSaison) {
            let conditions = {};
            if (saisonId) {
                conditions = {
                    id: saisonId
                }
            }
            options.include.push({
                model: dbCommon.saisons,
                where: conditions,
                through: {
                    attributes: []
                }
            });
        }
        if (incConcert && saison !== 'previous') {
            let include = {
                model: db.concerts,
                include: [],
                order: [
                    ['date_debut', 'ASC'],
                    ['heure_debut', 'ASC']
                ]
            }
            if (incScene) {
                include.include.push({
                    model: db.scenes,
                    include: [{
                        model: dbCommon.typeScenes
                    }]
                });
            }
            options.include.push(include);
        }

        const artistes = await db.artistes.findAll(options);

        const response = {
            error: 0,
            data: artistes
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            error: 1,
            message: 'Une erreur est survenue lors de la récupération des artistes.'
        });
    }
}

const getArtisteById = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const id = req.params.id;
        const incCategorie = req.query.incCat !== 'false';
        const incGenre = req.query.incGenre !== 'false';
        const incPays = req.query.incPays !== 'false';
        const incRs = req.query.incRs !== 'false';
        const incSaison = req.query.incSaison !== 'false';
        const incConcert = req.query.incConcert !== 'false';
        const incScene = req.query.incScene !== 'false';

        const db = getDbSaions(saison);

        const options = {
            where: {
                id
            },
            include: []
        }
        if (incCategorie) {
            options.include.push({
                model: dbCommon.categories,
            });
        }
        if (incGenre) {
            options.include.push({
                model: dbCommon.genres,
                through: {
                    attributes: []
                }
            });
        }
        if (incPays) {
            options.include.push({
                model: dbCommon.pays,
                through: {
                    attributes: []
                }
            });
        }
        if (incRs) {
            options.include.push({
                model: dbCommon.reseauxSociaux,
                through: {
                    attributes: ['lien']
                }
            });
        }
        if (saison === 'previous' && incSaison) {
            options.include.push({
                model: dbCommon.saisons,
                through: {
                    attributes: []
                }
            });
        }
        if (incConcert && saison !== 'previous') {
            let include = {
                model: db.concerts,
                include: [],
                order: [
                    ['date_debut', 'ASC'],
                    ['heure_debut', 'ASC']
                ]
            }
            if (incScene) {
                include.include.push({
                    model: db.scenes,
                    include: [{
                        model: dbCommon.typeScenes
                    }]
                });
            }
            options.include.push(include);
        }

        const artiste = await db.artistes.findOne(options);

        const response = {
            error: 0,
            data: artiste
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            error: 1,
            message: "Une erreur est survenue lors de la récupération de l'artiste."
        });
    }
}

const createArtiste = async (req: Request, res: Result) => {
    let t;
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        t = await db.sequelize.transaction();

        const artiste = await db.artistes.create(req.body, { transaction: t });

        if (req.body.genres) {
            await artiste.setGenres(req.body.genres, { transaction: t });
        }
        if (req.body.pays) {
            await artiste.setPays(req.body.pays, { transaction: t });
        }
        if (req.body.rs) {
            for (const rs of req.body.rs) {
                await artiste.addReseauxSociaux(rs.id, { through: { lien: rs.lien }, transaction: t });
            }
        }
        if (req.body.saisons && saison === 'previous') {
            await artiste.setSaisons(req.body.saisons, { transaction: t });
        }

        const response = {
            error: 0,
            data: artiste
        }

        await t.commit();

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        await t.rollback();
        res.status(500).send({
            error: 1,
            message: "Une erreur est survenue lors de la création de l'artiste."
        });
    }
}

const editArtiste = async (req: Request, res: Result) => {
    let t;
    try {
        console.log(req.body)
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        const id = req.params.id;

        t = await db.sequelize.transaction();

        const artiste = await db.artistes.findOne({
            where: {
                id
            }
        });

        if (!artiste) {
            res.status(404).send({
                error: 1,
                message: "L'artiste n'existe pas."
            });
            return;
        }

        await artiste.update(req.body, { transaction: t });

        if (req.body.genres) {
            await artiste.setGenres(req.body.genres, { transaction: t });
        }
        if (req.body.pays) {
            await artiste.setPays(req.body.pays, { transaction: t });
        }
        if (req.body.rs) {
            await artiste.setReseauxSociauxes([], { transaction: t });
            for (const rs of req.body.rs) {
                await artiste.addReseauxSociaux(rs.id, { through: { lien: rs.lien }, transaction: t });
            }
        }
        if (req.body.saisons && saison === 'previous') {
            await artiste.setSaisons(req.body.saisons, { transaction: t });
        }

        const response = {
            error: 0,
            data: artiste
        }

        console.log(response)

        await t.commit();

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        await t.rollback();
        res.status(500).send({
            error: 1,
            message: "Une erreur est survenue lors de la modification de l'artiste."
        });
    }
}

const deleteArtistes = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        const artistes = await db.artistes.destroy({
            where: {},
            truncate: false
        });

        const response = {
            error: 0,
            data: artistes
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            error: 1,
            message: "Une erreur est survenue lors de la suppression de l'artiste."
        });
    }
}

const deleteArtisteById = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        const id = req.params.id;

        const artiste = await db.artistes.findOne({
            where: {
                id
            }
        });

        if (!artiste) {
            res.status(404).send({
                error: 1,
                message: "L'artiste n'existe pas."
            });
            return;
        }

        await artiste.destroy();

        const response = {
            error: 0,
            data: artiste
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            error: 1,
            message: "Une erreur est survenue lors de la suppression de l'artiste."
        });
    }
}

export default {
    getArtistes,
    getArtisteById,
    createArtiste,
    editArtiste,
    deleteArtistes,
    deleteArtisteById
}
