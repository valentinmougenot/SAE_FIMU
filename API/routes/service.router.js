import express from 'express';
const router = express.Router();

import { create, findAll, findOne, update, deleteOne, deleteAll } from '../controllers/service.controller.js';

router.post('/', create);
/**
 * @swagger
 * /service:
 *   post:
 *      description: Ajout d'un service
 *      tags:
 *          - service
 *      parameters:
 *          - in: body
 *            name: service
 *            description: Le service à ajouter
 *            schema:
 *                type: object
 *                required:
 *                  - libelle
 *                properties:
 *                  libelle:
 *                     type: string
 *                     minLength: 1
 *                     maxLength: 255
 *                     example: "Arsenal"
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
 * /service:
 *   get:
 *      description: afficher tous les services 
 *      tags:
 *          - service
 *      parameters:
 *          - in: query
 *            name: libelle
 *            description: libelle d'un service pour filtrer
 *            required: false
 *            type: string         
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
 * /service/{id}:
 *   get:
 *      description: afficher un service en fonction de l'id
 *      tags:
 *          - service
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du service
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
 * /service/{id}:
 *   put:
 *      description: modifier un service
 *      tags:
 *          - service
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du service à modifier
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
router.delete('/:id', deleteOne);
/**
 * @swagger
 * /service/{id}:
 *   delete:
 *      description: supprimer un service
 *      tags:
 *          - service
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du service à supprimer
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
 * /service:
 *   delete:
 *      description: supprimer tous les services
 *      tags:
 *          - service        
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

export default router;