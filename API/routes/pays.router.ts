import {Router} from "express";
const router = Router();

import paysController from "../controllers/pays.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get('/', paysController.getPays);
/**
 * @swagger
 * /pays:
 *   get:
 *     summary: Récupère tous les pays
 *     tags:
 *       - Pays
 *     responses:
 *       200:
 *         description: La liste des pays a été récupérée avec succès.
 *       500:
 *         description: Une erreur est survenue lors de la récupération des pays.
 */

router.get('/:id', paysController.getPaysById);
/**
 * @swagger
 * /pays/{id}:
 *   get:
 *     summary: Récupère un pays par son identifiant
 *     tags:
 *       - Pays
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'identifiant unique du pays à récupérer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Le pays a été récupéré avec succès.
 *       404:
 *         description: Le pays avec l'identifiant spécifié n'existe pas dans la base de données.
 *       500:
 *         description: Une erreur est survenue lors de la récupération du pays.
 */

router.post('/', [authJwt.verifyToken], paysController.createPays);
/**
 * @swagger
 * /pays:
 *   post:
 *     summary: Créer un pays
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Pays
 *     requestBody:
 *       description: Objet représentant le pays à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *                 example: France
 *                 description: Libellé du pays à créer
 *                 minLength: 1
 *                 maxLength: 255
 *                 required: true
 *     responses:
 *       '200':
 *         description: Pays créé avec succès
 *       '401':
 *         description: Non autorisé, jeton non fourni ou expiré
 *       '500':
 *         description: Erreur interne du serveur lors de la création du pays
 */

router.put('/:id', [authJwt.verifyToken], paysController.editPays);
/**
 * @swagger
 * /pays/{id}:
 *   put:
 *     summary: Modifier un pays existant
 *     tags: [Pays]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du pays à modifier
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Nouvelles données du pays à modifier
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *                 maxLength: 255
 *                 example: France
 *                 required: true
 *     responses:
 *       200:
 *         description: Pays modifié avec succès
 *       401:
 *         description: Non autorisé - Jeton non fourni ou expiré
 *       500:
 *         description: Erreur interne du serveur
 */

router.delete('/', [authJwt.verifyToken, verifyConnected.checkAdmin], paysController.deletePays);
/**
 * @swagger
 * /pays:
 *   delete:
 *     summary: Supprime tous les pays.
 *     tags:
 *       - Pays
 *     security:
 *       - bearerAuth: []
 *       - Admin: []
 *     responses:
 *       200:
 *         description: OK.
 *       401:
 *         description: Accès non autorisé.
 *       500:
 *         description: Une erreur est survenue lors de la suppression des pays.
 */

router.delete('/:id', [authJwt.verifyToken, verifyConnected.checkAdmin], paysController.deletePaysById);
/**
 * @swagger
 * /pays/{id}:
 *   delete:
 *     summary: Supprime un pays par son identifiant
 *     tags: [Pays]
 *     security:
 *       - bearerAuth: []
 *       - admin: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identifiant du pays à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Suppression réussie
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */

export default router;