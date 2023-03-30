import {Router} from "express";
const router = Router();

import saisonController from "../controllers/saison.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get("/", saisonController.getSaisons);
/**
 * @swagger
 *   /saison:
 *   get:
 *     summary: Récupère toutes les saisons
 *     tags:
 *       - Saison
 *     parameters:
 *       - in: query
 *         sort:
 *           type: string
 *           description: Le tri à appliquer
 *           example: asc
 *           default: desc
 *       - in: query
 *         incPays:
 *           type: boolean
 *           description: Indique si l'on ne veut pas inclure les pays (false)
 *           example: false
 *     responses:
 *       200:
 *         description: Récupération des saisons
 *       500:
 *         description: Une erreur est survenue lors de la récupération des saisons
 */

router.get("/:id", saisonController.getSaisonById);
/**
 * @swagger
 *   /saison/{id}:
 *   get:
 *     summary: Récupère une saison
 *     tags:
 *       - Saison
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id de la saison
 *           example: 1
 *       - in: query
 *         incPays:
 *           type: boolean
 *           description: Indique si l'on ne veut pas inclure les pays (false)
 *           example: false
 *     responses:
 *       200:
 *         description: Récupération de la saison
 *       500:
 *         description: Une erreur est survenue lors de la récupération de la saison
 */

router.post("/", [authJwt.verifyToken, verifyConnected.checkAdmin], saisonController.createSaison);
/**
 * @swagger
 *   /saison:
 *   post:
 *     summary: Création d'une saison
 *     tags:
 *       - Saison
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               annee:
 *                 type: integer
 *                 description: L'année de la saison
 *                 example: 2023
 *               noMois:
 *                 type: integer
 *                 description: Le numéro du mois de la saison
 *                 example: 1
 *                 default: 1
 *               couleur1:
 *                 type: string
 *                 description: La couleur 1 de la saison
 *                 example: "#000000"
 *               couleur2:
 *                 type: string
 *                 description: La couleur 2 de la saison
 *                 example: "#FFFFFF"
 *               banniere:
 *                 type: string
 *                 description: Le chemin de la bannière de la saison
 *                 example: "https://google.com/banniere.jpg"
 *               paysId:
 *                 type: integer
 *                 description: L'id du pays de la saison
 *                 example: 1
 *     responses:
 *       200:
 *         description: Création de la saison
 *       500:
 *         description: Une erreur est survenue lors de la création de la saison
 */
router.post('/migrate-data', [authJwt.verifyToken, verifyConnected.checkAdmin], saisonController.migrateData);
/**
 * @swagger
 *   /saison/migrate-data:
 *   post:
 *     summary: Migration des données d'une saison vers une autre
 *     tags:
 *       - Saison
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               annee:
 *                 type: integer
 *                 description: L'année de la saison
 *                 example: 2023
 *               noMois:
 *                 type: integer
 *                 description: Le numéro du mois de la saison
 *                 example: 1
 *                 default: 1
 *               couleur1:
 *                 type: string
 *                 description: La couleur 1 de la saison
 *                 example: "#000000"
 *               couleur2:
 *                 type: string
 *                 description: La couleur 2 de la saison
 *                 example: "#FFFFFF"
 *               banniere:
 *                 type: string
 *                 description: Le chemin de la bannière de la saison
 *                 example: "https://google.com/banniere.jpg"
 *               paysId:
 *                 type: integer
 *                 description: L'id du pays de la saison
 *                 example: 1
 *     responses:
 *       200:
 *         description: Migration des données de la saison
 *       500:
 *         description: Une erreur est survenue lors de la migration des données de la saison
 */

router.put("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], saisonController.editSaison);
/**
 * @swagger
 *   /saison/{id}:
 *   put:
 *     summary: Modification d'une saison
 *     tags:
 *       - Saison
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id de la saison
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               annee:
 *                 type: integer
 *                 description: L'année de la saison
 *                 example: 2023
 *               noMois:
 *                 type: integer
 *                 description: Le numéro du mois de la saison
 *                 example: 1
 *               couleur1:
 *                 type: string
 *                 description: La couleur 1 de la saison
 *                 example: "#000000"
 *               couleur2:
 *                 type: string
 *                 description: La couleur 2 de la saison
 *                 example: "#FFFFFF"
 *               banniere:
 *                 type: string
 *                 description: Le chemin de la bannière de la saison
 *                 example: "https://google.com/banniere.jpg"
 *               paysId:
 *                 type: integer
 *                 description: L'id du pays de la saison
 *                 example: 1
 *     responses:
 *       200:
 *         description: Modification de la saison
 *       500:
 *         description: Une erreur est survenue lors de la modification de la saison
 */
router.delete("/", [authJwt.verifyToken, verifyConnected.checkAdmin], saisonController.deleteSaisons);
/**
 * @swagger
 *   /saison:
 *   delete:
 *     summary: Suppression de toutes les saisons
 *     tags:
 *       - Saison
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Suppression des saisons
 *       500:
 *         description: Une erreur est survenue lors de la suppression des saisons
 */
router.delete("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], saisonController.deleteSaisonById);
/**
 * @swagger
 *   /saison/{id}:
 *   delete:
 *     summary: Suppression d'une saison
 *     tags:
 *       - Saison
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id de la saison
 *           example: 1
 *     responses:
 *       200:
 *         description: Suppression de la saison
 *       500:
 *         description: Une erreur est survenue lors de la suppression de la saison
 */

export default router;