import {Request, Response} from "express";
import {dbCommon, dbCurrent} from "../models";
import {getDbSaions} from "../services/saison.service";
import {Op} from "sequelize";

const getConcerts = async (req: Request, res: Response) => {
    try {
        let saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        if (saison !== "current" && saison !== "next")
            saison = "";
        const incArtiste = req.query.incArtiste !== 'false';
        const incScene = req.query.incScene !== 'false';
        const incCat = req.query.incCat !== 'false';
        const incGenre = req.query.incGenre !== 'false';
        const incPays = req.query.incPays !== 'false';
        const incRs = req.query.incRs !== 'false';

        const date = req.query.date;

        const db = getDbSaions(saison);

        const options = {
            include: [],
            where: {}
        }
        if (date) {
            options.where = {
                date_debut: date
            }
        }
        if (incScene) {
            options.include.push({
                model: db.scenes,
                include: [
                    {
                        model: dbCommon.typeScenes
                    }
                ]
            });
        }
        if (incArtiste) {
            let include = {
                model: db.artistes,
                include: []
            }
            if (incCat) {
                include.include.push({
                    model: dbCommon.categories,
                });
            }
            if (incGenre) {
                include.include.push({
                    model: dbCommon.genres,
                    through: {
                        attributes: []
                    }
                });
            }
            if (incPays) {
                include.include.push({
                    model: dbCommon.pays,
                    through: {
                        attributes: []
                    }
                });
            }
            if (incRs) {
                include.include.push({
                    model: dbCommon.reseauxSociaux,
                    through: {
                        attributes: ['lien']
                    }
                });
            }
            options.include.push(include);
        }

        const concerts = await db.concerts.findAll(options);

        const response = {
            error: 0,
            data: concerts
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des concerts."
        });
    }
}

const getConcertById = async (req: Request, res: Response) => {
    try {
        let saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        if (saison !== "current" && saison !== "next")
            saison = "";
        const id = req.params.id;
        const incArtiste = req.query.incArtiste !== 'false';
        const incScene = req.query.incScene !== 'false';
        const incCat = req.query.incCat !== 'false';
        const incGenre = req.query.incGenre !== 'false';
        const incPays = req.query.incPays !== 'false';
        const incRs = req.query.incRs !== 'false';
        const db = getDbSaions(saison);

        const options = {
            where: {
                id
            },
            include: []
        }
        if (incScene) {
            options.include.push({
                model: db.scenes,
                include: [
                    {
                        model: dbCommon.typeScenes
                    }
                ]
            });
        }
        if (incArtiste) {
            let include = {
                model: db.artistes,
                include: []
            }
            if (incCat) {
                include.include.push({
                    model: dbCommon.categories,
                });
            }
            if (incGenre) {
                include.include.push({
                    model: dbCommon.genres,
                    through: {
                        attributes: []
                    }
                });
            }
            if (incPays) {
                include.include.push({
                    model: dbCommon.pays,
                    through: {
                        attributes: []
                    }
                });
            }
            if (incRs) {
                include.include.push({
                    model: dbCommon.reseauxSociaux,
                    through: {
                        attributes: ['lien']
                    }
                });
            }
            options.include.push(include);
        }

        const concert = await db.concerts.findOne(options);

        const response = {
            error: 0,
            data: concert
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération du concert."
        });
    }
}

const createConcert = async (req: Request, res: Response) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        req.body.heure_fin = calculateHeureFin(req.body.heure_debut, req.body.duree);

        if (!await isSceneFree(db, req.body.sceneId, req.body.date_debut, req.body.heure_debut, req.body.heure_fin)) {
            res.status(500).json({
                error: 1,
                message: "La scène n'est pas disponible à cette heure."
            });
            return;
        }

        if (!await isArtistFree(db, req.body.artisteId, req.body.date_debut, req.body.heure_debut, req.body.heure_fin)) {
            res.status(500).json({
                error: 1,
                message: "L'artiste n'est pas disponible à cette heure."
            });
            return;
        }

        const concert = await db.concerts.create(req.body);

        const response = {
            error: 0,
            data: concert
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création du concert."
        });
    }
}

