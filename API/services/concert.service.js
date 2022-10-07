import { Concert, AbstractConcert } from "../models/concert.model.js";
import fs from "fs";

export default class FSConcert extends AbstractConcert {
    async list(callback) {
        const concerts = await this.readAllConcerts();
        if (concerts.length == 0) {
            return callback([]);
        }
        let results = [];
        concerts.forEach((concert) => {
            results.push(concert.JSON);
        });
        return callback(null, results);
    }

    async getConcertById(id, callback) {
        const concerts = await this.readAllConcerts();
        if (concerts.length == 0) {
            return callback([]);
        }
        let results = null;
        concerts.forEach((concert) => {
            if (concert.scene_id == id) {
                results = concert.JSON;
            }
        });
        if (results == null) {
            console.log("Does not exist");
            return callback([]);
        }
        return callback(null, results);
    }

    async readAllConcerts() {
        try {
            const dataBuffer = fs.readFileSync("concerts.json");
            let dataJSON = dataBuffer.toString();
            dataJSON = JSON.parse(dataJSON);
            const concerts = [];
            dataJSON.forEach((concert) => {
                concerts.push(Concert.fromJSON(concert));
            });
            return concerts;
        }
        catch(e) {
            console.log(e);
            return [];
        }
    }
}