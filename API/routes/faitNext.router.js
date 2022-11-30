import express from 'express';
const router = express.Router();

import { create, findAll, findOne, update, deleteByIdArtiste, deleteAll } from '../controllers/faitNext.controller.js';

router.post('/', create);
/**
 * @swagger
 * /next/fait:
 *   post:
 *      description: Crée un lien entre genre et artiste
 *      tags:
 *          - next
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
 * /next/fait:
 *   get:
 *      description: affichage de toutes les relations genre/artiste
 *      tags:
 *          - fait
 *          - next
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
 * /next/fait/{id}:
 *   get:
 *      description: affichage d'une relation genre/artiste par son id
 *      tags:
 *          - fait
 *          - next
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
 * /next/fait/{id}:
 *   put:
 *      description: update d'une relation en fonction de son ID 
 *      tags:
 *          - next
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
 * /faitNext/artiste/{id}:
 *   delete:
 *      description: suppression d'une relation en fonction de l'id de l'artiste
 *      tags:
 *          - fait
 *          - next
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
 *          - next
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