const editConcert = async (req: Request, res: Response) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const id = req.params.id;
        const db = getDbSaions(saison);

        req.body.heure_fin = calculateHeureFin(req.body.heure_debut, req.body.duree);
        console.log(calculateHeureFin(req.body.heure_debut, req.body.duree))

        if (!await isSceneFree(db, req.body.sceneId, req.body.date_debut, req.body.heure_debut, req.body.heure_fin)) {
            res.status(500).json({
                error: 1,
                message: "La scène n'est pas disponible à cette heure."
            });
            return;
        }

        if (!await isArtistFree(db, req.body.artisteId, req.body.date_debut, req.body.heure_debut, req.body.heure_fin)) {
            res.status(500).json({
                error: 1,
                message: "L'artiste n'est pas disponible à cette heure."
            });
            return;
        }

        const concert = await db.concerts.update(req.body, {
            where: {
                id: id
            }
        });
        const response = {
            error: 0,
            data: concert
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la modification du concert."
        });
    }
}

const deleteConcerts = async (req: Request, res: Response) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        const concerts = await db.concerts.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: concerts
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du concert."
        });
    }
}

const deleteConcertById = async (req: Request, res: Response) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const id = req.params.id;
        const db = getDbSaions(saison);

        const concert = await db.concerts.findOne({
            where: {
                id
            }
        });

        if (concert) {
            await concert.destroy();
        }

        const response = {
            error: 0,
            data: concert
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression du concert."
        });
    }
}

const getDates = async (req: Request, res: Response) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        const dates = await db.concerts.findAll({
            attributes: ['date_debut'],
            group: ['date_debut'],
            order: [['date_debut', 'ASC']]
        });

        const response = {
            error: 0,
            data: dates
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des dates."
        });
    }
}

const getHeureMin = async (req: Request, res: Response) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        const date = req.query.date;

        const options = {
            attributes: ['heure_debut'],
            where: {},
            order: [['heure_debut', 'ASC']],
            limit: 1
        }

        if (date) {
            options.where = {
                date_debut: date
            }
        }

        const heure = await db.concerts.findAll(options);

        const response = {
            error: 0,
            data: heure[0]
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération de l'heure min."
        });
    }
}

const getHeureMax = async (req: Request, res: Response) => {
    try {
        const saison = req.headers.saison ? req.headers.saison.toLowerCase() : "";
        const db = getDbSaions(saison);

        const date = req.query.date;

        const options = {
            attributes: ['heure_fin'],
            where: {},
            order: [['heure_fin', 'DESC']],
            limit: 1
        }

        if (date) {
            options.where = {
                date_debut: date
            }
        }

        const heure = await db.concerts.findAll(options);

        const response = {
            error: 0,
            data: heure[0]
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération de l'heure max."
        });
    }
}

const calculateHeureFin = (heure_debut: string, duree: number) => {
    console.log(heure_debut, duree)
    let heure_fin = '';
    let h = parseInt(heure_debut.split(':')[0]);
    let m = parseInt(heure_debut.split(':')[1]);

    m += duree;
    while (m >= 60) {
        m -= 60;
        h++;
    }
    while (h >= 24) {
        h -= 24;
    }
    if (h < 10) {
        heure_fin += '0';
    }
    heure_fin += h.toString() + ':';
    if (m < 10) {
        heure_fin += '0';
    }
    heure_fin += m.toString();

    return heure_fin;
}

const isSceneFree = async (db, sceneId, date_debut, heure_debut, heure_fin) => {
    const sceneOccupee = await db.concerts.findOne({
        where: {
            sceneId: sceneId,
            date_debut: date_debut,
            [Op.or]: [
                {
                    heure_debut: {
                        [Op.between]: [heure_debut, heure_fin],
                    },
                },
                {
                    heure_fin: {
                        [Op.between]: [heure_debut, heure_fin],
                    },
                },
            ],
        },
    });

    return !sceneOccupee;
};

const isArtistFree = async (db, artisteId, date_debut, heure_debut, heure_fin) => {
    const artisteOccupe = await db.concerts.findOne({
        where: {
            artisteId: artisteId,
            date_debut: date_debut,
            [Op.or]: [
                {
                    heure_debut: {
                        [Op.between]: [heure_debut, heure_fin],
                    },
                },
                {
                    heure_fin: {
                        [Op.between]: [heure_debut, heure_fin],
                    },
                },
            ],
        },
    });

    return !artisteOccupe;
};

export default {
    getConcerts,
    getConcertById,
    createConcert,
    editConcert,
    deleteConcerts,
    deleteConcertById,
    getDates,
    getHeureMin,
    getHeureMax
}