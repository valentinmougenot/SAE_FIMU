import {Request, Response} from "express";
import {dbCommon} from "../models";

const getUtilisateurs = async (req: Request, res: Response) => {
    try {
        const incRole = req.query.incRole !== 'false';

        const options = {
            include: []
        }
        if (incRole) {
            options.include.push({
                model: dbCommon.roles,
            });
        }

        const utilisateurs = await dbCommon.utilisateurs.findAll(options);

        const response = {
            error: 0,
            data: utilisateurs
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des utilisateurs."
        });
    }
}

const getUtilisateurById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const incRole = req.query.incRole !== 'false';

        const options = {
            where: {
                id
            },
            include: []
        }
        if (incRole) {
            options.include.push({
                model: dbCommon.roles,
            });
        }

        const utilisateur = await dbCommon.utilisateurs.findOne(options);

        const response = {
            error: 0,
            data: utilisateur
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération de l'utilisateur."
        });
    }
}

const createUtilisateur = async (req: Request, res: Response) => {
    try {
        const utilisateur = await dbCommon.utilisateurs.create(req.body);

        const response = {
            error: 0,
            data: utilisateur
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création de l'utilisateur."
        });
    }
}

const editUtilisateur = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const utilisateur = await dbCommon.utilisateurs.update(req.body, {
            where: {
                id: id
            }
        });

        const response = {
            error: 0,
            data: utilisateur
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de l'édition de l'utilisateur."
        });
    }
}

const deleteUtilisateurs = async (req: Request, res: Response) => {
    try {
        const utilisateurs = await dbCommon.utilisateurs.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: utilisateurs
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression de l'utilisateur."
        });
    }
}

const deleteUtilisateurById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const utilisateur = await dbCommon.utilisateurs.destroy({
            where: {
                id: id
            }
        });

        const response = {
            error: 0,
            data: utilisateur
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression de l'utilisateur."
        });
    }
}

export default {
    getUtilisateurs,
    getUtilisateurById,
    createUtilisateur,
    editUtilisateur,
    deleteUtilisateurs,
    deleteUtilisateurById
}