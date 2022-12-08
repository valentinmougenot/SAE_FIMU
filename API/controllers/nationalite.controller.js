import {db} from '../models/index.js';
import {pool} from "../db.config.js";
const Nationalite = db.nationalite;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer une nationalité d'un artiste"
        });
        return;
    }
    
    if (!req.body.id_artiste) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const nationalite = {
        id_artiste: req.body.id_artiste,
        id_pays: req.body.id_pays
    };

    Nationalite.create(nationalite)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Nationalite."
            });
        });
}

export const findAll = (req, res) => {
    Nationalite.findAll(
        { include: [{model:db.artiste},
                    {model:db.pays}]})
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving nationalites."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Nationalite.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Nationalite with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier une nationalité d'un artiste"
        });
        return;
    }
    
    const id = req.params.id;

    Nationalite.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Nationalite was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Nationalite with id=${id}. Maybe Nationalite was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Nationalite with id=" + id
            });
        });
}

export const deleteByIdArtiste = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer une nationalité d'un artiste"
        });
        return;
    }
    
    const id = req.params.id;

    Nationalite.destroy({
        where: { id_artiste: id }
    })
        .then(nums => {
            res.send({ message: `${nums} Nationalites were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Nationalite with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer toutes les nationalitées d'un artiste"
        });
        return;
    }
    
    Nationalite.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Nationalites were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all nationalites."
            });
        });
}

const deleteCurrentAfterSwitch = (req, res) => {
    pool.query('DELETE FROM currentseason.nationalites;') , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    }
}

const deleteNextAfterSwitch = (req, res) => {
    pool.query('DELETE FROM nextseason.nationalites;') , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    }
}


