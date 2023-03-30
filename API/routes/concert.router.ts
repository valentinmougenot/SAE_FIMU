import {Router} from "express";
const router = Router();

import concertController from "../controllers/concert.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get('/', concertController.getConcerts);
/**
 * @swagger
 *   /concert:
 *   get:
 *     summary: Récupère tous les concerts
 *     tags:
 *       - Concerts
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut récupérer les artistes (current ou next).
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           example: 2023-03-12
 *           description: Date du concert
 *           required: false
 *       - in: query
 *         name: incArtiste
 *         schema:
 *           type: boolean
 *           example: false
 *           description: Indique si l'on ne veut pas inclure l'artiste (false).
 *           required: false
 *       - in: query
 *         name: incScene
 *         schema:
 *           type: boolean
 *           example: false
 *           description: Indique si l'on ne veut pas inclure la scène (false).
 *           required: false
 *       - in: query
 *         name: incCat
 *         schema:
 *           type: boolean
 *           example: false
 *           description: Indique si l'on ne veut pas inclure la catégorie de l'artiste (false).
 *           required: false
 *       - in: query
 *         name: incGenre
 *         schema:
 *           type: boolean
 *           example: false
 *           description: Indique si l'on ne veut pas inclure le genre de l'artiste (false).
 *           required: false
 *       - in: query
 *         name: incPays
 *         schema:
 *           type: boolean
 *           example: false
 *           description: Indique si l'on ne veut pas inclure le pays de l'artiste (false).
 *           required: false
 *       - in: query
 *         name: incRs
 *         schema:
 *           type: boolean
 *           example: false
 *           description: Indique si l'on ne veut pas inclure les réseaux sociaux de l'artiste (false).
 *           required: false
 *     responses:
 *     '200':
 *       description: OK
 *     '500':
 *       description: Erreur interne du serveur
 */

router.get('/date', concertController.getDates);
/**
 * @swagger
 *   /concert/date:
 *   get:
 *     summary: Récupère toutes les dates de concerts
 *     tags:
 *       - Concerts
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut récupérer les dates de concerts (current ou next).
 *           example: next
 *           default: current
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/heuremin', concertController.getHeureMin);
/**
 * @swagger
 *   /concert/heuremin:
 *   get:
 *     summary: Récupère l'heure de début du premier concert
 *     tags:
 *       - Concerts
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut récupérer l'heure de début du premier concert (current ou next).
 *           example: next
 *           default: current
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           example: 2023-03-12
 *           description: Date du concert
 *           required: false
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */

router.get('/heuremax', concertController.getHeureMax);
/**
 * @swagger
 *   /concert/heuremax:
 *   get:
 *     summary: Récupère l'heure de fin du dernier concert
 *     tags:
 *       - Concerts
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           description: La saison pour laquelle on veut récupérer l'heure de fin du dernier concert (current ou next).
 *           example: next
 *           default: current
 *           required: false
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           example: 2023-03-12
 *           description: Date du concert
 *           required: false
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */

router.get('/:id', concertController.getConcertById);
/**
 * @swagger
 *   /concert/{id}:
 *   get:
 *     summary: Récupère un concert
 *     tags:
 *       - Concerts
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut récupérer les artistes (current ou next).
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id du concert
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           example: 2023-03-12
 *           description: Date du concert
 *           required: false
 *       - in: query
 *         name: incArtiste
 *         schema:
 *           type: boolean
 *           example: false
 *           description: Indique si l'on ne veut pas inclure l'artiste (false).
 *           required: false
 *       - in: query
 *         name: incScene
 *         schema:
 *           type: boolean
 *           example: false
 *           description: Indique si l'on ne veut pas inclure la scène (false).
 *           required: false
 *       - in: query
 *         name: incCat
 *         schema:
 *           type: boolean
 *           example: false
 *           description: Indique si l'on ne veut pas inclure la catégorie de l'artiste (false).
 *           required: false
 *       - in: query
 *         name: incGenre
 *         schema:
 *           type: boolean
 *           example: false
 *           description: Indique si l'on ne veut pas inclure le genre de l'artiste (false).
 *           required: false
 *       - in: query
 *         name: incPays
 *         schema:
 *           type: boolean
 *           example: false
 *           description: Indique si l'on ne veut pas inclure le pays de l'artiste (false).
 *           required: false
 *       - in: query
 *         name: incRs
 *         schema:
 *           type: boolean
 *           example: false
 *           description: Indique si l'on ne veut pas inclure les réseaux sociaux de l'artiste (false).
 *           required: false
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */

router.post('/', [authJwt.verifyToken], concertController.createConcert);
/**
 * @swagger
 *   /concert:
 *   post:
 *     summary: Créer un concert
 *     tags:
 *       - Concerts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut créer le concert (current ou next).
 *           example: next
 *           default: current
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *         schema:
 *           type: object
 *           properties:
 *             heure_debut:
 *               type: string
 *               example: 18:00:00
 *               description: Heure de début du concert
 *             date_debut:
 *               type: string
 *               example: 2023-03-12
 *               description: Date de début du concert
 *             duree:
 *               type: integer
 *               example: 60
 *               description: Durée du concert en minutes
 *             artisteId:
 *               type: integer
 *               example: 1
 *               description: Id de l'artiste
 *             sceneId:
 *               type: integer
 *               example: 1
 *               description: Id de la scène
 *               required: false
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */

router.put('/:id', [authJwt.verifyToken], concertController.editConcert);
/**
 * @swagger
 *   /concert/{id}:
 *   put:
 *     summary: Modifier un concert
 *     tags:
 *       - Concerts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut modifier le concert (current ou next).
 *           example: next
 *           default: current
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id du concert
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *         schema:
 *           type: object
 *           properties:
 *             heure_debut:
 *               type: string
 *               example: 18:00:00
 *               description: Heure de début du concert
 *             date_debut:
 *               type: string
 *               example: 2023-03-12
 *               description: Date de début du concert
 *             duree:
 *               type: integer
 *               example: 60
 *               description: Durée du concert en minutes
 *             artisteId:
 *               type: integer
 *               example: 1
 *               description: Id de l'artiste
 *             sceneId:
 *               type: integer
 *               example: 1
 *               description: Id de la scène
 *               required: false
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */

router.delete('/', [authJwt.verifyToken, verifyConnected.checkAdmin], concertController.deleteConcerts);
/**
 * @swagger
 *   /concert:
 *   delete:
 *     summary: Supprime tous les concerts
 *     tags:
 *       - Concerts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut supprimer les concerts (current ou next).
 *           example: next
 *           default: current
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */

router.delete('/:id', [authJwt.verifyToken, verifyConnected.checkAdmin], concertController.deleteConcertById);
/**
 * @swagger
 *   /concert/{id}:
 *   delete:
 *     summary: Supprime un concert
 *     tags:
 *       - Concerts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut supprimer les concerts (current ou next).
 *           example: next
 *           default: current
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id du concert
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */

export default router;