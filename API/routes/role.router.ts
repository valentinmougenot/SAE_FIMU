import {Router} from "express";
const router = Router();

import roleController from "../controllers/role.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get("/", roleController.getRoles);
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Récupérer la liste des rôles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Erreur serveur
 */

router.get("/:id", roleController.getRoleById);
/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Récupérer un rôle par son identifiant
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Identifiant du rôle à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rôle récupéré avec succès
 *       404:
 *         description: Rôle non trouvé
 *       500:
 *         description: Une erreur est survenue lors de la récupération du rôle
 */

router.post("/", [authJwt.verifyToken], roleController.createRole);
/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Créer un rôle
 *     description: Crée un nouveau rôle avec les informations fournies dans le corps de la requête.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Les informations du rôle à créer.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *                 example: "Administrateur"
 *     responses:
 *       200:
 *         description: Le rôle a été créé avec succès.
 *       401:
 *         description: L'utilisateur n'est pas authentifié.
 *       500:
 *         description: Une erreur est survenue lors de la création du rôle.
 */

router.put("/:id", [authJwt.verifyToken], roleController.editRole);
/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Modifier un rôle
 *     tags: [Roles]
 *     description: Modifier un rôle existant en fournissant l'ID du rôle et les nouveaux détails.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du rôle à modifier.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *                 example: "Administrateur"
 *     responses:
 *       200:
 *         description: Le rôle a été modifié avec succès.
 *       401:
 *         description: Erreur d'authentification - jeton invalide ou non fourni.
 *       404:
 *         description: Le rôle avec l'ID fourni n'existe pas.
 *       500:
 *         description: Une erreur est survenue lors de la modification du rôle.
 */
router.delete("/", [authJwt.verifyToken, verifyConnected.checkAdmin], roleController.deleteRoles);
/**
 * @swagger
 * /roles:
 *   delete:
 *     summary: Supprime tous les rôles
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Une erreur est survenue lors de la suppression des rôles
 */


router.delete("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], roleController.deleteRoleById);
/**
 * @swagger
 *
 * /roles/{id}:
 *   delete:
 *     summary: Supprimer un rôle par ID.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du rôle à supprimer.
 *     responses:
 *       200:
 *         description: Renvoie un objet contenant un message confirmant la suppression du rôle.
 *       401:
 *         description: Non autorisé, jeton non fourni ou expiré.
 *       500:
 *         description: Une erreur est survenue lors de la suppression du rôle.
 */


export default router;