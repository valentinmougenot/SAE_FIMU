import {db} from '../models/index.js';
const Fait = db.faitNext;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un lien entre le prochain artiste et un genre"
        });
        return;
    }
    
    if (!req.body.id_artiste) {
        res.status(400).send({
            message: "Content can not be empty!"
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
    Fait.findAll(
        { include: [{model:db.artisteNext},
                    {model:db.genre}]})
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

export const findOne = (req, res) => {
    const id = req.params.id;

    Fait.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Fait with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier un lien entre le prochain artiste et un genre"
        });
        return;
    }
    
    const id = req.params.id;

    Fait.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Fait was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Fait with id=${id}. Maybe Fait was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Fait with id=" + id
            });
        });
}

export const deleteByIdArtiste = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un lien entre le prochain artiste et un genre"
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
            message: "Vous devez être connecté pour supprimer tous les liens entre le prochain artiste et un genre"
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