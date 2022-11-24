import {db} from '../models/index.js';
const Nationalite = db.nationaliteNext;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.body.id_artiste) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const nationalite = {
        id_artiste: req.body.id_artiste,
        id_pays: req.body.id_pays
    };

    Nationalite.create(nationalite)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Nationalite."
            });
        });
}

export const findAll = (req, res) => {
    Nationalite.findAll(
        { include: [{model:db.artisteNext},
                    {model:db.pays}]})
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving nationalites."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Nationalite.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Nationalite with id=" + id
            });
        });
}

export const update = (req, res) => {
    const id = req.params.id;

    Nationalite.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Nationalite was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Nationalite with id=${id}. Maybe Nationalite was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Nationalite with id=" + id
            });
        });
}

export const deleteByIdArtiste = (req, res) => {
    const id = req.params.id;

    Nationalite.destroy({
        where: { id_artiste: id }
    })
        .then(nums => {
            res.send({ message: `${nums} Nationalites were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Nationalite with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    Nationalite.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Nationalites were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all nationalites."
            });
        });
}