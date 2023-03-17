import {Router} from "express";
const router = Router();

import standController from "../controllers/stand.controller";

router.get("/", standController.getStands);
router.get("/:id", standController.getStandById);
router.post("/", standController.createStand);
router.put("/:id", standController.editStand);
router.delete("/", standController.deleteStands);
router.delete("/:id", standController.deleteStandById);

export default router;