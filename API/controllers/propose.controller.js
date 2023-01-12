import {db} from '../models/index.js';
const Propose = db.propose;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer une proposition"
        });
        return;
    }

    const propose = {
        id_stand: req.body.id_stand,
        id_service: req.body.id_service,
    };

    Propose.create(propose)
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Propose."
            });
        }
        );
}

export const findAll = (req, res) => {
    Propose.findAll()
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving proposes."
            });
        });
}

export const deleteOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer une proposition"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer une proposition"
        });
        return;
    }

    const id = req.params.id;

    Propose.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Propose was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Propose with id=${id}. Maybe Propose was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Propose with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer une proposition"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer une proposition"
        });
        return;
    }
    
    Propose.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Proposes were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all proposes."
            });
        });
}

export const deleteByIdStand = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer une proposition"
        });
        return;
    }
    const id_stand = req.params.id_stand;

    Propose.destroy({
        where: { id_stand: id_stand }
    })
        .then(num => {
            if (num >= 0) {
                res.send({
                    message: "Propose was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Propose with id_stand=${id_stand}. Maybe Propose was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Propose with id_stand=" + id_stand
            });
        });
}