import {Router} from "express";
const router = Router();

import serviceController from "../controllers/service.controller";

router.get("/", serviceController.getServices);
router.get("/:id", serviceController.getServiceById);
router.post("/", serviceController.createService);
router.put("/:id", serviceController.editService);
router.delete("/", serviceController.deleteServices);
router.delete("/:id", serviceController.deleteServiceById);

export default router;