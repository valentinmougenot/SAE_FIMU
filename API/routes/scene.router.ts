import {Router} from "express";
const router = Router();

import sceneController from "../controllers/scene.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get("/", sceneController.getScenes);
/**
 * @swagger
 *   /scene:
 *   get:
 *     summary: Récupère toutes les scènes
 *     tags:
 *       - Scènes
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut récupérer les scènes (current ou next).
 *           example: "next"
 *       - in: query
 *         name: libelle
 *         schema:
 *           type: string
 *           required: false
 *           description: Le libellé de la scène à rechercher.
 *           example: "scene1"
 *       - in: query
 *         name: incTs
 *         schema:
 *           type: boolean
 *           required: false
 *           description: Indique si l'on ne veut pas récupérer les types de scènes (false).
 *           example: false
 *     responses:
 *       200:
 *         description: La liste des scènes.
 *       500:
 *         description: Une erreur est survenue lors de la récupération des scènes.
 *
 */
router.get("/:id", sceneController.getSceneById);
/**
 * @swagger
 *   /scene/{id}:
 *   get:
 *     summary: Récupère une scène par son id
 *     tags:
 *       - Scènes
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut récupérer la scène (current ou next).
 *           example: "next"
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id de la scène à récupérer.
 *           example: 1
 *       - in: query
 *         name: incTs
 *         schema:
 *           type: boolean
 *           required: false
 *           description: Indique si l'on ne veut pas récupérer les types de scènes (false).
 *           example: false
 *     responses:
 *       200:
 *         description: La scène.
 *       500:
 *         description: Une erreur est survenue lors de la récupération de la scène.
 */

router.post("/", [authJwt.verifyToken], sceneController.createScene);
/**
 * @swagger
 *   /scene:
 *   post:
 *     summary: Crée une scène
 *     tags:
 *       - Scènes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut créer la scène (current ou next).
 *           example: "next"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *                 example: "scene1"
 *                 description: Le libellé de la scène.
 *               jauge:
 *                 type: integer
 *                 example: 100
 *                 description: La jauge de la scène (intérieur).
 *               latitude:
 *                 type: number
 *                 example: 48.856614
 *                 description: La latitude de la scène.
 *               longitude:
 *                 type: number
 *                 example: 2.3522219
 *                 description: La longitude de la scène.
 *               typesceneId:
 *                 type: integer
 *                 example: 1
 *                 description: L'id du type de scène.
 *     responses:
 *       200:
 *         description: La scène créée.
 *       500:
 *         description: Une erreur est survenue lors de la création de la scène.
 */
router.put("/:id", [authJwt.verifyToken], sceneController.editScene);
/**
 * @swagger
 *   /scene/{id}:
 *   put:
 *     summary: Modifie une scène
 *     tags:
 *       - Scènes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut modifier la scène (current ou next).
 *           example: "next"
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id de la scène à modifier.
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
 *                 example: "scene1"
 *                 description: Le libellé de la scène.
 *               jauge:
 *                 type: integer
 *                 example: 100
 *                 description: La jauge de la scène (intérieur).
 *               latitude:
 *                 type: number
 *                 example: 48.856614
 *                 description: La latitude de la scène.
 *               longitude:
 *                 type: number
 *                 example: 2.3522219
 *                 description: La longitude de la scène.
 *               typesceneId:
 *                 type: integer
 *                 example: 1
 *                 description: L'id du type de scène.
 *     responses:
 *       200:
 *         description: La scène modifiée.
 *       500:
 *         description: Une erreur est survenue lors de la modification de la scène.
 */
router.delete("/", [authJwt.verifyToken, verifyConnected.checkAdmin], sceneController.deleteScenes);
/**
 * @swagger
 *   /scene:
 *   delete:
 *     summary: Supprime toutes les scènes
 *     tags:
 *       - Scènes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut supprimer les scènes (current ou next).
 *           example: "next"
 *     responses:
 *       200:
 *         description: Les scènes ont été supprimées.
 *       500:
 *         description: Une erreur est survenue lors de la suppression des scènes.
 */
router.delete("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], sceneController.deleteSceneById);
/**
 * @swagger
 *   /scene/{id}:
 *   delete:
 *     summary: Supprime une scène par son id
 *     tags:
 *       - Scènes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut supprimer la scène (current ou next).
 *           example: "next"
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id de la scène à supprimer.
 *           example: 1
 *     responses:
 *       200:
 *         description: La scène a été supprimée.
 *       500:
 *         description: Une erreur est survenue lors de la suppression de la scène.
 */

export default router;