const _scene_id = Symbol('id');
const _scene_nom = Symbol('nom');
const _scene_jauge = Symbol('jauge');
const _scene_lattitude = Symbol('lattitude');
const _scene_longitude = Symbol('longitude');

export class Scene {
    //CONSTRUCTEUR
    constructor(id, nom, jauge, lattitude, longitude) {
        this[_scene_id] = id;
        this[_scene_nom] = nom;
        this[_scene_jauge] = jauge;
        this[_scene_lattitude] = lattitude;
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

    get lattitude() {
        return this[_scene_lattitude];
    }

    set lattitude(value) {
        this[_scene_lattitude] = value;
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
            lattitude: this.lattitude,
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
        || !data.hasOwnProperty('lattitude')
        || typeof data.lattitude !== 'number'
        || !data.hasOwnProperty('longitude')
        || typeof data.longitude !== 'number') {
            throw new Error('Invalid JSON');
        }
        return new Scene(data.id, data.nom, data.jauge, data.lattitude, data.longitude);
    }

}

export class AbstractScene{}