import express from 'express';
const router = express.Router()

import { create, findAll, findOne, update, deleteByIdArtiste, deleteAll } from '../controllers/nationalite.controller.js'

router.post('/', create);
/**
 * @swagger
 * /nationalite:
 *   post:
 *      description: Crée un lien entre un artiste et une nationalité
 *      tags:
 *          - nationalite
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
 * /nationalite:
 *   get:
 *      description: Récupère tous les liens entre artistes et nationalités
 *      tags:
 *          - nationalite
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
 * /nationalite/{id}:
 *   get:
 *      description: affichage d'une relation entre un artiste et une nationalité
 *      tags:
 *          - nationalite
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
 * /nationalite/{id}:
 *   put:
 *      description: update d'une relation entre un artiste et une nationalité
 *      tags:
 *          - nationalite
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
 * /nationalite/artiste/{id}:
 *   delete:
 *      description: suppression d'une relation en fonction de l'id de l'artiste
 *      tags:
 *          - nationalite
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
 * /nationalite:
 *   delete:
 *      description: supprime toutes les relations entre artistes et nationalités
 *      tags:
 *          - nationalite
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router;