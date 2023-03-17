import {Router} from "express";
const router = Router();

import sceneController from "../controllers/scene.controller";

router.get("/", sceneController.getScenes);
router.get("/:id", sceneController.getSceneById);
router.post("/", sceneController.createScene);
router.put("/:id", sceneController.editScene);
router.delete("/", sceneController.deleteScenes);
router.delete("/:id", sceneController.deleteSceneById);

export default router;