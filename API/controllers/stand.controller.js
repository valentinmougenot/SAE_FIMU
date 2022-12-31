import {db} from '../models/index.js';
const Stand = db.stand;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un artiste"
        });
        return;
    }
    if (!req.body.libelle) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const stand = {
        libelle: req.body.libelle,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        id_typestand: req.body.id_typestand
    };

    Stand.create(stand)
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Stand."
            });
        }
        );
};

export const findAll = (req, res) => {
    Stand.findAll(
        { include: [{model:db.typestand}, {model: db.service}]})
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving stands."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Stand.findByPk(id, { include: [{model:db.typestand}, {model: db.service}]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Stand with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier un stand"
        });
        return;
    }
    const id = req.params.id;

    Stand.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Stand was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Stand with id=${id}. Maybe Stand was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Stand with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un stand"
        });
        return;
    }
    const id = req.params.id;

    Stand.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Stand was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Stand with id=${id}. Maybe Stand was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Stand with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un stand"
        });
        return;
    }
    Stand.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} stands were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all stands."
            });
        });
}