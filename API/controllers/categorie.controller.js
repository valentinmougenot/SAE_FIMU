import {db} from '../models/index.js';
const Categorie = db.categorie;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.body.libelle) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const categorie = {
        libelle: req.body.libelle
    };
    
    Categorie.create(categorie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Categorie."
            });
        });
}

export const findAll = (req, res) => {
    const nom = req.query.nom;

    Categorie.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Categorie.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Categorie with id=" + id
            });
        });
}

export const update = (req, res) => {
    const id = req.params.id;

    Categorie.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Categorie was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Categorie with id=${id}. Maybe Categorie was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Categorie with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    const id = req.params.id;

    Categorie.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Categorie was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Categorie with id=${id}. Maybe Categorie was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Categorie with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    Categorie.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Categories were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all categories."
            });
        });
}
