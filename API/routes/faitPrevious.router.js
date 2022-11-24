import express from 'express';
const router = express.Router()

import { create, findAll, findOne, update, deleteByIdArtiste, deleteAll } from '../controllers/faitPrevious.controller.js'

router.post('/', create);
/**
 * @swagger
 * /fait:
 *   post:
 *      description: Crée un lien entre genre et ancien artiste
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
 *      description: affichage de toutes les relations genre/ancien artiste
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
router.get('/:id', findOne);
/**
 * @swagger
 * /fait/{id}:
 *   get:
 *      description: affichage d'une relation genre/ancien artiste par son id
 *      tags:
 *          - fait
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la relation genre/artiste
 *            required: false
 *            type: integer
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
router.put('/:id', update);
/**
 * @swagger
 * /fait/{id}:
 *   put:
 *      description: update d'une ancienne relation en fonction de son ID 
 *      tags:
 *          - fait
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la relation genre/artiste
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
router.delete('/artiste/:id', deleteByIdArtiste);
/**
 * @swagger
 * /fait/artiste/{id}:
 *   delete:
 *      description: suppression d'une ancienne relation en fonction de l'id de l'artiste
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
 *      description: supprime toutes ancienne les relations
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