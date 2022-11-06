import express from 'express';
const router = express.Router();

import {create, findAll, findOne, update, deleteOne, deleteAll} from '../controllers/categorie.controller.js';

router.post('/', create);
/**
 * @swagger
 * /categorie:
 *   post:
 *      description: création d'une catégorie
 *      tags:
 *          - catégorie
 *      parameters:
 *          - in: body
 *            name: categorie
 *            description: La catégorie à ajouter
 *            schema:
 *              type: object
 *              required:
 *                - libelle
 *              properties:
 *                libelle:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: "Musiques du monde"
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
 * /categorie:
 *   get:
 *      description: affichage de toutes les catégorie + filtre avec nom
 *      tags:
 *          - catégorie
 *      parameters:
 *          - in: query
 *            name: nom
 *            description: nom de la catégorie
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
 * /categorie/{id}:
 *   get:
 *      description: affichage d'une catégorie en fonction de son ID 
 *      tags:
 *          - catégorie
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la catégorie
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
 * /categorie/{id}:
 *   put:
 *      description: update d'une catégorie en fonction de son ID 
 *      tags:
 *          - catégorie
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la catégorie
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
 * /categorie/{id}:
 *   delete:
 *      description: suppression d'une catégorie en fonction de son ID 
 *      tags:
 *          - catégorie
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la catégorie
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
 * /categorie:
 *   delete:
 *      description: supprime tous les catégories
 *      tags:
 *          - catégorie
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router;