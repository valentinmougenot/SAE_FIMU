import {Router} from "express";
const router = Router();

import typestandController from "../controllers/typestand.controller";

router.get("/", typestandController.getTypeStands);
router.get("/:id", typestandController.getTypeStandById);
router.post("/", typestandController.createTypeStand);
router.put("/:id", typestandController.editTypeStand);
router.delete("/", typestandController.deleteTypeStands);
router.delete("/:id", typestandController.deleteTypeStandById);

export default router;