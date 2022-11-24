import {db} from '../models/index.js';
const previousFait = db.faitPrevious;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
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

    previousFait.create(fait)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the previous Fait."
            });
        });
}

export const findAll = (req, res) => {
    previousFait.findAll(
        { include: [{model:db.artistePrevious},
                    {model:db.genre}]})
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving previous faits."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    previousFait.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving previous fait with id=" + id
            });
        });
}

export const update = (req, res) => {
    const id = req.params.id;

    previousFait.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "previous fait was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update previous Fait with id=${id}. Maybe previous fait was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating previous fait with id=" + id
            });
        });
}

export const deleteByIdArtiste = (req, res) => {
    const id = req.params.id;

    previousFait.destroy({
        where: { id_artiste: id }
    })
        .then(nums => {
            res.send({ message: `${nums} previous fait were deleted successfully!` });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Could not delete previous Fait with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    previousFait.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} previous Fait were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all previous Faits."
            });
        });
}