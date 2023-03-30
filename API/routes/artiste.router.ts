import { Router } from "express";
const router = Router();

import {authJwt, verifyConnected } from "../middleware";

import artisteController from "../controllers/artiste.controller";

router.get("/", artisteController.getArtistes);
/**
 * @swagger
 * /artiste:
 *   get:
 *     summary: Récupère la liste de tous les artistes
 *     tags:
 *       - Artistes
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *         required: false
 *         description: La saison pour laquelle on veut récupérer les artistes (current, next ou previous).
 *       - in: query
 *         name: nom
 *         schema:
 *           type: string
 *         required: false
 *         description: Le nom de l'artiste ou une partie de son nom à chercher.
 *       - in: query
 *         name: incCat
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Indique si l'on ne veut pas inclure la catégorie de l'artiste (false).
 *       - in: query
 *         name: incGenre
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Indique si l'on ne veut pas inclure les genres de l'artiste (false).
 *       - in: query
 *         name: incPays
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Indique si l'on veut ne veut pas inclure les pays de l'artiste (false).
 *       - in: query
 *         name: incRs
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Indique si l'on ne veut pas inclure les réseaux sociaux de l'artiste (false).
 *       - in: query
 *         name: incSaison
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Indique si l'on ne veut pas inclure les saisons auxquelles l'artiste a participé (false). Uniquement pour la saison "previous".
 *       - in: query
 *         name: incConcert
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Indique si l'on ne veut pas inclure les concerts auxquels l'artiste a participé (false). Uniquement pour les saison "current" et "next".
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: Artiste non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */

router.get("/:id", artisteController.getArtisteById);
/**
 * @swagger
 * /artiste/{id}:
 *   get:
 *     summary: Récupère un artiste en fonction de son ID
 *     tags:
 *       - Artistes
 *     parameters:
 *       - in: header
 *         name: saison
 *         schema:
 *           type: string
 *         required: false
 *         description: La saison pour laquelle on veut récupérer les informations de l'artiste (current, next ou previous).
 *       - in: query
 *         name: incCategorie
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Indique si l'on ne veut pas inclure la catégorie de l'artiste (false).
 *       - in: query
 *         name: incGenre
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Indique si l'on ne veut pas inclure les genres de l'artiste (false).
 *       - in: query
 *         name: incPays
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Indique si l'on veut ne veut pas inclure les pays de l'artiste (false).
 *       - in: query
 *         name: incRs
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Indique si l'on ne veut pas inclure les réseaux sociaux de l'artiste (false).
 *       - in: query
 *         name: incSaison
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Indique si l'on ne veut pas inclure les saisons auxquelles l'artiste a participé (false). Uniquement pour la saison "previous".
 *       - in: query
 *         name: incConcert
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Indique si l'on ne veut pas inclure les concerts auxquels l'artiste a participé (false). Uniquement pour les saison "current" et "next".
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: Artiste non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */

router.post("/", [authJwt.verifyToken], artisteController.createArtiste);
/**
 * @swagger
 * /artiste:
 *   post:
 *     summary: Crée un nouvel artiste
 *     tags:
 *       - Artistes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *                 example: John Doe
 *               photo:
 *                 type: string
 *                 maxLength: 255
 *                 example: https://example.com/john-doe.jpg
 *               biographie:
 *                 type: string
 *                 example: John Doe est un artiste de renom.
 *               lien_video:
 *                 type: string
 *                 maxLength: 255
 *                 example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *               lien_site:
 *                 type: string
 *                 maxLength: 255
 *                 example: https://johndoe.com
 *               categorieId:
 *                 type: integer
 *                 example: 1
 *                 description: L'ID de la catégorie de l'artiste.
 *                 minimum: 1
 *               genres:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: 1
 *                   description: L'ID du genre de l'artiste.
 *                   minimum: 1
 *                   uniqueItems: true
 *                 description: Les IDs des genres de l'artiste.
 *                 example: [1, 2]
 *               pays:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: 1
 *                   description: L'ID du pays de l'artiste.
 *                   minimum: 1
 *                   uniqueItems: true
 *                 description: Les IDs des pays de l'artiste.
 *                 example: [1, 2]
 *               rs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                       description: L'ID du réseau social de l'artiste.
 *                       minimum: 1
 *                     lien:
 *                       type: string
 *                       maxLength: 255
 *                       example: https://www.facebook.com/johndoe
 *                       description: Le lien du réseau social de l'artiste.
 *                   description: Un réseau social de l'artiste.
 *                 description: Les réseaux sociaux de l'artiste.
 *                 example: [{"id": 1, "lien": "https://www.facebook.com/johndoe"}, {"id": 2, "lien": "https://www.instagram.com/johndoe"}]
 *     responses:
 *       '201':
 *         description: Artiste créé avec succès
 *       '400':
 *         description: Données invalides pour créer un artiste
 *       '401':
 *         description: Utilisateur non authentifié
 *       '500':
 *         description: Erreur interne du serveur
 */

