import {Router} from "express";
const router = Router();

import typesceneController from "../controllers/typescene.controller";

router.get("/", typesceneController.getTypeScenes);
router.get("/:id", typesceneController.getTypeSceneById);
router.post("/", typesceneController.createTypeScene);
router.put("/:id", typesceneController.editTypeScene);
router.delete("/", typesceneController.deleteTypeScenes);
router.delete("/:id", typesceneController.deleteTypeSceneById);

export default router;