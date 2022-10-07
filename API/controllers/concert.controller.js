import {default as FSConcert} from "../services/concert.service.js";

export const list = (req, res) => {
    let service = new FSConcert();
    service.list((error, results) => {
        if (error) {
            res.status(400).send(error);
        }
        return res.status(200).send(results);
    })
}

export const findID = (req, res) => {
    const id = req.params.id;
    let service = new FSConcert();
    service.getConcertById(id, (error, results) => {
        if (error) {
            res.status(400).send(error);
        }
        return res.status(200).send(results);
    })
}
