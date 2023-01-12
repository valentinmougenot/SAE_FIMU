import express from 'express';
const router = express.Router();

import { create, findAll, findOne, update, deleteByIdArtiste, deleteAll } from '../controllers/possedeNext.controller.js';

router.post('/', create);
/**
 * @swagger
 * /next/possede:
 *   post:
 *      description: Crée un lien entre artiste et un réseau social 
 *      tags:
 *          - next
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
 * /next/possede:
 *   get:
 *      description: affichage de toutes les relations artiste - réseau social
 *      tags:
 *          - possede
 *          - next
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
 * /next/possede/artiste/{id}:
 *   delete:
 *      description: suppression d'une relation en fonction de l'id de l'artiste
 *      tags:
 *          - possede
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
 * /next/possede:
 *   delete:
 *      description: supprime toutes les relations
 *      tags:
 *          - possede
 *          - next
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router;
