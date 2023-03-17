import {Router} from "express";
const router = Router();

import typeactuController from "../controllers/typeactu.controller";

router.get('/', typeactuController.getTypeActus);
router.get('/:id', typeactuController.getTypeActuById);
router.post('/', typeactuController.createTypeActu);
router.put('/:id', typeactuController.editTypeActu);
router.delete('/', typeactuController.deleteTypeActus);
router.delete('/:id', typeactuController.deleteTypeActuById);

export default router;