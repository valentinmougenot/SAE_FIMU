/*const _scene_id = Symbol('id');
const _scene_nom = Symbol('nom');
const _scene_jauge = Symbol('jauge');
const _scene_latitude = Symbol('latitude');
const _scene_longitude = Symbol('longitude');

export class Scene {
    //CONSTRUCTEUR
    constructor(id, nom, jauge, latitude, longitude) {
        this[_scene_id] = id;
        this[_scene_nom] = nom;
        this[_scene_jauge] = jauge;
        this[_scene_latitude] = latitude;
        this[_scene_longitude] = longitude;
    }

    //GETTERS AND SETTERS
    get id() {
        return this[_scene_id];
    }

    set id(value) {
        this[_scene_id] = value;
    }

    get nom() {
        return this[_scene_nom];
    }

    set nom(value) {
        this[_scene_nom] = value;
    }

    get jauge() {
        return this[_scene_jauge];
    }

    set jauge(value) {
        this[_scene_jauge] = value;
    }

    get latitude() {
        return this[_scene_latitude];
    }

    set latitude(value) {
        this[_scene_latitude] = value;
    }

    get longitude() {
        return this[_scene_longitude];
    }

    set longitude(value) {
        this[_scene_longitude] = value;
    }

    get JSON() {
        return {
            id: this.id,
            nom: this.nom,
            jauge: this.jauge,
            latitude: this.latitude,
            longitude: this.longitude
        };
    }

    static fromJSON(json) {
        const data = JSON.parse(JSON.stringify(json));
        if (typeof data !== 'object'
        || !data.hasOwnProperty('id')
        || (typeof data.id !== 'number' && typeof data.id !== 'string')
        || !data.hasOwnProperty('nom')
        || typeof data.nom !== 'string'
        || !data.hasOwnProperty('jauge')
        || typeof data.jauge !== 'number'
        || !data.hasOwnProperty('latitude')
        || typeof data.latitude !== 'number'
        || !data.hasOwnProperty('longitude')
        || typeof data.longitude !== 'number') {
            throw new Error('Invalid JSON');
        }
        return new Scene(data.id, data.nom, data.jauge, data.latitude, data.longitude);
    }

}

export class AbstractScene{}*/

export const scene = (sequelize, Sequelize) => {
    const Scene = sequelize.define('scene', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelle: {
            type: Sequelize.STRING
        },
        jauge: {
            type: Sequelize.INTEGER
        },
        latitude: {
            type: Sequelize.FLOAT
        },
        longitude: {
            type: Sequelize.FLOAT
        },
        id_typescene: {
            type: Sequelize.INTEGER,
            references: {
                model: 'typescene',
                key: 'id'
            }
        }
    });

    return Scene;
}