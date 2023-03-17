import {Request, Result} from "express";
import {dbCommon} from "../models";

const getActualites = async (req: Request, res: Result) => {
    try {
        const incTa = req.query.incTa !== 'false';

        const options = {
            include: []
        }
        if (incTa) {
            options.include.push({
                model: dbCommon.typeActus,
            });
        }

        const actualites = await dbCommon.actualites.findAll(options);

        const response = {
            error: 0,
            data: actualites
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des actualités."
        });
    }
}

const getActualiteById = async (req: Request, res: Result) => {
    try {
        const id = req.params.id;
        const incTa = req.query.incTa !== 'false';

        const options = {
            where: {
                id
            },
            include: []
        }
        if (incTa) {
            options.include.push({
                model: dbCommon.typeActus,
            });
        }

        const actualite = await dbCommon.actualites.findOne(options);

        const response = {
            error: 0,
            data: actualite
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération de l'actualité."
        });
    }
}

const createActualite = async (req: Request, res: Result) => {
    try {
        const actualite = await dbCommon.actualites.create(req.body);

        const response = {
            error: 0,
            data: actualite
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création de l'actualité."
        });
    }
}

const editActualite = async (req: Request, res: Result) => {
    try {
        const id = req.params.id;
        const actualite = await dbCommon.actualites.update(req.body, {
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: actualite
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la modification de l'actualité."
        });
    }
}

const deleteActualites = async (req: Request, res: Result) => {
    try {
        const actualites = await dbCommon.actualites.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: actualites
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression des actualités."
        });
    }
}

const deleteActualiteById = async (req: Request, res: Result) => {
    try {
        const id = req.params.id;
        const actualite = await dbCommon.actualites.destroy({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: actualite
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression de l'actualité."
        });
    }
}

export default {
    getActualites,
    getActualiteById,
    createActualite,
    editActualite,
    deleteActualites,
    deleteActualiteById
}