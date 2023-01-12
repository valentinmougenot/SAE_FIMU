import express from 'express';
const router = express.Router();

import { create, findAll, deleteByIdArtiste, deleteAll } from '../controllers/jouePrevious.controller.js';

router.post('/', create);
/**
 * @swagger
 * /previous/joue:
 *   post:
 *      description: Crée un lien entre un ancien artiste et une ancienne saison 
 *      tags:
 *          - previousJoue
 *      parameters:
 *          - in: body
 *            name: jouePrevious
 *            description: L'association à ajouter
 *            schema:
 *              type: object
 *              required:
 *                - id_artiste
 *                - annee
 *              properties:
 *                id_artiste:
 *                  type: integer
 *                  example: 1
 *                annee:
 *                  type: integer
 *                  example: 2022
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
router.get('/', findAll);
/**
 * @swagger
 * /previous/joue:
 *   get:
 *      description: Find all the previous artists
 *      tags:
 *          - previousJoue
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
router.delete('/artiste/:id', deleteByIdArtiste);
/**
 * @swagger
 * /previous/joue/{id}:
 *   delete:
 *      description: Delete an artist through its id
 *      tags:
 *          - previousJoue
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de l'artiste dont on veut supprimer les relations avec joue
 *            required: true
 *            type: integer
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
router.delete('/', deleteAll);
/**
 * @swagger
 * /previous/joue:
 *   delete:
 *      description: supprime toutes les relations
 *      tags:
 *          - previousJoue
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

export default router;