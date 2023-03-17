import {Request, Result} from "express"

import {dbCommon} from "../models";
import {Op} from "sequelize";

const getCategories = async (req: Request, res: Result) => {
    try {
        const libelle = req.query.libelle;
        const conditions = {};

        if (libelle) {
            conditions['libelle'] = {
                [Op.like]: `%${libelle}%`
            }
        }

        const categories = await dbCommon.categories.findAll({
            where: conditions,
        });

        const response = {
            error: 0,
            data: categories
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des catégories."
        });
    }
}

const getCategorieById = async (req: Request, res: Result) => {
    try {
        const id = req.params.id;

        const categorie = await dbCommon.categories.findOne({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: categorie
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération de la catégorie."
        });
    }
}

const createCategorie = async (req: Request, res: Result) => {
    try {
        const categorie = await dbCommon.categories.create(req.body);

        const response = {
            error: 0,
            data: categorie
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création de la catégorie."
        });
    }
}

const editCategorie = async (req: Request, res: Result) => {
    try {
        const id = req.params.id;
        const categorie = await dbCommon.categories.update(req.body, {
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: categorie
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la modification de la catégorie."
        });
    }
}

const deleteCategories = async (req: Request, res: Result) => {
    try {
        const categorie = await dbCommon.categories.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: categorie
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression de la catégorie."
        });
    }
}

const deleteCategorieById = async (req: Request, res: Result) => {
    try {
        const id = req.params.id;
        const categorie = await dbCommon.categories.destroy({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: categorie
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression de la catégorie."
        });
    }
}

export default {
    getCategories,
    getCategorieById,
    createCategorie,
    editCategorie,
    deleteCategories,
    deleteCategorieById
}