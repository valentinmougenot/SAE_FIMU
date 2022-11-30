import express from 'express'
const router = express.Router()

import {create, findAll, findOne, update, deleteOne, deleteAll, logout, login} from '../controllers/utilisateur.controller.js'

router.post('/', create);

router.get('/', findAll);
/**
 * @swagger
 * /utilisateur:
 *   get:
 *      description: affichage de tous les utilisateurs
 *      tags:
 *          - utilisateur
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
 * /utilisateur/{id}:
 *   get:
 *      description: Trouver l'utilisateur par son identifiant
 *      tags:
 *          - utilisateur
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de l'utilisateur
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
router.put('/:id', update);
/**
 * @swagger
 * /utilisateur/{id}:
 *   put:
 *      description: Updater l'utilisateur par son identifiant
 *      tags:
 *          - utilisateur
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de l'utilisateur
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
router.delete('/:id', deleteOne);
/**
 * @swagger
 * /utilisateur/{id}:
 *   delete:
 *      description: suppression d'un utilisateur par son identifiant
 *      tags:
 *          - utilisateur
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de l'utilisateur à supprimer
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
 * /utilisateur:
 *   delete:
 *      description: Supprimer tous les utilisateurs
 *      tags:
 *          - utilisateur
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
router.post('/logout', logout);
/**
 * @swagger
 * /utilisateur:
 *   post:
 *      description: Déconnexion de l'utilisateur
 *      tags:
 *          - utilisateur
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
router.post('/login', login);


export default router
