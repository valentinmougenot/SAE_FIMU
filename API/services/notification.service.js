import {Notification, AbstractNotification} from "../models/notification.model.js"
import fs from "fs"


export default class FSNotification extends AbstractNotification {
    
    async readAllNotification() {
        try {
            const dataBuffer = fs.readFileSync("notification.json")
            let dataJSON = dataBuffer.toString();
            dataJSON = JSON.parse(dataJSON);
            const notifications = [];
            dataJSON.forEach( (notification) => {
                notifications.push(Notification.fromJSON(notification))
            });
            return notifications;
        } catch (e) {
            console.log("error readAllNotification");
            return [];
        }
    }
    
    async list(callback) {
        const notifs = await this.readAllNotification();
        if (notifs.length == 0){
            return callback([]);
        }
        let result = [];
        notifs.forEach( (notif) => {
            result.push(notif.JSON);
        } )
        if (result.length == 0){
            console.log("Does not exist");
            return callback([]);
        }   
        return callback(null, result)
    }

    async getNotifByID(id, callback) {
        const notifs = await this.readAllNotification();
        if (notifs.length == 0){
            return callback([]);
        }

        let result = null;
        notifs.forEach( (notif) => {
            if (notif.id == id) {
                result = notif.JSON;
            }
        })
        if (result == null){
            console.log("Does not exist");
            return callback([]);
        }
        
        return callback(null, result);
    }


}