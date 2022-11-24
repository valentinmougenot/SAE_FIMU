import {db} from "../models/index.js";
const Utilisateur = db.utilisateur;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.body.identifiant) {
        res.status(400).send({
            message: "Content can not be empty!"
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
    const identifiant = req.query.identifiant;

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
    const id = req.params.id;
    console.log(req.body);

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

export const home = (req, res) => {
    let session = req.session;
    if (session.identifiant) {
        res.flash('success', `Welcome back ${session.identifiant}!`);
        res.redirect('/');
    } 
    else {
        res.render('home', {title: 'Home'});
    }
}

export const login = (req, res) => {
    let session = req.session;
    if (session.identifiant) {
        res.flash('success', `Welcome back ${session.identifiant}!`);
        res.redirect('/');
    } 
    else {
        res.render('login', {title: 'Login'});
    }
}

export const logout = (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.redirect('/');
        }
        res.clearCookie(SESS_NAME);
        res.redirect('/');
    });
}

export const authenticate = (req, res) => {
    let session = req.session;
    const identifiant = req.body.identifiant;
    const mot_de_passe = req.body.mot_de_passe;
    Utilisateur.findOne({
        where: {
            identifiant: identifiant,
            mot_de_passe: mot_de_passe
        },
        include: [
            {model: db.role}
        ]
    })
        .then(data => {
            if (data) {
                session.identifiant = data.identifiant;
                session.mot_de_passe = data.mot_de_passe;
                session.id_role = data.id_role;
                session.role = data.role.libelle;
                res.flash('success', `Welcome ${session.identifiant}!`);
                res.redirect('/');
            } 
            else {
                res.flash('error', 'Invalid credentials!');
                res.redirect('/login');
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Utilisateur with id=" + id
            });
        });
}