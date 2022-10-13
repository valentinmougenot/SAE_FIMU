import {default as FSNotification} from "../services/notification.service.js"


export const list = (req, res) => {
    let service = new FSNotification();
    service.list((error, results) => {
        if (error) {
            res.status(400).send(error);
        }
        return res.status(200).send(results);
    })
}

export const findID = (req, res) => {
    const id = req.params.id;
    let service = new FSNotification();
    service.getNotifByID(id, (error, results) => {
        if (error) {
            res.status(400).send(error);
        }
        return res.status(200).send(results);
    })
}