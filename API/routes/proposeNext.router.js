import express from 'express';
const router = express.Router();

import { create, findAll, deleteAll, deleteByIdStand } from '../controllers/proposeNext.controller.js';

router.post('/', create);
/**
 * @swagger
 * /next/propose:
 *   post:
 *      description: Crée un lien entre un stand et un service 
 *      tags:
 *          - proposeNext
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
 * /next/propose:
 *   get:
 *      description: Affichage de toutes les relations stand - service
 *      tags:
 *          - proposeNext
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
 * /next/propose:
 *   delete:
 *      description: supprime toutes les relations
 *      tags:
 *          - proposeNext
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

router.delete('/bystand/:id_stand', deleteByIdStand);
/**
 * @swagger
 * /next/propose/stand/{id}:
 *   delete:
 *      description: suppression d'une relation en fonction de l'id du stand
 *      tags:
 *          - proposeNext
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