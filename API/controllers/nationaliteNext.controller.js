import {db} from '../models/index.js';
const Nationalite = db.nationaliteNext;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer une nationalité"
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
    Nationalite.findAll()
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

export const deleteByIdArtiste = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer une nationalité"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer une nationalité"
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
            message: "Vous devez être connecté pour suppprimer les nationalités"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer les nationalités"
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