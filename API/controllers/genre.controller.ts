import {Request, Response} from "express";
import {dbCommon} from "../models";

const getGenres = async (req: Request, res: Response) => {
    try {
        const genres = await dbCommon.genres.findAll();

        const response = {
            error: 0,
            data: genres
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des genres."
        });
    }
}

const getGenreById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const genre = await dbCommon.genres.findOne({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: genre
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération du genre."
        });
    }
}

const createGenre = async (req: Request, res: Response) => {
    try {
        const genre = await dbCommon.genres.create(req.body);

        const response = {
            error: 0,
            data: genre
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création du genre."
        });
    }
}

const editGenre = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const genre = await dbCommon.genres.update(req.body, {
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: genre
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la modification du genre."
        });
    }
}

const deleteGenres = async (req: Request, res: Response) => {
    try {
        const genre = await dbCommon.genres.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: genre
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du genre."
        });
    }
}

const deleteGenreById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const genre = await dbCommon.genres.destroy({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: genre
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du genre."
        });
    }
}

export default {
    getGenres,
    getGenreById,
    createGenre,
    editGenre,
    deleteGenres,
    deleteGenreById
}