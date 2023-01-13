import express from 'express';
const router = express.Router()

import { create, findAll, deleteByIdArtiste, deleteAll } from '../controllers/faitPrevious.controller.js'

router.post('/', create);
/**
 * @swagger
 * /previous/fait:
 *   post:
 *      description: Crée un lien entre genre et ancien artiste
 *      tags:
 *          - faitPrevious
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
 * /previous/fait:
 *   get:
 *      description: affichage de toutes les relations genre/ancien artiste
 *      tags:
 *          - faitPrevious
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
 * /previous/fait/artiste/{id}:
 *   delete:
 *      description: suppression d'une ancienne relation en fonction de l'id de l'artiste
 *      tags:
 *          - faitPrevious
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
 * /previous/fait:
 *   delete:
 *      description: supprime toutes ancienne les relations
 *      tags:
 *          - faitPrevious
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router;