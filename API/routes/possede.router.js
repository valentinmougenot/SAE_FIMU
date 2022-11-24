import express from 'express';
const router = express.Router();

import { create, findAll, findOne, update, deleteByIdArtiste, deleteAll } from '../controllers/possede.controller.js';

router.post('/', create);
/**
 * @swagger
 * /possede:
 *   post:
 *      description: Crée un lien entre artiste et un réseau social 
 *      tags:
 *          - possede
 *      parameters:
 *          - in: body
 *            name: reseau_social
 *            description: Le lien du réseau social à lier à l'artiste (JOBST)
 *            schema:
 *              type: object
 *              required:
 *                - reseau_social
 *              properties:
 *                genre:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 5000
 *                  example: https://www.facebook.com/JobstOfficial
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
 * /possede:
 *   get:
 *      description: affichage de toutes les relations artiste - réseau social
 *      tags:
 *          - possede
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
 * /possede/{id}:
 *   get:
 *      description: affichage d'une relation artiste - réseau social par son id
 *      tags:
 *          - possede
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la relation artiste - réseau social
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
 * /possede/{id}:
 *   put:
 *      description: update d'une relation en fonction de son ID 
 *      tags:
 *          - possede
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la relation artiste - réseau social
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
 * /possede/artiste/{id}:
 *   delete:
 *      description: suppression d'une relation en fonction de l'id de l'artiste
 *      tags:
 *          - possede
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
 * /possede:
 *   delete:
 *      description: supprime toutes les relations
 *      tags:
 *          - possede
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router;
