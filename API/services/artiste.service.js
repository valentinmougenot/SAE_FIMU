import { Artiste, AbstractArtiste } from "../models/artiste.model.js";
import fs from "fs";

export default class FSArtiste extends AbstractArtiste {
    async list(callback) {
        const artistes = await this.readAllArtistes();
        if (artistes.length == 0) {
            return callback([]);
        }
        let results = [];
        artistes.forEach((artiste) => {
            results.push(artiste.JSON);
        });
        return callback(null, results);
    }

    async getArtisteById(id, callback) {
        const artistes = await this.readAllArtistes();
         if (artistes.length == 0) {
            return callback([]);
        }
        let result = null;
        artistes.forEach((artiste) => {
            if (artiste.id == id) {
                result = artiste.JSON;
            }
        });
        if (result == null) {
            console.log("Does not exist");
            return callback([]);
        }
        return callback(null, result);
    }

    async readAllArtistes() {
        try {
            const dataBuffer = fs.readFileSync("artistes.json");
            let dataJSON = dataBuffer.toString();
            dataJSON = JSON.parse(dataJSON);
            const artistes = [];
            dataJSON.forEach((artiste) => {
                artistes.push(Artiste.fromJSON(artiste));
            });
            return artistes;
        }
        catch(e) {
            console.log(e);
            return [];
        }
    }
}