router.put("/:id", [authJwt.verifyToken], artisteController.editArtiste);
/**
 * @swagger
 * /artiste/{id}:
 *   put:
 *     summary: Crée un nouvel artiste
 *     tags:
 *       - Artistes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *                 example: John Doe
 *               photo:
 *                 type: string
 *                 maxLength: 255
 *                 example: https://example.com/john-doe.jpg
 *               biographie:
 *                 type: string
 *                 example: John Doe est un artiste de renom.
 *               lien_video:
 *                 type: string
 *                 maxLength: 255
 *                 example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *               lien_site:
 *                 type: string
 *                 maxLength: 255
 *                 example: https://johndoe.com
 *               categorieId:
 *                 type: integer
 *                 example: 1
 *                 description: L'ID de la catégorie de l'artiste.
 *                 minimum: 1
 *               genres:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: 1
 *                   description: L'ID du genre de l'artiste.
 *                   minimum: 1
 *                   uniqueItems: true
 *                 description: Les IDs des genres de l'artiste.
 *                 example: [1, 2]
 *               pays:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: 1
 *                   description: L'ID du pays de l'artiste.
 *                   minimum: 1
 *                   uniqueItems: true
 *                 description: Les IDs des pays de l'artiste.
 *                 example: [1, 2]
 *               rs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                       description: L'ID du réseau social de l'artiste.
 *                       minimum: 1
 *                     lien:
 *                       type: string
 *                       maxLength: 255
 *                       example: https://www.facebook.com/johndoe
 *                       description: Le lien du réseau social de l'artiste.
 *                   description: Un réseau social de l'artiste.
 *                 description: Les réseaux sociaux de l'artiste.
 *                 example: [{"id": 1, "lien": "https://www.facebook.com/johndoe"}, {"id": 2, "lien": "https://www.instagram.com/johndoe"}]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *           required: true
 *     responses:
 *       '201':
 *         description: Artiste modifié avec succès
 *       '400':
 *         description: Données invalides pour modifié un artiste
 *       '401':
 *         description: Utilisateur non authentifié
 *       '500':
 *         description: Erreur interne du serveur
 */

router.delete("/", [authJwt.verifyToken, verifyConnected.checkAdmin], artisteController.deleteArtistes);
/**
 * @swagger
 * /artiste:
 *   delete:
 *     summary: Supprime tous les artistes
 *     tags:
 *       - Artistes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Artistes supprimés avec succès
 *       '401':
 *         description: Utilisateur non authentifié
 *       '500':
 *         description: Erreur interne du serveur
 */
router.delete("/:id", [authJwt.verifyToken, verifyConnected.checkAdmin], artisteController.deleteArtisteById);
/**
 * @swagger
 * /artiste/{id}:
 *   delete:
 *     summary: Supprime un artiste
 *     tags:
 *       - Artistes
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
 *         description: Artistes supprimés avec succès
 *       '401':
 *         description: Utilisateur non authentifié
 *       '500':
 *         description: Erreur interne du serveur
 */

export default router;