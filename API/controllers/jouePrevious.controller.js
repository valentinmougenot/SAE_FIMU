import {db} from '../models/index.js';
import {pool} from "../db.config.js";
const previousJoue = db.jouePrevious;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un lien entre un ancien artiste et une saison"
        });
        return;
    }
    if (!req.body.id_artiste) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const joue = {
        id_artiste: req.body.id_artiste,
        id_instrument: req.body.id_instrument
    };

    previousJoue.create(joue)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the previous Joue."
            });
        });
}

export const findAll = (req, res) => {
    previousJoue.findAll()
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving previous joues."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    previousJoue.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving previous joue with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier un lien entre un ancien artiste et une saison"
        });
        return;
    }
    const id = req.params.id;

    previousJoue.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "previous joue was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update previous joue with id=${id}. Maybe previous joue was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating previous joue with id=" + id
            });
        });
}

export const deleteByIdArtiste = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un lien entre un ancien artiste et une saison"
        });
        return;
    }
    const id = req.params.id;

    previousJoue.destroy({
        where: { id_artiste: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "previous joue was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete previous joue with id=${id}. Maybe previous joue was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete previous joue with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer les liens entre un ancien artiste et une saison"
        });
        return;
    }
    previousJoue.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} previous joues were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all previous joues."
            });
        });
}

