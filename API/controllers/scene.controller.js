import {default as FSScene} from "../services/scene.service.js";

export const list = (req, res) => {
    let service = new FSScene();
    service.list((error, results) => {
        if (error) {
            res.status(400).send(error);
        }
        return res.status(200).send(results);
    })
}


export const findID = (req, res) => {
    const id = req.params.id;
    let service = new FSScene();
    service.getSceneById(id, (error, results) => {
        if (error) {
            res.status(400).send(error);
        }
        return res.status(200).send(results);
    })
}

