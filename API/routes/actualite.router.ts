import {Router} from "express";
const router = Router();

import actualiteController from "../controllers/actualite.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get('/', actualiteController.getActualites);
/**
 * @swagger
 *   /actualite:
 *   get:
 *     summary: Récupère toutes les actualités
 *     tags:
 *       - Actualités
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */

router.get('/:id', actualiteController.getActualiteById);
/**
 * @swagger
 *   /actualite/{id}:
 *   get:
 *     summary: Récupère une actualité par son id
 *     tags:
 *       - Actualités
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *           required: true
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: Actualité non trouvée
 *       '500':
 *         description: Erreur interne du serveur
 */

router.post('/', [authJwt.verifyToken], actualiteController.createActualite);
/**
 * @swagger
 *   /actualite:
 *   post:
 *     summary: Créer une actualité
 *     tags:
 *       - Actualités
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *                 maxLength: 255
 *                 example: "Titre de l'actualité"
 *               contenu:
 *                 type: string
 *                 maxLength: 255
 *                 example: "Contenu de l'actualité"
 *               lienImage:
 *                 type: string
 *                 maxLength: 255
 *                 example: "https://img.freepik.com/vecteurs-libre/breaking-news-concept_23-2148514216.jpg?w=2000"
 *               dateEnvoi:
 *                 type: string
 *                 example: "2023-03-12"
 *               heureEnvoi:
 *                 type: string
 *                 example: "12:00:00"
 *     responses:
 *       '201':
 *         description: OK
 *       '400':
 *         description: Erreur de validation
 *       '401':
 *         description: Non autorisé
 *       '500':
 *         description: Erreur interne du serveur
 */

router.put('/:id', [authJwt.verifyToken], actualiteController.editActualite);
/**
 * @swagger
 *   /actualite/{id}:
 *   put:
 *     summary: Créer une actualité
 *     tags:
 *       - Actualités
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *                 maxLength: 255
 *                 example: "Titre de l'actualité"
 *               contenu:
 *                 type: string
 *                 maxLength: 255
 *                 example: "Contenu de l'actualité"
 *               lienImage:
 *                 type: string
 *                 maxLength: 255
 *                 example: "https://img.freepik.com/vecteurs-libre/breaking-news-concept_23-2148514216.jpg?w=2000"
 *               dateEnvoi:
 *                 type: string
 *                 example: "2023-03-12"
 *               heureEnvoi:
 *                 type: string
 *                 example: "12:00:00"
 *     responses:
 *       '201':
 *         description: OK
 *       '400':
 *         description: Erreur de validation
 *       '401':
 *         description: Non autorisé
 *       '500':
 *         description: Erreur interne du serveur
 */

router.delete('/', [authJwt.verifyToken, verifyConnected.checkAdmin], actualiteController.deleteActualites);
/**
 * @swagger
 *   /actualite:
 *   delete:
 *     summary: Supprime toutes les actualités
 *     tags:
 *       - Actualités
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

router.delete('/:id', [authJwt.verifyToken, verifyConnected.checkAdmin], actualiteController.deleteActualiteById);
/**
 * @swagger
 *   /actualite/{id}:
 *   delete:
 *     summary: Supprime une actualité par son id
 *     tags:
 *       - Actualités
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *           required: true
 *     responses:
 *       '200':
 *         description: OK
 *       '401':
 *         description: Non autorisé
 *       '500':
 *         description: Erreur interne du serveur
 */

export default router;