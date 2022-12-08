import {db} from '../models/index.js';
import {pool} from "../db.config.js";
const Artiste = db.artiste;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un artiste"
        });
        return;
    }
    if (!req.body.nom) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    if (req.body.lien_video) {
        if (req.body.lien_video.includes("https://www.youtube.com/watch?v=")) {
            req.body.lien_video = req.body.lien_video.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
        }
        else if (req.bodylien_video.includes("https://youtu.be/")) {
            req.body.lien_video = req.body.lien_video.replace("https://youtu.be/", "https://www.youtube.com/embed/");
        }
    } 
    const artiste = {
        nom: req.body.nom,
        photo: req.body.photo,
        biographie: req.body.biographie,
        lien_video: req.body.lien_video,
        lien_site: req.body.lien_site,
        id_categorie: req.body.id_categorie
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
    Artiste.findAll(
        { include: [{model:db.pays},
                {model:db.genre},
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

    Artiste.findByPk(id, {include:  [{model:db.pays},
        {model:db.genre},
        {model:db.categorie}]})
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
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier un artiste"
        });
        return;
    }
    const id = req.params.id;
    
    if (req.body.lien_video) {
        if (req.body.lien_video.includes("https://www.youtube.com/watch?v=")) {
            req.body.lien_video = req.body.lien_video.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
        }
        else if (req.body.lien_video.includes("https://youtu.be/")) {
            req.body.lien_video = req.body.lien_video.replace("https://youtu.be/", "https://www.youtube.com/embed/");
        }
    } 

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
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un artiste"
        });
        return;
    }
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
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer les artiste"
        });
        return;
    }
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

export const findLast = (req, res) => {
    Artiste.findAll({limit: 1, order: [['id', 'DESC']]})
        .then(data => {
            res.send(data[0]);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving artistes."
            });
        });
}



const deleteCurrentAfterSwitch = (req, res) => {
    pool.query('DELETE FROM currentseason.artistes;') , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    }
}

const deleteNextAfterSwitch = (req, res) => {
    pool.query('DELETE FROM nextseason.artistes;') , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    }
}