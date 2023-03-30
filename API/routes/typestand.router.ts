import {Router} from "express";
const router = Router();

import typestandController from "../controllers/typestand.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get("/", typestandController.getTypeStands);
/**
 * @swagger
 * /typestand:
 *   get:
 *     summary: Récupère tous les stands
 *     tags:
 *       - Type Stand
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/:id", typestandController.getTypeStandById);
/**
 * @swagger
 * /typestand/{id}:
 *   get:
 *     summary: Récupère un stand par son id
 *     tags:
 *       - Type Stand
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
router.post("/", [authJwt.verifyToken], typestandController.createTypeStand);
/**
 * @swagger
 *   /typestand:
 *   post:
 *     summary: Créer un stand
 *     tags:
 *       - Type Stand
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
 *                 example: "stand1"
 *                 description: "Libellé du stand"
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
router.put("/:id", [authJwt.verifyToken], typestandController.editTypeStand);
/**
 * @swagger
 *   /typestand/{id}:
 *   put:
 *     summary: Met à jour un stand
 *     tags:
 *       - Type Stand
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
 *                 example: "stand1"
 *                 description: Le nom du stand
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
router.delete("/", [authJwt.verifyToken, verifyConnected.checkAdmin], typestandController.deleteTypeStands);
/**
 * @swagger
 * /typestand:
 *   delete:
 *     summary: Supprime tous les stands
 *     tags:
 *       - Type Stand
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
router.delete("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], typestandController.deleteTypeStandById);
/**
 * @swagger
 * /typestand/{id}:
 *   delete:
 *     summary: Supprime un stand par son id
 *     tags:
 *       - Type Stand
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