import {Request, Response} from "express";
import {dbCommon} from "../models";

const getNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await dbCommon.notifications.findAll();

        const response = {
            error: 0,
            data: notifications
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération des notifications."
        });
    }
}

const getNotificationById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const notification = await dbCommon.notifications.findOne({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: notification
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la récupération de la notification."
        });
    }
}

const createNotification = async (req: Request, res: Response) => {
    try {
        const notification = await dbCommon.notifications.create(req.body);

        const response = {
            error: 0,
            data: notification
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la création de la notification."
        });
    }
}

const editNotification = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const notification = await dbCommon.notifications.update(req.body, {
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: notification
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la modification de la notification."
        });
    }
}

const deleteNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await dbCommon.notifications.destroy({
            where: {}
        });

        const response = {
            error: 0,
            data: notifications
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression des notifications."
        });
    }
}

const deleteNotificationById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const notification = await dbCommon.notifications.destroy({
            where: {
                id
            }
        });

        const response = {
            error: 0,
            data: notification
        }

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 1,
            message: "Une erreur est survenue lors de la suppression de la notification."
        });
    }
}

export default {
    getNotifications,
    getNotificationById,
    createNotification,
    editNotification,
    deleteNotifications,
    deleteNotificationById
}