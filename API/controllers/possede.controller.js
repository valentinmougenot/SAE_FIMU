import {db} from "../models/index.js";
const Possede = db.possede;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un lien entre un réseau social et un artiste"
        });
        return;
    }

    const possede = {
        id_artiste: req.body.idArtiste,
        id_reseaux_sociaux: req.body.idReseauxSociaux,
        lien: req.body.lien
    };

    Possede.create(possede)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Possede."
            });
        })
}

export const findAll = (req, res) => {
    Possede.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving possede."
            });
        })
}

 export const deleteByIdArtiste = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un lien entre un réseau social et un artiste"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer un lien entre un réseau social et un artiste"
        });
        return;
    }
    
    const id = req.params.id;

    Possede.destroy({
        where: { id_artiste: id }
    })
        .then(nums => {
            res.send({ message: `${nums} Possede were deleted successfully!` });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Could not delete Possede with id=" + id
            });
        });
    }


 export const deleteAll =(req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer tous les liens entre un réseau social et un artiste"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer tous les liens entre un réseau social et un artiste"
        });
        return;
    }
    
    Possede.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Possede were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all possede."
            });
        });
 }