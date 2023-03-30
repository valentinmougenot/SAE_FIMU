import {Router} from 'express';
const router = Router();

import reseauxSociauxController from '../controllers/reseauxSociaux.controller';
import {authJwt, verifyConnected} from "../middleware";

router.get('/', reseauxSociauxController.getReseauxSociaux);
/**
 * @swagger
 *   /reseauxSociaux:
 *   get:
 *     summary: Récupère tous les réseaux sociaux
 *     tags:
 *       - Réseaux Sociaux
 *     responses:
 *       200:
 *         description: Récupération des réseaux sociaux
 *       500:
 *         description: Une erreur est survenue lors de la récupération des réseaux sociaux
 */
router.get('/:id', reseauxSociauxController.getReseauSocialById);
/**
 * @swagger
 *   /reseauxSociaux/{id}:
 *   get:
 *     summary: Récupère un réseau social
 *     tags:
 *       - Réseaux Sociaux
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id du réseau social
 *           example: 1
 *     responses:
 *       200:
 *         description: Récupération du réseau social
 *       500:
 *         description: Une erreur est survenue lors de la récupération du réseau social
 */

router.post('/', [authJwt.verifyToken], reseauxSociauxController.createReseauSocial);
/**
 * @swagger
 *   /reseauxSociaux:
 *   post:
 *     summary: Création d'un réseau social
 *     tags:
 *       - Réseaux Sociaux
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
 *                 required: true
 *                 description: Le libellé du réseau social
 *                 example: Facebook
 *               logo:
 *                 type: string
 *                 required: true
 *                 description: Le logo du réseau social
 *                 example: mdi-facebook
 *     responses:
 *       200:
 *         description: Création du réseau social
 *       500:
 *         description: Une erreur est survenue lors de la création du réseau social
 */

router.put('/:id', [authJwt.verifyToken], reseauxSociauxController.editReseauSocial);
/**
 * @swagger
 *   /reseauxSociaux/{id}:
 *   put:
 *     summary: Modification d'un réseau social
 *     tags:
 *       - Réseaux Sociaux
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id du réseau social
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
 *                 required: true
 *                 description: Le libellé du réseau social
 *                 example: Facebook
 *               logo:
 *                 type: string
 *                 required: true
 *                 description: Le logo du réseau social
 *                 example: mdi-facebook
 *     responses:
 *       200:
 *         description: Modification du réseau social
 *       500:
 *         description: Une erreur est survenue lors de la modification du réseau social
 */

router.delete('/', [authJwt.verifyToken, verifyConnected.checkAdmin], reseauxSociauxController.deleteReseauxSociaux);
/**
 * @swagger
 *   /reseauxSociaux:
 *   delete:
 *     summary: Suppression de tous les réseaux sociaux
 *     tags:
 *       - Réseaux Sociaux
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Suppression des réseaux sociaux
 *       500:
 *         description: Une erreur est survenue lors de la suppression des réseaux sociaux
 */

router.delete('/:id', [authJwt.verifyToken, verifyConnected.checkAdmin], reseauxSociauxController.deleteReseauSocialById);
/**
 * @swagger
 *   /reseauxSociaux/{id}:
 *   delete:
 *     summary: Suppression d'un réseau social
 *     tags:
 *       - Réseaux Sociaux
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id du réseau social
 *           example: 1
 *     responses:
 *       200:
 *         description: Suppression du réseau social
 *       500:
 *         description: Une erreur est survenue lors de la suppression du réseau social
 */

export default router;