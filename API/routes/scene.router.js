import express from 'express';
const router = express.Router()

import {create, findAll, findOne, update, deleteOne, deleteAll} from '../controllers/scene.controller.js';

router.post('/', create);
/**
 * @swagger
 * /scene:
 *   post:
 *      description: Ajout d'une scène
 *      tags:
 *          - scene
 *      parameters:
 *          - in: body
 *            name: scene
 *            description: La scène à ajouter
 *            schema:
 *                type: object
 *                required:
 *                  - libelle
 *                  - jauge
 *                  - latitude
 *                  - longitude
 *                  - id_typescene
 *                properties:
 *                  libelle:
 *                     type: string
 *                     minLength: 1
 *                     maxLength: 255
 *                     example: "Arsenal"
 *                  jauge:
 *                     type: integer
 *                     example: 1500
 *                  latitude:
 *                     type: float
 *                     example: 48.856614
 *                  longitude:
 *                     type: float
 *                     example: 2.3522219
 *                  id_typescene:
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
 * /scene:
 *   get:
 *      description: afficher toutes les scènes 
 *      tags:
 *          - scene      
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
 * /scene/{id}:
 *   get:
 *      description: afficher une scène en fonction de l'id
 *      tags:
 *          - scene
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la scène
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
 * /scene/{id}:
 *   put:
 *      description: modifier une scène
 *      tags:
 *          - scene
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la scène à modifier
 *            required: true
 *            type: integer    
 *          - in: body
 *            name: scene
 *            description: La scène à modifier
 *            schema:
 *                type: object
 *                required:
 *                  - libelle
 *                  - jauge
 *                  - latitude
 *                  - longitude
 *                  - id_typescene
 *                properties:
 *                  libelle:
 *                     type: string
 *                     minLength: 1
 *                     maxLength: 255
 *                     example: "Arsenal"
 *                  jauge:
 *                     type: integer
 *                     example: 1500
 *                  latitude:
 *                     type: float
 *                     example: 48.856614
 *                  longitude:
 *                     type: float
 *                     example: 2.3522219
 *                  id_typescene:
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
 * /scene/{id}:
 *   delete:
 *      description: supprimer une scène
 *      tags:
 *          - scene
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la scène à supprimer
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
 * /scene:
 *   delete:
 *      description: supprimer toutes les scènes
 *      tags:
 *          - scene        
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

export default router;