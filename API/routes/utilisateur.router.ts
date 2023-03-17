import {Router} from "express";
const router = Router();

import utilisateurController from "../controllers/utilisateur.controller";

router.get("/", utilisateurController.getUtilisateurs);
router.get("/:id", utilisateurController.getUtilisateurById);
router.post("/", utilisateurController.createUtilisateur);
router.put("/:id", utilisateurController.editUtilisateur);
router.delete("/", utilisateurController.deleteUtilisateurs);
router.delete("/:id", utilisateurController.deleteUtilisateurById);

export default router;