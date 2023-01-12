import express from 'express';
const router = express.Router();

import {create, findAll, findOne, update, deleteOne, deleteAll} from '../controllers/role.controller.js';

router.post('/', create);
/**
 * @swagger
 * /role:
 *   post:
 *      description: Crée un rôle
 *      tags:
 *          - roles
 *      parameters:
 *          - in: body
 *            name: role
 *            description: Le rôle à créer
 *            schema:
 *              type: object
 *              required:
 *                - libelle
 *              properties:
 *                libelle:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 5000
 *                  example: "Administrateur"
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
 * /role:
 *   get:
 *      description: Trouve tous les rôles
 *      tags:
 *          - roles
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
 * /role/{id}:
 *   get:
 *      description: Récupère le role d'id donné
 *      tags:
 *          - roles
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du rôle
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
 * /role/{id}:
 *   put:
 *      description: Update le role d'id donné
 *      tags:
 *          - roles
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du rôle
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
 * /role/{id}:
 *   put:
 *      description: Supprime le role d'id donné
 *      tags:
 *          - roles
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du rôle
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
 * /role:
 *   delete:
 *      description: Supprime tous les rôles
 *      tags:
 *          - roles
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router;