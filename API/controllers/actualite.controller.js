import {db} from '../models/index.js';
const Actualite = db.actualite;
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer une actualité"
        });
        return;
    }
    if (!req.body.titre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const actualite = {
        titre: req.body.titre,
        contenu: req.body.contenu,
        date_envoi: Sequelize.fn('NOW'),
        id_typeactu: req.body.id_typeactu
    };

    Actualite.create(actualite)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Actualite."
            });
        });
}

export const findAll = (req, res) => {
    Actualite.findAll(
        { include: [{model:db.typeactu}],
        order: [['date_envoi', 'DESC']]})
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving actualites."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Actualite.findByPk(id, { include: [{model:db.typeactu}]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Actualite with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier une actualité"
        });
        return;
    }
    const id = req.params.id;

    const actualite = {
        titre: req.body.titre,
        contenu: req.body.contenu,
        date_envoi: Sequelize.fn('NOW'),
        id_typeactu: req.body.id_typeactu
    };

    Actualite.update(actualite, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Actualite was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Actualite with id=${id}. Maybe Actualite was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Actualite with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer une actualité"
        });
        return;
    }
    const id = req.params.id;

    Actualite.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Actualite was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Actualite with id=${id}. Maybe Actualite was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Actualite with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer les actualités"
        });
        return;
    }
    Actualite.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Actualites were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all actualites."
            });
        });
}