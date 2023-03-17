import {Router} from "express";
const router = Router();

import roleController from "../controllers/role.controller";

router.get("/", roleController.getRoles);
router.get("/:id", roleController.getRoleById);
router.post("/", roleController.createRole);
router.put("/:id", roleController.editRole);
router.delete("/", roleController.deleteRoles);
router.delete("/:id", roleController.deleteRoleById);

export default router;