import {Router} from "express";
const router = Router();

import concertController from "../controllers/concert.controller";

router.get('/', concertController.getConcerts);
router.get('/date', concertController.getDates);
router.get('/heuremin', concertController.getHeureMin);
router.get('/heuremax', concertController.getHeureMax);
router.get('/:id', concertController.getConcertById);
router.post('/', concertController.createConcert);
router.put('/:id', concertController.editConcert);
router.delete('/', concertController.deleteConcerts);
router.delete('/:id', concertController.deleteConcertById);

export default router;