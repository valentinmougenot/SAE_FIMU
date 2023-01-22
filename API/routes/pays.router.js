import express from 'express';
const router = express.Router()

import {create, findAll, findOne, update, deleteOne, deleteAll} from '../controllers/pays.controller.js'

router.post("/", create);
/**
 * @swagger
 * /pays:
 *   post:
 *      description: Crée un nouveau pays
 *      tags:
 *          - pays
 *      parameters:
 *          - in: body
 *            name: pays
 *            description: Le pays à créer
 *            schema:
 *              type: object
 *              required:
 *                - libelle 
 *              properties:
 *                libelle:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: France
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
 * /pays:
 *   get:
 *      description: Trouver les pays pour le nom donné
 *      tags:
 *          - pays
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
 * /pays/{id}:
 *   get:
 *      description: Trouver le pays pour l'id donné
 *      tags:
 *          - pays
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du pays
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
 * /pays/{id}:
 *   put:
 *      description: Updater le pays pour l'id donné
 *      tags:
 *          - pays
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du pays
 *            required: false
 *            type: string
 *          - in: body
 *            name: pays
 *            description: Le pays à modifier
 *            schema:
 *              type: object
 *              required:
 *                - libelle 
 *              properties:
 *                libelle:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: France
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
 * /pays/{id}:
 *   delete:
 *      description: Supprimer le pays pour l'id donné
 *      tags:
 *          - pays
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du pays
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
router.delete('/', deleteAll)
/**
 * @swagger
 * /pays:
 *   delete:
 *      description: Supprimer tous les pays
 *      tags:
 *          - pays
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router