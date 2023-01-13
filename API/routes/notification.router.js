import express from 'express';
const router = express.Router()

import {create, findAll, findOne, update, deleteOne, deleteAll} from '../controllers/notification.controller.js'

router.post('/', create);
/**
 * @swagger
 * /notification:
 *   post:
 *      description: Ajout d'une notification
 *      tags:
 *          - notification
 *      parameters:
 *          - in: body
 *            name: notification
 *            description: La notification à ajouter
 *            schema:
 *              type: object
 *              required:
 *                - date_envoi
 *                - message
 *              properties:
 *                date_envoi:
 *                  type: string
 *                  example: "2021-06-01 20:00:00"
 *                message:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: "Concert annulé"
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
 * /notification:
 *   get:
 *      description: afficher toutes les notifications
 *      tags:
 *          - notification       
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
 * /notification/{id}:
 *   get:
 *      description: Trouver la notification par son id
 *      tags:
 *          - notification
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la notification
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
router.put('/:id', update);
/**
 * @swagger
 * /notification/{id}:
 *   put:
 *      description: Updater la notification par son id
 *      tags:
 *          - notification
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la notification
 *            required: true
 *            type: string
 *          - in: body
 *            name: notification
 *            description: La notification à modifier
 *            schema:
 *              type: object
 *              required:
 *                - date_envoi
 *                - message
 *              properties:
 *                date_envoi:
 *                  type: string
 *                  example: "2021-06-01 20:00:00"
 *                message:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: "Concert annulé"
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
 * /notification/{id}:
 *   delete:
 *      description: Supprimer la notification par son id
 *      tags:
 *          - notification
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la notification
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
router.delete('/', deleteAll);
/**
 * @swagger
 * /notification:
 *   delete:
 *      description: Supprimer toutes les notifications
 *      tags:
 *          - notification
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

export default router;