import {db} from '../models/index.js';
const Typescene = db.typescene;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.body.libelle) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const typescene = {
        libelle: req.body.libelle
    };
    
    Typescene.create(typescene)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Typescene."
            });
        });
}

export const findAll = (req, res) => {
    const nom = req.query.nom;

    Typescene.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Typescene."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Typescene.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Typescene with id=" + id
            });
        });
}

export const update = (req, res) => {
    const id = req.params.id;

    Typescene.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Typescene was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Typescene with id=${id}. Maybe Typescene was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Typescene with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    const id = req.params.id;

    Typescene.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Typescene was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Typescene with id=${id}. Maybe Typescene was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Typescene with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    Typescene.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Typescene were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Typescene."
            });
        });
}