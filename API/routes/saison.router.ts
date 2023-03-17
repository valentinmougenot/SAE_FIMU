import {Router} from "express";
const router = Router();

import saisonController from "../controllers/saison.controller";

router.get("/", saisonController.getSaisons);
router.get("/:id", saisonController.getSaisonById);
router.post("/", saisonController.createSaison);
router.post('/migrate-data', saisonController.migrateData);
router.put("/:id", saisonController.editSaison);
router.delete("/", saisonController.deleteSaisons);
router.delete("/:id", saisonController.deleteSaisonById);

export default router;