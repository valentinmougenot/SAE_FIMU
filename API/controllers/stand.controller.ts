import {Request, Result} from "express"
import {dbCommon} from "../models";
import {getDbSaions} from "../services/saison.service";
import {Op} from "sequelize";

const getStands = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const libelle = req.query.libelle;
        const incTs = req.query.incTs !== 'false';
        const incServ = req.query.incServ !== 'false';

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
                model: dbCommon.typeStands
            });
        }
        if (incServ) {
            options.include.push({
                model: dbCommon.services,
                through: {
                    attributes: []
                }
            });
        }

        const scenes = await db.stands.findAll(options);

        const result = {
            error: 0,
            data: scenes
        }

        res.status(200).json(result);
    }
    catch (e) {
        const result = {
            error: 1,
            message: "Une erreur est survenue lors de la récupération des stands."
        }
        res.status(500).json(result);
    }
}

const getStandById = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const id = req.params.id;
        const incTs = req.query.incTs !== 'false';
        const incServ = req.query.incServ !== 'false';

        const db = getDbSaions(saison);

        const options = {
            where: {
                id
            },
            include: []
        }

        if (incTs) {
            options.include.push({
                model: dbCommon.typeStands
            });
        }
        if (incServ) {
            options.include.push({
                model: dbCommon.services,
                through: {
                    attributes: []
                }
            });
        }

        const stand = await db.stands.findOne(options);

        const result = {
            error: 0,
            data: stand
        }

        res.status(200).json(result);
    }
    catch (e) {
        const result = {
            error: 1,
            message: "Une erreur est survenue lors de la récupération du stand."
        }
        res.status(500).json(result);
    }
}

const createStand = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        const stand = await db.stands.create(req.body);

        await stand.setServices(req.body.services);

        const result = {
            error: 0,
            data: stand
        }

        res.status(200).json(result);
    }
    catch (e) {
        const result = {
            error: 1,
            message: "Une erreur est survenue lors de la création du stand."
        }
        res.status(500).json(result);
    }
}

const editStand = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        const id = req.params.id;

        const stand = await db.stands.update(req.body, {
            where: {
                id: id
            }
        });

        await stand.setServices(req.body.services);

        const result = {
            error: 0,
            data: stand
        }

        res.status(200).json(result);
    }
    catch (e) {
        const result = {
            error: 1,
            message: "Une erreur est survenue lors de la modification du stand."
        }
        res.status(500).json(result);
    }
}

const deleteStands = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        const stands = db.stands.destroy({
            where: {}
        });

        const result = {
            error: 0,
            data: stands
        }

        res.status(200).json(result);
    }
    catch (e) {
        const result = {
            error: 1,
            message: "Une erreur est survenue lors de la suppression des stands."
        }
        res.status(500).json(result);
    }
}

const deleteStandById = async (req: Request, res: Result) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        const id = req.params.id;

        const stand = db.stands.destroy({
            where: {
                id
            }
        });

        const result = {
            error: 0,
            data: stand
        }

        res.status(200).json(result);
    }
    catch (e) {
        const result = {
            error: 1,
            message: "Une erreur est survenue lors de la suppression du stand."
        }
        res.status(500).json(result);
    }
}

export default {
    getStands,
    getStandById,
    createStand,
    editStand,
    deleteStands,
    deleteStandById
}