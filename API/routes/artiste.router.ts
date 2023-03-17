import { Router } from "express";
const router = Router();

import artisteController from "../controllers/artiste.controller";

router.get("/", artisteController.getArtistes);
router.get("/:id", artisteController.getArtisteById);
router.post("/", artisteController.createArtiste);
router.put("/:id", artisteController.editArtiste);
router.delete("/", artisteController.deleteArtistes);
router.delete("/:id", artisteController.deleteArtisteById);

export default router;