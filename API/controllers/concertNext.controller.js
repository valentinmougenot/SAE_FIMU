import {db} from "../models/index.js";
const Concert = db.concertNext;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un concert"
        });
        return;
    }
    
    const concert = {
        id_scene: req.body.id_scene,
        id_artiste: req.body.id_artiste,
        heure_debut: req.body.heure_debut,
        date_debut: req.body.date_debut,
        duree: req.body.duree,
        nb_personnes: req.body.nb_personnes,
        annee: req.body.annee
    };

    Concert.create(concert)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Concert."
            });
        });
}

export const findAll = (req, res) => {
    Concert.findAll(
        { include: [{model:db.artisteNext},
            {model:db.sceneNext},
            {model:db.saison}]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Concert."
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer tous les concerts"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer tous les concerts"
        });
        return;
    }
    
    Concert.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Concerts were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Concerts."
            });
        });
}