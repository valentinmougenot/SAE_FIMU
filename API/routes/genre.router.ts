import {Router} from 'express';
const router = Router();

import genreController from '../controllers/genre.controller';
import {authJwt, verifyConnected} from "../middleware";

router.get('/', genreController.getGenres);
/**
 * @swagger
 * /genre:
 *   get:
 *     summary: Récupère tous les genres
 *     tags:
 *       - Genres
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */

router.get('/:id', genreController.getGenreById);
/**
 * @swagger
 * /genre/{id}:
 *   get:
 *     summary: Récupère un genre par son id
 *     tags:
 *       - Genres
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

router.post('/', [authJwt.verifyToken], genreController.createGenre);
/**
 * @swagger
 *   /genre:
 *   post:
 *     summary: Créer un genre
 *     tags:
 *       - Genres
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
 *                 example: "Pop"
 *                 description: "Libellé du genre"
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

router.put('/:id', [authJwt.verifyToken], genreController.editGenre);
/**
 * @swagger
 *   /genre/{id}:
 *   put:
 *     summary: Met à jour un genre
 *     tags:
 *       - Genres
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
 *                 example: "Pop"
 *                 description: Le nom du genre
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

router.delete('/', [authJwt.verifyToken, verifyConnected.checkAdmin], genreController.deleteGenres);
/**
 * @swagger
 * /genre:
 *   delete:
 *     summary: Supprime tous les genres
 *     tags:
 *       - Genres
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

router.delete('/:id', [authJwt.verifyToken, verifyConnected.checkAdmin], genreController.deleteGenreById);
/**
 * @swagger
 * /genre/{id}:
 *   delete:
 *     summary: Supprime un genre par son id
 *     tags:
 *       - Genres
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