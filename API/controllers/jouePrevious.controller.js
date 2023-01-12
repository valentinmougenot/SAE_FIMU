import {db} from '../models/index.js';
const previousJoue = db.jouePrevious;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un lien entre un ancien artiste et une saison"
        });
        return;
    }

    const joue = {
        id_artiste: req.body.id_artiste,
        id_instrument: req.body.id_instrument
    };

    previousJoue.create(joue)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the previous Joue."
            });
        });
}

export const findAll = (req, res) => {
    previousJoue.findAll()
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving previous joues."
            });
        });
}

export const deleteByIdArtiste = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un lien entre un ancien artiste et une saison"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer un lien entre un ancien artiste et une saison"
        });
        return;
    }
    const id = req.params.id;

    previousJoue.destroy({
        where: { id_artiste: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "previous joue was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete previous joue with id=${id}. Maybe previous joue was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete previous joue with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer les liens entre un ancien artiste et une saison"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer les liens entre un ancien artiste et une saison"
        });
        return;
    }
    previousJoue.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} previous joues were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all previous joues."
            });
        });
}
