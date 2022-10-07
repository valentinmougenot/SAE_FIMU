const _artiste_id = Symbol('id');
const _artiste_nom = Symbol('nom');
const _artiste_photo = Symbol('photo');
const _artiste_biographie = Symbol('biographie');
const _artiste_lien_video = Symbol('lien_video');
const _nationalite_id = Symbol('nationalite_id');
const _genre_id = Symbol('genre_id');

export class Artiste {
    //CONSTRUCTEUR
    constructor(id, nom, photo, biographie, lien_video, nationalite_id, genre_id) {
        this[_artiste_id] = id;
        this[_artiste_nom] = nom;
        this[_artiste_photo] = photo;
        this[_artiste_biographie] = biographie;
        this[_artiste_lien_video] = lien_video;
        this[_nationalite_id] = nationalite_id;
        this[_genre_id] = genre_id;
    }

    //GETTERS AND SETTERS
    get id() {
        return this[_artiste_id];
    }

    set id(value) {
        this[_artiste_id] = value;
    }

    get nom() {
        return this[_artiste_nom];
    }

    set nom(value) {
        this[_artiste_nom] = value;
    }

    get photo() {
        return this[_artiste_photo];
    }

    set photo(value) {
        this[_artiste_photo] = value;
    }

    get biographie() {
        return this[_artiste_biographie];
    }

    set biographie(value) {
        this[_artiste_biographie] = value;
    }

    get lien_video() {
        return this[_artiste_lien_video];
    }

    set lien_video(value) {
        this[_artiste_lien_video] = value;
    }

    get nationalite_id() {
        return this[_nationalite_id];
    }

    set nationalite_id(value) {
        this[_nationalite_id] = value;
    }

    get genre_id() {
        return this[_genre_id];
    }

    set genre_id(value) {
        this[_genre_id] = value;
    }

    get JSON() {
        return {
            id: this.id,
            nom: this.nom,
            photo: this.photo,
            biographie: this.biographie,
            lien_video: this.lien_video,
            nationalite_id: this.nationalite_id,
            genre_id: this.genre_id
        }
    }

    static fromJSON(json) {
        const data = JSON.parse(JSON.stringify(json));
        if (typeof data !== 'object'
            || !data.hasOwnProperty("id")
            || (typeof data.id !== 'string' && typeof data.id !== 'number')
            || !data.hasOwnProperty("nom")
            || typeof data.nom !== 'string'
            || !data.hasOwnProperty("photo")
            || typeof data.photo !== 'string'
            || !data.hasOwnProperty("biographie")
            || typeof data.biographie !== 'string'
            || !data.hasOwnProperty("lien_video")
            || typeof data.lien_video !== 'string'
            || !data.hasOwnProperty("nationalite_id")
            || (typeof data.nationalite_id !== 'string' && typeof data.nationalite_id !== 'number')
            || !data.hasOwnProperty("genre_id")
            || (typeof data.genre_id !== 'string' && typeof data.genre_id !== 'number')) {
            throw new Error(`Not an artist: ${json}`);
        }
        return new Artiste(data.id, data.nom, data.photo, data.biographie, data.lien_video, data.nationalite_id, data.genre_id);
    }

}

export class AbstractArtiste {

}
