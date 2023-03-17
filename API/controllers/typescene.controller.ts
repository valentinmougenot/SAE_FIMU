import {Request, Response} from "express";
import {dbCommon} from "../models";

const getTypeScenes = async (req: Request, res: Response) => {
    try {
        const typesScenes = await dbCommon.typeScenes.findAll();

        const response = {
            error: 0,
            data: typesScenes
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des types de scène."
        });
    }
}

const getTypeSceneById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const typeScene = await dbCommon.typeScenes.findOne({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: typeScene
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération du type de scène."
        });
    }
}

const createTypeScene = async (req: Request, res: Response) => {
    try {
        const typeScene = await dbCommon.typeScenes.create(req.body);

        const response = {
            error: 0,
            data: typeScene
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création du type de scène."
        });
    }
}

const editTypeScene = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const typeScene = await dbCommon.typeScenes.update(req.body, {
            where: {
                id: id
            }
        });

        const response = {
            error: 0,
            data: typeScene
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la modification du type de scène."
        });
    }
}

const deleteTypeScenes = async (req: Request, res: Response) => {
    try {
        const typeScenes = await dbCommon.typeScenes.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: typeScenes
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du type de scène."
        });
    }
}

const deleteTypeSceneById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const typeScene = await dbCommon.typeScenes.destroy({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: typeScene
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du type de scène."
        });
    }
}

export default {
    getTypeScenes,
    getTypeSceneById,
    createTypeScene,
    editTypeScene,
    deleteTypeScenes,
    deleteTypeSceneById
}