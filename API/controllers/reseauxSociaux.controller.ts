import {Request, Response} from "express";
import {dbCommon} from "../models";

const getReseauxSociaux = async (req: Request, res: Response) => {
    try {
        const reseauxSociaux = await dbCommon.reseauxSociaux.findAll();

        const response = {
            error: 0,
            data: reseauxSociaux
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des réseaux sociaux."
        });
    }
}

const getReseauSocialById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const reseauSocial = await dbCommon.reseauxSociaux.findOne({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: reseauSocial
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération du réseau social."
        });
    }
}

const createReseauSocial = async (req: Request, res: Response) => {
    try {
        const reseauSocial = await dbCommon.reseauxSociaux.create(req.body);

        const response = {
            error: 0,
            data: reseauSocial
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création du réseau social."
        });
    }
}

const editReseauSocial = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const reseauSocial = await dbCommon.reseauxSociaux.findOne({
            where: {
                id
            }
        });

        if (reseauSocial) {
            await reseauSocial.update(req.body);

            const response = {
                error: 0,
                data: reseauSocial
            }

            res.status(200).json(response);
        }
        else {
            res.status(404).json({
                error: 1,
                message: "Le réseau social n'existe pas."
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la modification du réseau social."
        });
    }
}

const deleteReseauxSociaux = async (req: Request, res: Response) => {
    try {
        const reseauxSociaux = await dbCommon.reseauxSociaux.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: reseauxSociaux
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression des réseaux sociaux."
        });
    }
}

const deleteReseauSocialById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const reseauSocial = await dbCommon.reseauxSociaux.findOne({
            where: {
                id
            }
        });

        if (reseauSocial) {
            await reseauSocial.destroy();

            const response = {
                error: 0,
                data: reseauSocial
            }

            res.status(200).json(response);
        }
        else {
            res.status(404).json({
                error: 1,
                message: "Le réseau social n'existe pas."
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du réseau social."
        });
    }
}

export default {
    getReseauxSociaux,
    getReseauSocialById,
    createReseauSocial,
    editReseauSocial,
    deleteReseauxSociaux,
    deleteReseauSocialById
}