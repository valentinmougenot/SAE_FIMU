import {Request, Response} from "express";
import {dbCommon} from "../models";

const getTypeStands = async (req: Request, res: Response) => {
    try {
        const typeStands = await dbCommon.typeStands.findAll();

        const response = {
            error: 0,
            data: typeStands
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des types de stand."
        });
    }
}

const getTypeStandById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const typeStand = await dbCommon.typeStands.findOne({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: typeStand
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération du type de stand."
        });
    }
}

const createTypeStand = async (req: Request, res: Response) => {
    try {
        const typeStand = await dbCommon.typeStands.create(req.body);

        const response = {
            error: 0,
            data: typeStand
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création du type de stand."
        });
    }
}

const editTypeStand = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const typeStand = await dbCommon.typeStands.update(req.body, {
            where: {
                id: id
            }
        });

        const response = {
            error: 0,
            data: typeStand
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la modification du type de stand."
        });
    }
}

const deleteTypeStands = async (req: Request, res: Response) => {
    try {
        const typeStands = await dbCommon.typeStands.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: typeStands
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du type de stand."
        });
    }
}

const deleteTypeStandById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const typeStand = await dbCommon.typeStands.destroy({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: typeStand
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du type de stand."
        });
    }
}

export default {
    getTypeStands,
    getTypeStandById,
    createTypeStand,
    editTypeStand,
    deleteTypeStands,
    deleteTypeStandById
}