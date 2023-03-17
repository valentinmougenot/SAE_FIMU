import {Router} from "express";
const router = Router();

import categorieController from "../controllers/categorie.controller";

router.get("/", categorieController.getCategories);
router.get("/:id", categorieController.getCategorieById);
router.post("/", categorieController.createCategorie);
router.put("/:id", categorieController.editCategorie);
router.delete("/", categorieController.deleteCategories);
router.delete("/:id", categorieController.deleteCategorieById);

export default router;