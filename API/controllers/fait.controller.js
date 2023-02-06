import {db} from '../models/index.js';
const Fait = db.fait;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un lien entre genre et artiste"
        });
        return;
    }
    const fait = {
        id_artiste: req.body.id_artiste,
        id_genre: req.body.id_genre
    };

    Fait.create(fait)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Fait."
            });
        });
}

export const findAll = (req, res) => {
    Fait.findAll()
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving faits."
            });
        });
}

export const deleteByIdArtiste = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un lien entre genre et artiste"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer un lien entre genre et artiste"
        });
        return;
    }

    const id = req.params.id;

    Fait.destroy({
        where: { id_artiste: id }
    })
        .then(nums => {
            res.send({ message: `${nums} Fait were deleted successfully!` });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Could not delete Fait with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer les liens entre genre et artiste"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer les liens entre genre et artiste"
        });
        return;
    }
    Fait.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Fait were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all faits."
            });
        });
}