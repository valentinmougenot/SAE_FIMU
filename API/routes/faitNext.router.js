import express from 'express';
const router = express.Router();

import { create, findAll, deleteByIdArtiste, deleteAll } from '../controllers/faitNext.controller.js';

router.post('/', create);
/**
 * @swagger
 * /next/fait:
 *   post:
 *      description: Crée un lien entre genre et artiste
 *      tags:
 *          - faitNext
 *      parameters:
 *          - in: body
 *            name: genre
 *            description: Le genre à lier à l'artiste
 *            schema:
 *              type: object
 *              required:
 *                - genre
 *              properties:
 *                genre:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: "Rock"
 * 
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
 * /next/fait:
 *   get:
 *      description: affichage de toutes les relations genre/artiste
 *      tags:
 *          - faitNext
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
 * /next/fait/artiste/{id}:
 *   delete:
 *      description: suppression d'une relation en fonction de l'id de l'artiste
 *      tags:
 *          - faitNext
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de l'artiste dont on veut supprimer les relations
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
 * /next/fait:
 *   delete:
 *      description: supprime toutes les relations
 *      tags:
 *          - faitNext
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router;