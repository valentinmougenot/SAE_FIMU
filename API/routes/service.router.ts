import {Router} from "express";
const router = Router();

import serviceController from "../controllers/service.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get("/", serviceController.getServices);
/**
 * @swagger
 * /service:
 *   get:
 *     summary: Récupère tous les services
 *     tags:
 *       - Services
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */

router.get("/:id", serviceController.getServiceById);
/**
 * @swagger
 * /service/{id}:
 *   get:
 *     summary: Récupère un service par son id
 *     tags:
 *       - Services
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
 *         description: Genre non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */

router.post("/", [authJwt.verifyToken], serviceController.createService);
/**
 * @swagger
 *   /service:
 *   post:
 *     summary: Créer un service
 *     tags:
 *       - Services
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *                 example: "service1"
 *                 description: "Libellé du service"
 *     responses:
 *     '200':
 *       description: OK
 *     '400':
 *       description: Erreur de validation
 *     '401':
 *       description: Non autorisé
 *     '500':
 *       description: Erreur interne du serveur
 */

router.put("/:id", [authJwt.verifyToken], serviceController.editService);
/**
 * @swagger
 *   /service/{id}:
 *   put:
 *     summary: Met à jour un service
 *     tags:
 *       - Services
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
 *               libelle:
 *                 type: string
 *                 example: "service1"
 *                 description: Le nom du service
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

router.delete("/", [authJwt.verifyToken, verifyConnected.checkAdmin], serviceController.deleteServices);
/**
 * @swagger
 * /service:
 *   delete:
 *     summary: Supprime tous les services
 *     tags:
 *       - Services
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '401':
 *         description: Non autorisé
 *       '500':
 *         description: Erreur interne du serveur
 */

router.delete("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], serviceController.deleteServiceById);
/**
 * @swagger
 * /service/{id}:
 *   delete:
 *     summary: Supprime un service par son id
 *     tags:
 *       - Services
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