import {Router} from "express";
const router = Router();

import standController from "../controllers/stand.controller";
import {authJwt, verifyConnected} from "../middleware";

router.get("/", standController.getStands);
/**
 * @swagger
 *   /stand:
 *   get:
 *     summary: Récupère tous les stands
 *     tags:
 *       - Stands
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut récupérer le stand (current ou next).
 *           example: "next"
 *       - in: query
 *         name: incTs
 *         schema:
 *           type: boolean
 *           required: false
 *           description: Indique si l'on ne veut pas récupérer les types de stands (false).
 *           example: false
 *       - in: query
 *         name: incServ
 *         schema:
 *           type: boolean
 *           required: false
 *           description: Indique si l'on ne veut pas récupérer les services (false).
 *           example: false
 *     responses:
 *       200:
 *         description: La liste des stands.
 *       500:
 *         description: Une erreur est survenue lors de la récupération des stands.
 */
router.get("/:id", standController.getStandById);
/**
 * @swagger
 *   /stand/{id}:
 *   get:
 *     summary: Récupère un stand par son id
 *     tags:
 *       - Stands
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut récupérer le stand (current ou next).
 *           example: "next"
 *       - in: query
 *         name: incTs
 *         schema:
 *           type: boolean
 *           required: false
 *           description: Indique si l'on ne veut pas récupérer les types de stands (false).
 *           example: false
 *       - in: query
 *         name: incServ
 *         schema:
 *           type: boolean
 *           required: false
 *           description: Indique si l'on ne veut pas récupérer les services (false).
 *           example: false
 *     responses:
 *       200:
 *         description: La liste des stands.
 *       500:
 *         description: Une erreur est survenue lors de la récupération des stands.
 */
router.post("/", [authJwt.verifyToken], standController.createStand);
/**
 * @swagger
 *   /stand:
 *   post:
 *     summary: Crée un stand
 *     tags:
 *       - Stands
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut modifier le stand (current ou next).
 *           example: "next"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 required: true
 *                 description: Le nom du stand.
 *               latitude:
 *                 type: number
 *                 example: 48.856614
 *                 description: La latitude du stand.
 *               longitude:
 *                 type: number
 *                 example: 2.3522219
 *                 description: La longitude du stand.
 *               services:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: 1
 *                   description: L'id du service.
 *                 description: La liste des services du stand.
 *                 example: [1, 2]
 *               typestandId:
 *                 type: integer`
 *                 example: 1
 *                 description: L'id du type de stand.
 *     responses:
 *       200:
 *         description: Le stand a bien été créé.
 *       500:
 *         description: Une erreur est survenue lors de la création du stand.
 */
router.put("/:id", [authJwt.verifyToken], standController.editStand);
/**
 * @swagger
 *   /stand:
 *   put:
 *     summary: Modifie un stand
 *     tags:
 *       - Stands
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut modifier le stand (current ou next).
 *           example: "next"
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id du stand à modifier.
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 required: true
 *                 description: Le nom du stand.
 *               latitude:
 *                 type: number
 *                 example: 48.856614
 *                 description: La latitude du stand.
 *               longitude:
 *                 type: number
 *                 example: 2.3522219
 *                 description: La longitude du stand.
 *               services:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: 1
 *                   description: L'id du service.
 *                 description: La liste des services du stand.
 *                 example: [1, 2]
 *               typestandId:
 *                 type: integer`
 *                 example: 1
 *                 description: L'id du type de stand.
 *     responses:
 *       200:
 *         description: Le stand a bien été modifié.
 *       500:
 *         description: Une erreur est survenue lors de la modification du stand.
 */
router.delete("/", [authJwt.verifyToken, verifyConnected.checkAdmin], standController.deleteStands);
/**
 * @swagger
 *   /stand:
 *   delete:
 *     summary: Supprime tous les stands
 *     tags:
 *       - Stands
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut supprimer les stands (current ou next).
 *           example: "next"
 *     responses:
 *       200:
 *         description: Les stands ont bien été supprimés.
 *       500:
 *         description: Une erreur est survenue lors de la suppression des stands.
 */
router.delete("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], standController.deleteStandById);
/**
 * @swagger
 *   /stand/{id}}:
 *   delete:
 *     summary: Supprime un stand par son id
 *     tags:
 *       - Stands
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *           required: false
 *           description: La saison pour laquelle on veut supprimer le stand (current ou next).
 *           example: "next"
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: L'id du stand à supprimer.
 *           example: 1
 *     responses:
 *       200:
 *         description: Le stand a bien été supprimé.
 *       500:
 *         description: Une erreur est survenue lors de la suppression du stand.
 */

export default router;