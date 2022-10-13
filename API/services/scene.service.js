import { Scene, AbstractScene } from "../models/scene.model.js";
import fs from "fs";

export default class FSScene extends AbstractScene {
    async list(callback) {
        const scenes = await this.readAllScenes();
        if (scenes.length == 0) {
            return callback([]);
        }
        let results = [];
        scenes.forEach((scene) => {
            results.push(scene.JSON);
        });

        if(result.length == 0){
            console.log("Does not exist");
            return callback([]);
        }
        return callback(null, results);
    }

    async getSceneById(id, callback) {
        const scenes = await this.readAllScenes();
        if (scenes.length == 0) {
            return callback([]);
        }
        let result = null;
        scenes.forEach((scene) => {
            if (scene.id == id) {
                result = scene.JSON;
            }
        });
        if (result == null) {
            console.log("Does not exist");
            return callback([]);
        }
        return callback(null, result);
    }

    async readAllScenes() {
        try {
            const dataBuffer = fs.readFileSync("scenes.json");
            let dataJSON = dataBuffer.toString();
            dataJSON = JSON.parse(dataJSON);
            const scenes = [];
            dataJSON.forEach((scene) => {
                scenes.push(Scene.fromJSON(scene));
            });
            return scenes;
        }
        catch(e) {
            console.log(e);
            return [];
        }
    }
}