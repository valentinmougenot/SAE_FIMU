import {db} from '../models/index.js';
const Pays = db.pays;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.body.libelle) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const pays = {
        libelle: req.body.libelle
    };

    Pays.create(pays)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pays."
            });
        });
}

export const findAll = (req, res) => {
    const nom = req.query.nom;

    Pays.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pays."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Pays.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pays with id=" + id
            });
        });
}

export const update = (req, res) => {
    const id = req.params.id;

    Pays.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pays was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pays with id=${id}. Maybe Pays was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pays with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    const id = req.params.id;

    Pays.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pays was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pays with id=${id}. Maybe Pays was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pays with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    Pays.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Pays were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all pays."
            });
        });
}