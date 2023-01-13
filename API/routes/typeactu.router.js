import express from 'express';
const router = express.Router()

import { create, findAll, findOne, update, deleteOne, deleteAll } from '../controllers/typeactu.controller.js';

router.post('/', create)
/**
 * @swagger
 * /typeactu:
 *   post:
 *      description: Ajout d'un type d'actualité
 *      tags:
 *          - Type Actu
 *      parameters:
 *          - in: body
 *            name: typeactu
 *            description: Le type d'actualité à créer
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
 * /typeactu:
 *   get:
 *      description: afficher tous les types d'actualités 
 *      tags:
 *          - Type Actu   
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
 * /typeactu/{id}:
 *   get:
 *      description: Trouver le type d'actualité par son id
 *      tags:
 *          - Type Actu
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du type d'actualité
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
 * /typeactu/{id}:
 *   put:
 *      description: Updater le type d'actualité par son id
 *      tags:
 *          - Type Actu
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du type d'actualité
 *            required: true
 *            type: string
 *          - in: body
 *            name: typeactu
 *            description: Le type d'actualité à modifier
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
 * /typeactu/{id}:
 *   delete:
 *      description: Supprimer le type d'actualité par son id
 *      tags:
 *          - Type Actu
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du type d'actualité
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
 * /typeactu:
 *   delete:
 *      description: Supprimer tous les types d'actualités
 *      tags:
 *          - Type Actu
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

export default router;