import express from 'express';
const router = express.Router()

import { create, findAll, findOne, update, deleteOne, deleteAll } from '../controllers/actualite.controller.js';

router.post('/', create);
/**
 * @swagger
 * /actualite:
 *   post:
 *      description: Création d'une actualité
 *      tags:
 *          - actualite
 *      parameters:
 *          - in: body
 *            name: actualite
 *            description: L'actualité à ajouter
 *            schema:
 *              type: object
 *              required:
 *                - titre
 *                - contenu
 *                - id_typeactu
 *              properties:
 *                nom:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: "La saison 2023 est là !"
 *                contenu:
 *                  type: string
 *                  minLength: 1
 *                  example: "L'équipe du FIMU vous propose encore une fois cette année un festival qui se tiendra en fin juin, soyez présents !"
 *                id_typeactu:
 *                  type: integer 
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
 * /actualite:
 *   get:
 *      description: affichage de tous les actualités + filtre avec nom
 *      tags:
 *          - actualite
 *      parameters:
 *          - in: query
 *            name: nom
 *            description: nom de l'actualité
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
 * /actualite/{id}:
 *   get:
 *      description: affichage d'une actualité en fonction de son ID 
 *      tags:
 *          - actualite
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de l'actualité
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
 * /actualite/{id}:
 *   put:
 *      description: update d'une actualité en fonction de son ID 
 *      tags:
 *          - actualite
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de l'actualité
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
 * /actualite/{id}:
 *   delete:
 *      description: suppression d'une actualité en fonction de son ID 
 *      tags:
 *          - actualite
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de l'actualité
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
 * /actualite:
 *   delete:
 *      description: supprime toutes les actualités
 *      tags:
 *          - actualite
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

export default router;