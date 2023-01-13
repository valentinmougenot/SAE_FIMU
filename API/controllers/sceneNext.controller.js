import {db} from '../models/index.js';
const Scene = db.sceneNext;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer une scene"
        });
        return;
    }

    const scene = {
        libelle: req.body.libelle,
        jauge: req.body.jauge,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        id_typescene: req.body.id_typescene
    };
    
    Scene.create(scene)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Scene."
            });
        });
}

export const findAll = (req, res) => {

    Scene.findAll({ include: [{model: db.typescene}] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving scenes."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Scene.findByPk(id, { include: [{model: db.typescene}] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Scene with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier une scene"
        });
        return;
    }
    const id = req.params.id;

    Scene.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Scene was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Scene with id=${id}. Maybe Scene was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Scene with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer une scene"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer une scene"
        });
        return;
    }
    const id = req.params.id;

    Scene.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Scene was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Scene with id=${id}. Maybe Scene was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Scene with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer toutes les scenes"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer toutes les scenes"
        });
        return;
    }
    Scene.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Scenes were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all scenes."
            });
        });
}

