import {Router} from "express";
const router = Router();

import typesceneController from "../controllers/typescene.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get("/", typesceneController.getTypeScenes);
/**
 * @swagger
 * /typescene:
 *   get:
 *     summary: Récupère tous les types de scène
 *     tags:
 *       - Type Scène
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/:id", typesceneController.getTypeSceneById);
/**
 * @swagger
 * /typescene/{id}:
 *   get:
 *     summary: Récupère un type de scène par son id
 *     tags:
 *       - Type Scène
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
router.post("/", [authJwt.verifyToken], typesceneController.createTypeScene);
/**
 * @swagger
 *   /typescene:
 *   post:
 *     summary: Créer un type de scène
 *     tags:
 *       - Type Scène
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
 *                 description: "Libellé du type de scène"
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
router.put("/:id", [authJwt.verifyToken], typesceneController.editTypeScene);
/**
 * @swagger
 *   /typescene/{id}:
 *   put:
 *     summary: Met à jour un type de scène
 *     tags:
 *       - Type Scène
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
 *                 description: Le nom du type de scène
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
router.delete("/", [authJwt.verifyToken, verifyConnected.checkAdmin], typesceneController.deleteTypeScenes);
/**
 * @swagger
 * /typescene:
 *   delete:
 *     summary: Supprime tous les types de scène
 *     tags:
 *       - Type Scène
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
router.delete("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], typesceneController.deleteTypeSceneById);
/**
 * @swagger
 * /typescene/{id}:
 *   delete:
 *     summary: Supprime un type de scène par son id
 *     tags:
 *       - Type Scène
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