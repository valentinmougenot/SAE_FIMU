const _artiste_id = Symbol('artiste_id');
const _scene_id = Symbol('scene_id');
const _date_debut = Symbol('date_debut');
const _duree = Symbol('duree');

export class Concert {
    //CONSTRUCTEUR
    constructor(artiste_id, scene_id, date_debut, duree) {
        this[_artiste_id] = artiste_id;
        this[_scene_id] = scene_id;
        this[_date_debut] = date_debut;
        this[_duree] = duree;
    }

    //GETTERS AND SETTERS
    get artiste_id() {
        return this[_artiste_id];
    }

    set artiste_id(value) {
        this[_artiste_id] = value;
    }

    get scene_id() {
        return this[_scene_id];
    }

    set scene_id(value) {
        this[_scene_id] = value;
    }

    get date_debut() {
        return this[_date_debut];
    }

    set date_debut(value) {
        this[_date_debut] = value;
    }

    get duree() {
        return this[_duree];
    }

    set duree(value) {
        this[_duree] = value;
    }

    get JSON() {
        return {
            artiste_id: this.artiste_id,
            scene_id: this.scene_id,
            date_debut: this.date_debut,
            duree: this.duree
        }
    }

    static fromJSON(json) {
        const data = JSON.parse(JSON.stringify(json));
        if (typeof data !== 'object'
        || !data.hasOwnProperty('artiste_id')
        || (typeof data.artiste_id !== 'number' && typeof data.artiste_id !== 'string')
        || !data.hasOwnProperty('scene_id')
        || (typeof data.scene_id !== 'number' && typeof data.scene_id !== 'string')
        || !data.hasOwnProperty('duree')
        || typeof data.duree !== 'number'
        || !data.hasOwnProperty('date_debut')
        || typeof data.date_debut !== 'string') {
            throw new Error('Invalid JSON');
        }
        return new Concert(data.artiste_id, data.scene_id, data.date_debut, data.duree);
    }

}

export class AbstractConcert {}