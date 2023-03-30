import {Router} from "express";
const router = Router();

import utilisateurController from "../controllers/utilisateur.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get("/", [authJwt.verifyToken, verifyConnected.checkAdmin], utilisateurController.getUtilisateurs);
/**
 * @swagger
 *   /utilisateur:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags:
 *       - Utilisateur
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: incRole
 *         schema:
 *           type: boolean
 *           required: false
 *           description: Indique si l'on ne veut pas récupérer les rôles (false).
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], utilisateurController.getUtilisateurById);
/**
 * @swagger
 *   /utilisateur/{id}:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags:
 *       - Utilisateur
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           example: 1
 *           description: L'id de l'utilisateur
 *       - in: query
 *         name: incRole
 *         schema:
 *           type: boolean
 *           required: false
 *           description: Indique si l'on ne veut pas récupérer les rôles (false).
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/", [authJwt.verifyToken, verifyConnected.checkAdmin], utilisateurController.createUtilisateur);
/**
 * @swagger
 *   /utilisateur:
 *   post:
 *     summary: Créer un utilisateur
 *     tags:
 *       - Utilisateur
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifiant:
 *                 type: string
 *                 required: true
 *                 example: "jdoe"
 *               motDePasse:
 *                 type: string
 *                 required: true
 *                 example: "password"
 *               roleId:
 *                 type: integer
 *                 required: true
 *                 example: 1
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], utilisateurController.editUtilisateur);
/**
 * @swagger
 *   /utilisateur/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     tags:
 *       - Utilisateur
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           example: 1
 *           description: L'id de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifiant:
 *                 type: string
 *                 required: true
 *                 example: "jdoe"
 *               motDePasse:
 *                 type: string
 *                 required: true
 *                 example: "password"
 *               roleId:
 *                 type: integer
 *                 required: true
 *                 example: 1
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Erreur interne du serveur
 */
router.delete("/", [authJwt.verifyToken, verifyConnected.checkAdmin], utilisateurController.deleteUtilisateurs);
/**
 * @swagger
 *   /utilisateur:
 *   delete:
 *     summary: Supprimer tous les utilisateurs
 *     tags:
 *       - Utilisateur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         response: OK
 *       '500':
 *         description: Erreur interne du serveur
 */
router.delete("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], utilisateurController.deleteUtilisateurById);
/**
 * @swagger
 *   /utilisateur/{id}:
 *   delete:
 *     summary: Supprimer tous les utilisateurs
 *     tags:
 *       - Utilisateur
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           example: 1
 *           description: L'id de l'utilisateur
 *     responses:
 *       '200':
 *         response: OK
 *       '500':
 *         description: Erreur interne du serveur
 */

export default router;