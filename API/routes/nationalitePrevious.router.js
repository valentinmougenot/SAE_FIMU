import express from 'express';
const router = express.Router();

import { create, findAll, findOne, update, deleteByIdArtiste, deleteAll } from '../controllers/nationalitePrevious.controller.js';

router.post('/', create);
/**
 * @swagger
 * /previous/nationalite:
 *   post:
 *      description: Crée un lien entre un artiste et une nationalité
 *      tags:
 *          - nationalitePrevious
 *      parameters:
 *          - in: body
 *            name: id_pays
 *            description: L'id du pays
 *          - in: body
 *            name: id_artiste
 *            description: L'id de l'artiste
 *            schema:
 *              type: object
 *              required:
 *                - id_pays
 *                - id_artiste
 *              properties:
 *                id_pays:
 *                  type: integer
 *                  example: 1
 *                id_artiste:
 *                  type: integer
 *                  example: 1
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
 * /nationaliteNext:
 *   get:
 *      description: Récupère tous les liens entre artistes et nationalités
 *      tags:
 *          - nationaliteNext
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
 * /nationaliteNext/{id}:
 *   get:
 *      description: affichage d'une relation entre un artiste et une nationalité
 *      tags:
 *          - nationaliteNext
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la relation nationalité/artiste
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
 * /nationaliteNext/{id}:
 *   put:
 *      description: update d'une relation entre un artiste et une nationalité
 *      tags:
 *          - nationaliteNext
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
 * /nationaliteNext/artiste/{id}:
 *   delete:
 *      description: suppression d'une relation en fonction de l'id de l'artiste
 *      tags:
 *          - nationaliteNext
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
 * /nationaliteNext:
 *   delete:
 *      description: supprime toutes les relations entre artistes et nationalités
 *      tags:
 *          - nationaliteNext
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router;