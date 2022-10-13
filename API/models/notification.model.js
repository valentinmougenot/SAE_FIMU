const _notification_id = Symbol('id');
const _notification_dateHeure = Symbol('dateHeure');
const _notification_message = Symbol('message');

export class Notification {
    //CONSTRUCTEUR
    constructor(id, dateHeure, message) {
        this[_notification_id] = id;
        this[_notification_dateHeure] = dateHeure;
        this[_notification_message] = message;
    }
    
    //GETTERS AND SETTERS
    get id() {
        return this[_notification_id];
    }

    set id(value) {
        this[_notification_id] = value;
    }

    get dateHeure() {
        return this[_notification_dateHeure];
    }

    set dateHeure(value) {
        this[_notification_dateHeure] = value;
    }

    get message() {
        return this[_notification_message];
    }

    set message(value) {
        this[_notification_message] = value;
    }

    get JSON() {
        return {
            id: this.id,
            dateHeure: this.dateHeure,
            message: this.message
        }
    }

    static fromJSON(json) {
        const data = JSON.parse(JSON.stringify(json));

        if (typeof data !== 'object' 
            || !data.hasOwnProperty('id')
            || (typeof data.id !== 'number' && typeof data.id !== 'string')
            || !data.hasOwnProperty('dateHeure')
            || typeof data.dateHeure !== ('string')
            || !data.hasOwnProperty('message')
            || typeof data.message !== ('string')
            ){
                throw new Error('Invalid JSON')
            }
        return new Notification(data.id, data.dateHeure, data.message)
    }
}
export class AbstractNotification{}

