import {Request, Result} from "express"
import {dbCommon} from "../models";
import {getDbSaions} from "../services/saison.service";
import {Op} from "sequelize";

const getScenes = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const libelle = req.query.libelle;
        const incTs = req.query.incTs !== 'false';

        const db = getDbSaions(saison);

        const conditions = {};
        if (libelle) {
            conditions['libelle'] = {
                [Op.like]: `%${libelle}%`
            }
        }

        const options = {
            where: conditions,
            include: []
        }

        if (incTs) {
            options.include.push({
                model: dbCommon.typeScenes
            });
        }

        const scenes = await db.scenes.findAll(options);

        const result = {
            error: 0,
            data: scenes
        }

        res.status(200).json(result);
    }
    catch (e) {
        const result = {
            error: 1,
            message: "Une erreur est survenue lors de la récupération des scènes."
        }
        res.status(500).json(result);
    }
}

const getSceneById = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const id = req.params.id;
        const incTs = req.query.incTs !== 'false';

        const db = getDbSaions(saison);

        const options = {
            where: {
                id
            },
            include: []
        }

        if (incTs) {
            options.include.push({
                model: dbCommon.typeScenes
            });
        }

        const scene = await db.scenes.findOne(options);

        const result = {
            error: 0,
            data: scene
        }

        res.status(200).json(result);
    }
    catch (e) {
        const result = {
            error: 1,
            message: "Une erreur est survenue lors de la récupération de la scène."
        }
        res.status(500).json(result);
    }
}

const createScene = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        const scene = await db.scenes.create(req.body);

        const result = {
            error: 0,
            data: scene
        }

        res.status(200).json(result);
    }
    catch (e) {
        const result = {
            error: 1,
            message: "Une erreur est survenue lors de la création de la scène."
        }
        res.status(500).json(result);
    }
}

const editScene = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const id = req.params.id;

        const db = getDbSaions(saison);

        const scene = await db.scenes.update(req.body, {
            where: {
                id: id
            }
        });

        const result = {
            error: 0,
            data: scene
        }

        res.status(200).json(result);
    }
    catch (e) {
        const result = {
            error: 1,
            message: "Une erreur est survenue lors de la mise à jour de la scène."
        }
        res.status(500).json(result);
    }
}

const deleteScenes = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        const scenes = await db.scenes.destroy({
            where: {}
        });

        const result = {
            error: 0,
            data: scenes
        }

        res.status(200).json(result);
    }
    catch (e) {
        const result = {
            error: 1,
            message: "Une erreur est survenue lors de la suppression des scènes."
        }
        res.status(500).json(result);
    }
}

const deleteSceneById = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const id = req.params.id;

        const db = getDbSaions(saison);

        const scene = await db.scenes.destroy({
            where: {
                id: id
            }
        });

        const result = {
            error: 0,
            data: scene
        }

        res.status(200).json(result);
    }
    catch (e) {
        const result = {
            error: 1,
            message: "Une erreur est survenue lors de la suppression de la scène."
        }
        res.status(500).json(result);
    }
}

export default {
    getScenes,
    getSceneById,
    createScene,
    editScene,
    deleteScenes,
    deleteSceneById
}