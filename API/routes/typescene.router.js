import express from 'express'
const router = express.Router()

import {create, findAll, findOne, update, deleteOne, deleteAll} from '../controllers/typescene.controller.js'

router.post('/', create)
/**
 * @swagger
 * /typescene:
 *   post:
 *      description: Ajout d'un type de scène
 *      tags:
 *          - typeScene
 *      parameters:
 *          - in: body
 *            name: typescene
 *            description: Le type de scène à créer
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
 * /typescene:
 *   get:
 *      description: afficher tous les types de scènes 
 *      tags:
 *          - typeScene      
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
 * /typescene/{id}:
 *   get:
 *      description: Trouver le type de scène par son id
 *      tags:
 *          - typeScene
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du type de scène
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
 * /typescene/{id}:
 *   put:
 *      description: Updater le type de scène par son id
 *      tags:
 *          - typeScene
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du type de scène
 *            required: true
 *            type: string
 *          - in: body
 *            name: typescene
 *            description: Le type de scène à modifier
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
 * /typescene/{id}:
 *   delete:
 *      description: Supprimer le type de scène par son id
 *      tags:
 *          - typeScene
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du type de scène
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
 * /typescene:
 *   delete:
 *      description: Supprimer tous les types de scènes
 *      tags:
 *          - typeScene
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router