import {Router} from "express";
const router = Router();

import paysController from "../controllers/pays.controller";

router.get('/', paysController.getPays);
router.get('/:id', paysController.getPaysById);
router.post('/', paysController.createPays);
router.put('/:id', paysController.editPays);
router.delete('/', paysController.deletePays);
router.delete('/:id', paysController.deletePaysById);

export default router;