import {db} from "../models/index.js";
const ReseauxSociaux = db.reseauxSociaux;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un réseau social"
        });
        return;
    }
    
    const reseauxSociaux = {
        libelle: req.body.libelle,
        logo: req.body.logo,
    };
    
    ReseauxSociaux.create(reseauxSociaux)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the ReseauxSociaux."
        });
     });
}

export const findAll = (req, res) => {
    ReseauxSociaux.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving ReseauxSociaux."
        });
     });
}

export const findOne = (req, res) => {
    const id = req.params.id;
    
    ReseauxSociaux.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving ReseauxSociaux with id=" + id
        });
    });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier un réseau social"
        });
        return;
    }
    
    const id = req.params.id;
    
    ReseauxSociaux.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "ReseauxSociaux was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update ReseauxSociaux with id=${id}. Maybe ReseauxSociaux was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating ReseauxSociaux with id=" + id
        });
    });
}

export const deleteOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un réseau social"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer un réseau social"
        });
        return;
    }
    
    const id = req.params.id;
    
    ReseauxSociaux.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "ReseauxSociaux was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete ReseauxSociaux with id=${id}. Maybe ReseauxSociaux was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete ReseauxSociaux with id=" + id
        });
    });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer tous les réseaux sociaux"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer tous les réseaux sociaux"
        });
        return;
    }
    
    ReseauxSociaux.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
        res.send({ message: `${nums} ReseauxSociaux were deleted successfully!` });
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all ReseauxSociaux."
        });
    });
}

