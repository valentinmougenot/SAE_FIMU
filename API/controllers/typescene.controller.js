import {db} from '../models/index.js';
const Typescene = db.typescene;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour chercher un type de scène"
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
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier un type de scène"
        });
        return;
    }
    
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
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un type de scène"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer un type de scène"
        });
        return;
    }
    
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
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer tous les types de scène"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer tous les types de scène"
        });
        return;
    }
    
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