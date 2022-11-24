import express from 'express';
const router = express.Router();

import { create, findAll, findOne, update, deleteByIdArtiste, deleteAll } from '../controllers/faitNext.controller.js';

router.post('/', create);
/**
 * @swagger
 * /faitNext:
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
 * /faitNext:
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
router.get('/:id', findOne);
/**
 * @swagger
 * /faitNext/{id}:
 *   get:
 *      description: affichage d'une relation genre/artiste par son id
 *      tags:
 *          - faitNext
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
 * /faitNext/{id}:
 *   put:
 *      description: update d'une relation en fonction de son ID 
 *      tags:
 *          - faitNext
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
 * /faitNext/artiste/{id}:
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
 * /faitNext:
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