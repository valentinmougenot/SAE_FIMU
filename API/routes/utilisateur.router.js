import express from 'express'
const router = express.Router()

import {create, findAll, findOne, update, deleteOne, deleteAll, logout, login} from '../controllers/utilisateur.controller.js'

router.post('/', create);
/**
 * @swagger
 * /utilisateur:
 *   post:
 *      description: Ajout d'un utilisateur
 *      tags:
 *          - utilisateur
 *      parameters:
 *          - in: body
 *            name: utilisateur
 *            description: L'utilisateur à ajouter
 *            schema:
 *                type: object
 *                required:
 *                  - identifiant
 *                  - mot_de_passe
 *                properties:
 *                  identifiant:
 *                     type: string
 *                     minLength: 1
 *                     maxLength: 255
 *                     example: "gjobst"
 *                  mot_de_passe:
 *                     type: string
 *                     minLength: 1
 *                     maxLength: 255
 *                     example: "PasSw0rD_4321"
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
/**
 * @swagger
 * /utilisateur/login:
 *   post:
 *      description: Connexion de l'utilisateur
 *      tags:
 *          - utilisateur
 *      parameters:
 *          - in: body
 *            name: utilisateur
 *            description: L'utilisateur à connecter
 *            schema:
 *                type: object
 *                required:
 *                  - identifiant
 *                  - mot_de_passe
 *                properties:
 *                  identifiant:
 *                     type: string
 *                     minLength: 1
 *                     maxLength: 255
 *                     example: "gjobst"
 *                  mot_de_passe:
 *                     type: string
 *                     minLength: 1
 *                     maxLength: 255
 *                     example: "PasSw0rD_4321"
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

export default router
