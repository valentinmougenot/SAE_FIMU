import {Router} from "express";
const router = Router();

import notificationController from "../controllers/notification.controller";

router.get("/", notificationController.getNotifications);
router.get("/:id", notificationController.getNotificationById);
router.post("/", notificationController.createNotification);
router.put("/:id", notificationController.editNotification);
router.delete("/", notificationController.deleteNotifications);
router.delete("/:id", notificationController.deleteNotificationById);

export default router;