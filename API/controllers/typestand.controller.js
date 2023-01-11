import {db} from '../models/index.js';
const Typestand = db.typestand;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un type de stand"
        });
        return;
    }

    const typestand = {
        libelle: req.body.libelle,
    };

    Typestand.create(typestand)
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Typestand."
            });
        }
        );
}

export const findAll = (req, res) => {
    Typestand.findAll()
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving typestands."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Typestand.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Typestand with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier un type de stand"
        });
        return;
    }
    const id = req.params.id;

    Typestand.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Typestand was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Typestand with id=${id}. Maybe Typestand was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Typestand with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un type de stand"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer un type de stand"
        });
        return;
    }
    const id = req.params.id;

    Typestand.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Typestand was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Typestand with id=${id}. Maybe Typestand was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Typestand with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un type de stand"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer un type de stand"
        });
        return;
    }
    Typestand.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Typestands were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all typestands."
            });
        });
}