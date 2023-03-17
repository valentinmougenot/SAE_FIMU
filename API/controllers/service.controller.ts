import {Request, Response} from "express";
import {dbCommon} from "../models";

const getServices = async (req: Request, res: Response) => {
    try {
        const services = await dbCommon.services.findAll();

        const response = {
            error: 0,
            data: services
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des services."
        });
    }
}

const getServiceById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const service = await dbCommon.services.findOne({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: service
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération du service."
        });
    }
}

const createService = async (req: Request, res: Response) => {
    try {
        const service = await dbCommon.services.create(req.body);

        const response = {
            error: 0,
            data: service
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création du service."
        });
    }
}

const editService = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const service = await dbCommon.services.update(req.body, {
            where: {
                id: id
            }
        });

        const response = {
            error: 0,
            data: service
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la modification du service."
        });
    }
}

const deleteServices = async (req: Request, res: Response) => {
    try {
        const service = await dbCommon.services.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: service
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du service."
        });
    }
}

const deleteServiceById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const service = await dbCommon.services.destroy({
            where: {
                id: id
            }
        });

        const response = {
            error: 0,
            data: service
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du service."
        });
    }
}

export default {
    getServices,
    getServiceById,
    createService,
    editService,
    deleteServices,
    deleteServiceById
}