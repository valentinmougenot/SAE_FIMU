import {db} from '../models/index.js';
const Artiste = db.artiste;
const Op = db.Sequelize.Op;

// add an artiste
export const create = (req, res) => {
    if (!req.body.nom) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const artiste = {
        nom: req.body.nom,
        photo: req.body.photo,
        biographie: req.body.biographie,
        lien_video: req.body.lien_video,
        categorie_id: req.body.categorie_id
    };
    
    Artiste.create(artiste)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Artiste."
            });
        });
};


export const findAll = (req, res) => {
    const nom = req.query.nom;
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

    Artiste.findAll(
        { where: condition, 
            include: [{model:db.nationalite,
                include: [{model:db.pays}]},
                {model:db.fait,
                    include: [{model:db.genre}]},
                {model:db.categorie}]
            })
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving artistes."
            });
        });
};

export const findOne = (req, res) => {
    const id = req.params.id;

    Artiste.findByPk(id, {include: [{model:db.nationalite,
        include: [{model:db.pays}]},
        {model:db.fait,
            include: [{model:db.genre}]},
        {model:db.categorie}]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Artiste with id=" + id
            });
        });
};

export const update = (req, res) => {
    const id = req.params.id;

    Artiste.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Artiste was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Artiste with id=${id}. Maybe Artiste was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Artiste with id=" + id
            });
        });
};

export const deleteOne = (req, res) => {
    const id = req.params.id;

    Artiste.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Artiste was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Artiste with id=${id}. Maybe Artiste was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Artiste with id=" + id
            });
        });
};

export const deleteAll = (req, res) => {
    Artiste.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Artiste were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all artistes."
            });
        });
};

