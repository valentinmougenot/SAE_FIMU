import express from 'express';
const router = express.Router();

import { create, findAll, findOne, update, deleteOne, deleteAll } from '../controllers/typestand.controller.js';

router.post('/', create)
/**
 * @swagger
 * /typestand:
 *   post:
 *      description: Ajout d'un type de stand
 *      tags:
 *          - typeStand
 *      parameters:
 *          - in: body
 *            name: typestand
 *            description: Le type de stand à créer
 *            schema:
 *              type: object
 *              required:
 *                - libelle
 *              properties:
 *                libelle:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: Intérieur
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.get('/', findAll)
/**
 * @swagger
 * /typestand:
 *   get:
 *      description: afficher tous les types de stands 
 *      tags:
 *          - typeStand
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
router.get('/:id', findOne)
/**
 * @swagger
 * /typestand/{id}:
 *   get:
 *      description: Trouver le type de stand par son id
 *      tags:
 *          - typeStand
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du type de stand
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
router.put('/:id', update)
/**
 * @swagger
 * /typestand/{id}:
 *   put:
 *      description: Updater le type de stand par son id
 *      tags:
 *          - typeStand
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du type de stand
 *            required: true
 *            type: string
 *          - in: body
 *            name: typestand
 *            description: Le type de stand à modifier
 *            schema:
 *              type: object
 *              required:
 *                - libelle
 *              properties:
 *                libelle:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: Intérieur
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
router.delete('/:id', deleteOne)
/**
 * @swagger
 * /typestand/{id}:
 *   delete:
 *      description: Supprimer le type de stand par son id
 *      tags:
 *          - typeStand
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du type de stand
 *            required: true
 *            type: string
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
router.delete('/', deleteAll)
/**
 * @swagger
 * /typestand:
 *   delete:
 *      description: Supprimer tous les types de stands
 *      tags:
 *          - typeStand
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

export default router;