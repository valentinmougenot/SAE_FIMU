import {db} from "../models/index.js";
import {pool} from "../db.config.js";
const Concert = db.concert;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un concert"
        });
        return;
    }
    if (!req.body.annee) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const concert = {
        id_scene: req.body.id_scene,
        id_artiste: req.body.id_artiste,
        date_debut: req.body.date_debut,
        duree: req.body.duree,
        nb_personnes: req.body.nb_personnes,
        annee: req.body.annee
    };

    Concert.create(concert)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Concert."
            });
        });
}

export const findAll = (req, res) => {
    Concert.findAll(
        { include: [{model:db.artiste},
            {model:db.scene},
            {model:db.saison}]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Concert."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Concert.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Concert with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier un concert"
        });
        return;
    }
    const id = req.params.id;

    Concert.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Concert was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Concert with id=${id}. Maybe Concert was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Concert with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un concert"
        });
        return;
    }
    const id = req.params.id;

    Concert.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Concert was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Concert with id=${id}. Maybe Concert was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Concert with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer les concerts"
        });
        return;
    }
    Concert.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Concerts were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Concerts."
            });
        });
}



const deleteCurrentAfterSwitch = (req, res) => {
    pool.query('DELETE FROM nextseason.concerts;') , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    }
}



