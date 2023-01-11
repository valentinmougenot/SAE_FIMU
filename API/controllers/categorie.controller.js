import {db} from '../models/index.js';
const Categorie = db.categorie;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer une catégorie"
        });
        return;
    }
    

    const categorie = {
        libelle: req.body.libelle,
        couleur: req.body.couleur
    };
    
    Categorie.create(categorie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Categorie."
            });
        });
}

export const findAll = (req, res) => {
    const nom = req.query.nom;

    Categorie.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Categorie.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Categorie with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier une catégorie"
        });
        return;
    }
    
    const id = req.params.id;

    Categorie.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Categorie was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Categorie with id=${id}. Maybe Categorie was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Categorie with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer une catégorie"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer une catégorie"
        });
        return;
    }
    
    const id = req.params.id;

    Categorie.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Categorie was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Categorie with id=${id}. Maybe Categorie was not found!`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Could not delete Categorie with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer toutes les catégorie"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer toutes les catégorie"
        });
        return;
    }
    
    Categorie.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Categories were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all categories."
            });
        });
}
