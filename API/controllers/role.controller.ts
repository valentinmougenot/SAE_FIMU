import {Request, Response} from "express";
import {dbCommon} from "../models";

const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await dbCommon.roles.findAll();

        const response = {
            error: 0,
            data: roles
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des roles."
        });
    }
}

const getRoleById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const role = await dbCommon.roles.findOne({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: role
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération du role."
        });
    }
}

const createRole = async (req: Request, res: Response) => {
    try {
        const role = await dbCommon.roles.create(req.body);

        const response = {
            error: 0,
            data: role
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création du role."
        });
    }
}

const editRole = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const role = await dbCommon.roles.update(req.body, {
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: role
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la modification du role."
        });
    }
}

const deleteRoles = async (req: Request, res: Response) => {
    try {
        const role = await dbCommon.roles.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: role
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du role."
        });
    }
}

const deleteRoleById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const role = await dbCommon.roles.destroy({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: role
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du role."
        });
    }
}

export default {
    getRoles,
    getRoleById,
    createRole,
    editRole,
    deleteRoles,
    deleteRoleById
}