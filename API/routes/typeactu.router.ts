import {Router} from "express";
const router = Router();

import typeactuController from "../controllers/typeactu.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get('/', typeactuController.getTypeActus);
/**
 * @swagger
 * /typeactu:
 *   get:
 *     summary: Récupère tous les types d'actualité
 *     tags:
 *       - Type Actu
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/:id', typeactuController.getTypeActuById);
/**
 * @swagger
 * /typeactu/{id}:
 *   get:
 *     summary: Récupère un type d'actualité par son id
 *     tags:
 *       - Type Actu
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
router.post('/', [authJwt.verifyToken], typeactuController.createTypeActu);
/**
 * @swagger
 *   /typeactu:
 *   post:
 *     summary: Créer un type d'actualité
 *     tags:
 *       - Type Actu
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
 *                 description: "Libellé du type d'actualité"
 *               couleur:
 *                 type: string
 *                 example: "#000000"
 *                 description: La couleur du type d'actualité
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
router.put('/:id', [authJwt.verifyToken], typeactuController.editTypeActu);
/**
 * @swagger
 *   /typeactu/{id}:
 *   put:
 *     summary: Met à jour un type d'actualité
 *     tags:
 *       - Type Actu
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
 *                 description: Le nom du type d'actualité
 *               couleur:
 *                 type: string
 *                 example: "#000000"
 *                 description: La couleur du type d'actualité
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
router.delete('/', [authJwt.verifyToken, verifyConnected.checkAdmin], typeactuController.deleteTypeActus);
/**
 * @swagger
 * /typeactu:
 *   delete:
 *     summary: Supprime tous les types d'actualité
 *     tags:
 *       - Type Actu
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

router.delete('/:id', [authJwt.verifyToken, verifyConnected.checkAdmin], typeactuController.deleteTypeActuById);
/**
 * @swagger
 * /typeactu/{id}:
 *   delete:
 *     summary: Supprime un type d'actualité par son id
 *     tags:
 *       - Type Actu
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