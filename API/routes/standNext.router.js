import express from 'express';
const router = express.Router();

import { create, findAll, findOne, update, deleteOne, deleteAll } from '../controllers/standNext.controller.js';

router.post('/', create);
/**
 * @swagger
 * /next/stand:
 *   post:
 *      description: Ajout d'un stand
 *      tags:
 *          - standNext
 *      parameters:
 *          - in: body
 *            name: stand
 *            description: Le stand à ajouter
 *            schema:
 *                type: object
 *                required:
 *                  - libelle
 *                  - latitude
 *                  - longitude
 *                  - id_typestand
 *                properties:
 *                  libelle:
 *                     type: string
 *                     minLength: 1
 *                     maxLength: 255
 *                     example: "Kebab du coin"
 *                  latitude:
 *                     type: float
 *                     example: 48.856614
 *                  longitude:
 *                     type: float
 *                     example: 2.3522219
 *                  id_typestand:
 *                     type: integer
 *                     example: 1
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
 * /next/stand:
 *   get:
 *      description: afficher tous les stands 
 *      tags:
 *          - standNext
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
 * /next/stand/{id}:
 *   get:
 *      description: afficher un stand en fonction de l'id
 *      tags:
 *          - standNext
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du stand
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
router.put('/:id', update);
/**
 * @swagger
 * /next/stand/{id}:
 *   put:
 *      description: modifier un stand
 *      tags:
 *          - standNext
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du stand à modifier
 *            required: true
 *            type: integer  
 *          - in: body
 *            name: stand
 *            description: Le stand à modifier
 *            schema:
 *                type: object
 *                required:
 *                  - libelle
 *                  - latitude
 *                  - longitude
 *                  - id_typestand
 *                properties:
 *                  libelle:
 *                     type: string
 *                     minLength: 1
 *                     maxLength: 255
 *                     example: "Kebab du coin"
 *                  latitude:
 *                     type: float
 *                     example: 48.856614
 *                  longitude:
 *                     type: float
 *                     example: 2.3522219
 *                  id_typestand:
 *                     type: integer
 *                     example: 1       
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
router.delete('/:id', deleteOne);
/**
 * @swagger
 * /next/stand/{id}:
 *   delete:
 *      description: supprimer un stand
 *      tags:
 *          - standNext
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du stand à supprimer
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
 * /next/stand:
 *   delete:
 *      description: supprimer tous les stands
 *      tags:
 *          - standNext
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

export default router;