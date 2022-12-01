import {db} from '../models/index.js';
import {pool} from '../db.config.js';
const Saison = db.saison;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer une saison"
        });
        return;
    }
    if (!req.body.annee) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const saison = {
        annee: req.body.annee,
        couleur1: req.body.couleur1,
        couleur2: req.body.couleur2
    };
    
    Saison.create(saison)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Saison."
            });
        });
}

export const findAll = (req, res) => {
    Saison.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Saisons."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;
    Saison.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Saison with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier une saison"
        });
        return;
    }
    const id = req.params.id;

    Saison.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Saison was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Saison with id=${id}. Maybe Saison was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Saison with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer une saison"
        });
        return;
    }
    const id = req.params.id;

    Saison.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Saison was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Saison with id=${id}. Maybe Saison was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Saison with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer toutes les saisons"
        });
        return;
    }
    Saison.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Saisons were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Saisons."
            });
        });
}

