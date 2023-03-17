import {Request, Response} from "express";
import {dbCommon} from "../models";

const getTypeActus = async (req: Request, res: Response) => {
    try {
        const typeActus = await dbCommon.typeActus.findAll();

        const response = {
            error: 0,
            data: typeActus
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des types d'actualités."
        });
    }
}

const getTypeActuById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const typeActu = await dbCommon.typeActus.findOne({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: typeActu
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération du type d'actualité."
        });
    }
}

const createTypeActu = async (req: Request, res: Response) => {
    try {
        const typeActu = await dbCommon.typeActus.create(req.body);

        const response = {
            error: 0,
            data: typeActu
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création du type d'actualité."
        });
    }
}

const editTypeActu = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const typeActu = await dbCommon.typeActus.update(req.body, {
            where: {
                id: id
            }
        });

        const response = {
            error: 0,
            data: typeActu
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la modification du type d'actualité."
        });
    }
}

const deleteTypeActus = async (req: Request, res: Response) => {
    try {
        const typeActus = await dbCommon.typeActus.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: typeActus
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression des types d'actualités."
        });
    }
}

const deleteTypeActuById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const typeActu = await dbCommon.typeActus.destroy({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: typeActu
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du type d'actualité."
        });
    }
}

export default {
    getTypeActus,
    getTypeActuById,
    createTypeActu,
    editTypeActu,
    deleteTypeActus,
    deleteTypeActuById
}