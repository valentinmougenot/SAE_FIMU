import {db} from '../models/index.js';
const Typeactu = db.typeactu;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un type d'actualité"
        });
        return;
    }

    const typeactu = {
        libelle: req.body.libelle
    };

    Typeactu.create(typeactu)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Typeactu."
            });
        });
}

export const findAll = (req, res) => {
    Typeactu.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Typeactu."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Typeactu.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Typeactu with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier un type d'actualité"
        });
        return;
    }
    const id = req.params.id;

    Typeactu.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Typeactu was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Typeactu with id=${id}. Maybe Typeactu was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Typeactu with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un type d'actualité"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer un type d'actualité"
        });
        return;
    }
    const id = req.params.id;

    Typeactu.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Typeactu was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Typeactu with id=${id}. Maybe Typeactu was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Typeactu with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un type d'actualité"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer un type d'actualité"
        });
        return;
    }
    Typeactu.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Typeactu were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Typeactu."
            });
        });
}