import {db} from '../models/index.js';
const Notification = db.notification;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.body.message) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const notification = {
        message: req.body.message,
        date_envoi: req.body.date_envoi
    };
    
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
    const message = req.query.message;

    Notification.findAll()
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
    const id = req.params.id;

    Notification.update(req.body, {
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
            res.status(500).send({
                message: "Error updating Notification with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
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