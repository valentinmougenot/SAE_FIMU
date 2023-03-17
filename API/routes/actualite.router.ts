import {Router} from "express";
const router = Router();

import actualiteController from "../controllers/actualite.controller";

router.get('/', actualiteController.getActualites);
router.get('/:id', actualiteController.getActualiteById);
router.post('/', actualiteController.createActualite);
router.put('/:id', actualiteController.editActualite);
router.delete('/', actualiteController.deleteActualites);
router.delete('/:id', actualiteController.deleteActualiteById);

export default router;