import express from 'express';
const router = express.Router();

import { create, findAll, deleteAll, deleteByIdStand } from '../controllers/propose.controller.js';

router.post('/', create);
/**
 * @swagger
 * /propose:
 *   post:
 *      description: Crée un lien entre un stand et un service 
 *      tags:
 *          - propose
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
 * /propose:
 *   get:
 *      description: Affichage de toutes les relations stand - service
 *      tags:
 *          - propose
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
 * /propose:
 *   delete:
 *      description: supprime toutes les relations
 *      tags:
 *          - propose
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

router.delete('/stand/:id', deleteByIdStand);
/**
 * @swagger
 * /propose/stand/{id}:
 *   delete:
 *      description: suppression d'une relation en fonction de l'id du stand
 *      tags:
 *          - propose
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du stand dont on veut supprimer les relations
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

export default router;