import {db} from "../models/index.js";
const Possede = db.possede;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un lien entre un réseau social et un artiste"
        });
        return;
    }
    
    if (!req.body.lien) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const possede = {
        id_artiste: req.body.idArtiste,
        id_reseaux_sociaux: req.body.idReseauxSociaux,
        lien: req.body.lien
    };

    Possede.create(possede)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Possede."
            });
        })
}

export const findAll = (req, res) => {
    Possede.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving possede."
            });
        })
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Possede.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Possede with id=" + id
            });
        })
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier un lien entre un réseau social et un artiste"
        });
        return;
    }
    
    const id = req.params.id;

    Possede.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Possede was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Possede with id=${id}. Maybe Possede was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Possede with id=" + id
            });
        })
}

 export const deleteByIdArtiste = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un lien entre un réseau social et un artiste"
        });
        return;
    }
    
    const id = req.params.id;

    Possede.destroy({
        where: { id_artiste: id }
    })
        .then(nums => {
            res.send({ message: `${nums} Possede were deleted successfully!` });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Could not delete Possede with id=" + id
            });
        });
    }


 export const deleteAll =(req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer tous les liens entre un réseau social et un artiste"
        });
        return;
    }
    
    Possede.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Possede were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all possede."
            });
        });
 }