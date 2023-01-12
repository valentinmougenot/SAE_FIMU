import {db} from '../models/index.js';
const previousFait = db.faitPrevious;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un ancien lien entre le prochain artiste et un genre"
        });
        return;
    }
    
    const fait = {
        id_artiste: req.body.id_artiste,
        id_genre: req.body.id_genre
    };

    previousFait.create(fait)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the previous Fait."
            });
        });
}

export const findAll = (req, res) => {
    previousFait.findAll(
        { include: [{model:db.artistePrevious},
                    {model:db.genre}]})
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving previous faits."
            });
        });
}

export const deleteByIdArtiste = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un ancien lien entre le prochain artiste et un genre"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer un ancien lien entre le prochain artiste et un genre"
        });
        return;
    }
    
    const id = req.params.id;

    previousFait.destroy({
        where: { id_artiste: id }
    })
        .then(nums => {
            res.send({ message: `${nums} previous fait were deleted successfully!` });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Could not delete previous Fait with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimmer tous les anciens liens entre le prochain artiste et un genre"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimmer tous les anciens liens entre le prochain artiste et un genre"
        });
        return;
    }
    
    previousFait.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} previous Fait were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all previous Faits."
            });
        });
}