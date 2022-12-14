import {db} from '../models/index.js';
const Artiste = db.artistePrevious;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un artiste"
        });
        return;
    }
    if (req.body.lien_video) {
        if (req.body.lien_video.includes("youtube.com/watch?v=")) {
            req.body.lien_video = req.body.lien_video.replace("youtube.com/watch?v=", "youtube.com/embed/");
        }
        else if (req.body.lien_video.includes("youtu.be/")) {
            req.body.lien_video = req.body.lien_video.replace("youtu.be/", "youtube.com/embed/");
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

    Artiste.findByPk(id, {include: [{model:db.pays},
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

export const findByYear = (req, res) => {
    const year = req.params.year;

    Artiste.findAll({include: [{model:db.saison, where: {annee: year}},
        {model:db.pays},
            {model:db.genre},
            {model:db.categorie}]})
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving artistes."
            });
        }
        );
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
        if (req.body.lien_video.includes("www.youtube.com/watch?v=")) {
            req.body.lien_video = req.body.lien_video.replace("www.youtube.com/watch?v=", "www.youtube.com/embed/");
        }
        else if (req.body.lien_video.includes("youtu.be/")) {
            req.body.lien_video = req.body.lien_video.replace("youtu.be/", "www.youtube.com/embed/");
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
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer un artiste"
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
            message: "Vous devez être connecté pour supprimer les artistes"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer les artistes"
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

