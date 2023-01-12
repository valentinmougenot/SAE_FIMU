import express from 'express';
const router = express.Router()

import { create, findAll, findOne, deleteByIdArtiste, deleteAll } from '../controllers/fait.controller.js'

router.post('/', create);
/**
 * @swagger
 * /fait:
 *   post:
 *      description: Crée un lien entre genre et artiste
 *      tags:
 *          - fait
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
 * /fait:
 *   get:
 *      description: affichage de toutes les relations genre/artiste
 *      tags:
 *          - fait
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
 * /fait/artiste/{id}:
 *   delete:
 *      description: suppression d'une relation en fonction de l'id de l'artiste
 *      tags:
 *          - fait
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
 * /fait:
 *   delete:
 *      description: supprime toutes les relations
 *      tags:
 *          - fait
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router;