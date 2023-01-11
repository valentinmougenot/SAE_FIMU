import {db} from '../models/index.js';
const Notification = db.notification;
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer une notification"
        });
        return;
    }
    
    const notification = {
        message: req.body.message,
        heure_envoi: req.body.heure_envoi,
        date_envoi: req.body.date_envoi
    };

    if (notification.date_envoi == null) {
        notification.date_envoi = Sequelize.fn('NOW');
    }
    if (notification.heure_envoi == null) {
        notification.heure_envoi = Sequelize.fn('NOW');
    }
    
    Notification.create(notification)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Notification."
            });
        });
}

export const findAll = (req, res) => {
    Notification.findAll({
        order: [['date_envoi', 'DESC'], ['heure_envoi', 'DESC']]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving notifications."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    Notification.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Notification with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier une notification"
        });
        return;
    }
    
    const id = req.params.id;

    const notification = {
        message: req.body.message,
        heure_envoi: req.body.heure_envoi,
        date_envoi: req.body.date_envoi
    };

    if (notification.date_envoi == null) {
        notification.date_envoi = Sequelize.fn('NOW');
    }
    if (notification.heure_envoi == null) {
        notification.heure_envoi = Sequelize.fn('NOW');
    }

    Notification.update(notification, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Notification was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Notification with id=${id}. Maybe Notification was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error updating Notification with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer une notification"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer une notification"
        });
        return;
    }
    
    const id = req.params.id;

    Notification.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Notification was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Notification with id=${id}. Maybe Notification was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Notification with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer toutes les notifications"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer toutes les notifications"
        });
        return;
    }
    
    Notification.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Notifications were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all notifications."
            });
        });
}