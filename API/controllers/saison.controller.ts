import {Request, Response} from "express";
import {dbCommon, dbCurrent, dbNext, dbPrevious} from "../models";

const getSaisons = async (req: Request, res: Response) => {
    try {
        const sort = req.query.sort ? req.query.sort.toLowerCase() : null;
        const incPays = req.query.incPays !== 'false';

        const options = {
            order: [],
            include: []
        }
        if (sort === 'asc') {
            options.order = [['annee', 'ASC'], ['noMois', 'ASC']];
        } else {
            options.order = [['annee', 'DESC'], ['noMois', 'DESC']];
        }
        if (incPays) {
            options.include.push({
                model: dbCommon.pays,
            });
        }
        const saisons = await dbCommon.saisons.findAll(options);

        const response = {
            error: 0,
            data: saisons
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des saisons."
        });
    }
}

const getSaisonById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const incPays = req.query.incPays !== 'false';

        const options = {
            where: {
                id
            },
            include: []
        }
        if (incPays) {
            options.include.push({
                model: dbCommon.pays,
            });
        }

        const saison = await dbCommon.saisons.findOne(options);

        const response = {
            error: 0,
            data: saison
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération de la saison."
        });
    }
}

const createSaison = async (req: Request, res: Response) => {
    try {
        const saison = await dbCommon.saisons.create(req.body);

        const response = {
            error: 0,
            data: saison
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création de la saison."
        });
    }
}

const editSaison = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const saison = await dbCommon.saisons.update(req.body, {
            where: {
                id: id
            }
        });

        const response = {
            error: 0,
            data: saison
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la mise à jour de la saison."
        });
    }
}

const deleteSaisons = async (req: Request, res: Response) => {
    try {
        const saisons = await dbCommon.saisons.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: saisons
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression des saisons."
        });
    }
}

const deleteSaisonById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const saison = await dbCommon.saisons.destroy({
            where: {
                id: id
            }
        });

        const response = {
            error: 0,
            data: saison
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression de la saison."
        });
    }
}

const migrateData = async (req: Request, res: Response) => {
    try {
        let currentSaison = await dbCommon.saisons.findAll({
            order: [['id', 'DESC']],
            limit: 2
        });


        currentSaison = currentSaison[1].dataValues;
        console.log(req.body);

        await dbCommon.saisons.create(req.body);

        const artistesCurrent = await dbCurrent.artistes.findAll(
            {
                include: [
                    { model: dbCommon.genres },
                    { model: dbCommon.pays },
                    { model: dbCommon.reseauxSociaux }
                ]
            }
        );
        for (const artiste of artistesCurrent) {
            delete artiste.dataValues.id;
            const artistePrevious = await dbPrevious.artistes.create(artiste.dataValues);
            console.log(artiste.dataValues)
            const genres = artiste.dataValues.genres.map(genre => genre.id);
            await artistePrevious.setGenres(genres);
            const pays = artiste.dataValues.pays.map(pays => pays.id);
            await artistePrevious.setPays(pays);
            const reseauxSociaux = artiste.dataValues.reseauxSociauxes;
            for (const reseauSocial of reseauxSociaux) {
                await artistePrevious.addReseauxSociaux(reseauSocial.id, { through: { lien: reseauSocial.possede.lien } });
            }
            await artistePrevious.addSaison(currentSaison.id);
        }

        await dbCurrent.artistes.destroy({
            where: {},
            restartIdentity: true
        });
        await dbCurrent.scenes.destroy({
            where: {},
            restartIdentity: true
        });
        await dbCurrent.stands.destroy({
            where: {},
            restartIdentity: true
        });
        await dbCurrent.concerts.destroy({
            where: {},
            restartIdentity: true
        });

        const artistesNext = await dbNext.artistes.findAll(
            {
                include: [
                    { model: dbCommon.genres },
                    { model: dbCommon.pays },
                    { model: dbCommon.reseauxSociaux }
                ]
            }
        );

        for (const artiste of artistesNext) {
            const artisteCurrent = await dbCurrent.artistes.create(artiste.dataValues);
            const genres = artiste.dataValues.genres.map(genre => genre.id);
            await artisteCurrent.setGenres(genres);
            const pays = artiste.dataValues.pays.map(pays => pays.id);
            await artisteCurrent.setPays(pays);
            const reseauxSociaux = artiste.dataValues.reseauxSociauxes;
            for (const reseauSocial of reseauxSociaux) {
                await artisteCurrent.addReseauxSociaux(reseauSocial.id, { through: { lien: reseauSocial.possede.lien } });
            }
        }

        const scenesNext = await dbNext.scenes.findAll();
        for (const scene of scenesNext) {
            await dbCurrent.scenes.create(scene.dataValues);
        }
        const concertsNext = await dbNext.concerts.findAll();
        for (const concert of concertsNext) {
            await dbCurrent.concerts.create(concert.dataValues);
        }
        const standsNext = await dbNext.stands.findAll();
        for (const stand of standsNext) {
            await dbCurrent.stands.create(stand.dataValues);
        }
        await dbNext.artistes.destroy({
            where: {},
            restartIdentity: true
        });
        await dbNext.scenes.destroy({
            where: {},
            restartIdentity: true
        });
        await dbNext.stands.destroy({
            where: {},
            restartIdentity: true
        });
        await dbNext.concerts.destroy({
            where: {},
            restartIdentity: true
        });

        const response = {
            error: 0,
            data: "Migration effectuée avec succès."
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la migration des données."
        });
    }
}

export default {
    getSaisons,
    getSaisonById,
    createSaison,
    editSaison,
    deleteSaisons,
    deleteSaisonById,
    migrateData
}