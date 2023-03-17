import {Request, Result} from "express"
import {dbCommon} from "../models";

const getPays = async (req: Request, res: Result) => {
    try {
        const pays = await dbCommon.pays.findAll();

        const response = {
            error: 0,
            data: pays
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des pays."
        });
    }
}

const getPaysById = async (req: Request, res: Result) => {
    try {
        const id = req.params.id;

        const pays = await dbCommon.pays.findOne({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: pays
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération du pays."
        });
    }
}

const createPays = async (req: Request, res: Result) => {
    try {
        const pays = await dbCommon.pays.create(req.body);

        const response = {
            error: 0,
            data: pays
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création du pays."
        });
    }
}

const editPays = async (req: Request, res: Result) => {
    try {
        const id = req.params.id;

        const pays = await dbCommon.pays.update(req.body, {
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: pays
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la modification du pays."
        });
    }
}

const deletePays = async (req: Request, res: Result) => {
    try {
        const pays = await dbCommon.pays.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: pays
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du pays."
        });
    }
}

const deletePaysById = async (req: Request, res: Result) => {
    try {
        const id = req.params.id;

        const pays = await dbCommon.pays.destroy({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: pays
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du pays."
        });
    }
}

export default {
    getPays,
    getPaysById,
    createPays,
    editPays,
    deletePays,
    deletePaysById
}