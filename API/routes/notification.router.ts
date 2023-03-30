import {Router} from "express";
const router = Router();

import notificationController from "../controllers/notification.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get("/", notificationController.getNotifications);
/**
 * @swagger
 * /notification:
 *   get:
 *     summary: Récupère toutes les notifications
 *     tags:
 *       - Notifications
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */

router.get("/:id", notificationController.getNotificationById);
/**
 * @swagger
 * /notification/{id}:
 *   get:
 *     summary: Récupère une notification par son id
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           example: 1
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: Notification non trouvée
 *       '500':
 *         description: Erreur interne du serveur
 */

router.post("/", [authJwt.verifyToken], notificationController.createNotification);
/**
 * @swagger
 * /notification:
 *   post:
 *     summary: Crée une nouvelle notification
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date_envoi:
 *                 type: string
 *                 format: date
 *                 description: La date d'envoi de la notification
 *               heure_envoi:
 *                 type: string
 *                 description: L'heure d'envoi de la notification
 *               message:
 *                 type: string
 *                 description: Le contenu de la notification
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Erreur de validation
 *       '401':
 *         description: Non autorisé
 *       '500':
 *         description: Erreur interne du serveur
 */

router.put("/:id", [authJwt.verifyToken], notificationController.editNotification);
/**
 * @swagger
 *   /notification/{id}:
 *   put:
 *     summary: Met à jour une notification
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date_envoi:
 *                 type: string
 *                 example: "2023-03-27"
 *                 description: La date d'envoi de la notification
 *               heure_envoi:
 *                 type: string
 *                 example: "10:30"
 *                 description: L'heure d'envoi de la notification
 *               message:
 *                 type: string
 *                 example: "Nouvelle notification"
 *                 description: Le message de la notification
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Erreur de validation
 *       '401':
 *         description: Non autorisé
 *       '500':
 *         description: Erreur interne du serveur
 */

router.delete("/", [authJwt.verifyToken, verifyConnected.checkAdmin], notificationController.deleteNotifications);
/**
 * @swagger
 *   /notification:
 *     delete:
 *       summary: Supprime toutes les notifications
 *       tags:
 *         - Notifications
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: OK
 *         '401':
 *           description: Non autorisé
 *         '500':
 *           description: Erreur interne du serveur
 */
router.delete("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], notificationController.deleteNotificationById);
/**
 * @swagger
 * /notification/{id}:
 *   delete:
 *     summary: Supprime une notification par son id
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           example: 1
 *     responses:
 *       '200':
 *         description: OK
 *       '401':
 *         description: Non autorisé
 *       '500':
 *         description: Erreur interne du serveur
 */

export default router;