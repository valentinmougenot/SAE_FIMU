import {db} from "../models/index.js";
import bcrypt from "bcryptjs";
const Utilisateur = db.utilisateur;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer un utilisateur"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour créer un utilisateur"
        });
        return;
    }

    const utilisateur = {
        identifiant: req.body.identifiant,
        mot_de_passe: req.body.mot_de_passe,
        id_role: req.body.id_role
    };
    
    Utilisateur.create(utilisateur)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Utilisateur."
            });
        });
}

export const findAll = (req, res) => {

    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour voir les utilisateurs"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour voir les utilisateurs"
        });
        return;
    }

    Utilisateur.findAll({
        include: [
            {model: db.role}
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Utilisateurs."
            });
        });
}

export const findOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour voir un utilisateur"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour voir un utilisateur"
        });
        return;
    }

    const id = req.params.id;

    Utilisateur.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Utilisateur with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier un utilisateur"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour modifier un utilisateur"
        });
        return;
    }
    const id = req.params.id;

    Utilisateur.update(req.body, {
        where: { identifiant: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Utilisateur was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Utilisateur with id=${id}. Maybe Utilisateur was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Utilisateur with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer un utilisateur"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer un utilisateur"
        });
        return;
    }
    const id = req.params.id;

    Utilisateur.destroy({
        where: { identifiant: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Utilisateur was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Utilisateur with id=${id}. Maybe Utilisateur was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Utilisateur with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer tous les utilisateurs"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer tous les utilisateurs"
        });
        return;
    }
    Utilisateur.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Utilisateurs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Utilisateurs."
            });
        });
}

export const login = (req, res) => {
    const identifiant = req.body.identifiant;
    const mot_de_passe = req.body.mot_de_passe;
    Utilisateur.findOne({
        where: {
            identifiant: identifiant,
        },
        include: [
            {model: db.role}
        ]
    })
        .then(data => {
            if (data && bcrypt.compareSync(mot_de_passe, data.mot_de_passe)) {
                req.session.identifiant = data.identifiant;
                req.session.mot_de_passe = data.mot_de_passe;
                req.session.id_role = data.id_role;
                req.session.role = data.role.libelle;

                res.send(data);
            } 
            else {
                res.status(500).send({
                    message: "Error retrieving Utilisateur with id=" + identifiant
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Utilisateur with id=" + identifiant
            });
        });
}

export const logout = (req, res) => {
    req.session.destroy();
    res.send({ message: "Vous êtes déconnecté" });
}