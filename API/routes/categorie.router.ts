import {Router} from "express";
const router = Router();

import categorieController from "../controllers/categorie.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get("/", categorieController.getCategories);
/**
 * @swagger
 *   /categorie:
 *   get:
 *     summary: Récupère toutes les catégories
 *     tags:
 *       - Categorie
 *     responses:
 *     '200':
 *       description: OK
 *     '500':
 *       description: Erreur interne du serveur
 */

router.get("/:id", categorieController.getCategorieById);
/**
 * @swagger
 *   /categorie/{id}:
 *   get:
 *     summary: Récupère une catégorie par son id
 *     tags:
 *       - Categorie
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
 *         description: Catégorie non trouvée
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/", [authJwt.verifyToken], categorieController.createCategorie);
/**
 * @swagger
 *   /categorie:
 *   post:
 *     summary: Créer une catégorie
 *     tags:
 *       - Categorie
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
 *                 example: "Catégorie 1"
 *               couleur:
 *                 type: string
 *                 example: "#000000"
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
router.put("/:id", [authJwt.verifyToken], categorieController.editCategorie);
/**
 * @swagger
 *   /categorie/{id}:
 *   put:
 *     summary: Met à jour une catégorie
 *     tags:
 *       - Categorie
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
 *                 example: "Catégorie 1"
 *                 description: Le libellé de la catégorie
 *               couleur:
 *                 type: string
 *                 example: "#000000"
 *                 description: La couleur de la catégorie
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
router.delete("/", [authJwt.verifyToken, verifyConnected.checkAdmin], categorieController.deleteCategories);
/**
 * @swagger
 *   /categorie:
 *   delete:
 *     summary: Supprime toutes les catégories
 *     tags:
 *       - Categorie
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

router.delete("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], categorieController.deleteCategorieById);
/**
 * @swagger
 *   /categorie/{id}:
 *   delete:
 *     summary: Supprime une catégorie par son id
 *     tags:
 *       - Categorie
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