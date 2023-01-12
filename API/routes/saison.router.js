import express from 'express'
const router = express.Router()

import {create, findAll, findOne, update, deleteOne, deleteAll, migrateDataToPreviousSeasons, migrateDataToCurrentSeason} from '../controllers/saison.controller.js'

router.post('/', create)
/**
 * @swagger
 * /saison:
 *   post:
 *      description: création d'une saison 
 *      tags:
 *          - saison
 *      parameters:
 *          - in: body
 *            name: saison
 *            description: La saison à créer
 *            schema:
 *              type: object
 *              required:
 *                - annee
 *                - couleur1
 *                - couleur2
 *              properties:
 *                annee:
 *                  type: integer
 *                  example: 2022
 *                couleur1:
 *                  type: string
 *                  example: "#38C6AB"
 *                couleur2:
 *                  type: string
 *                  example: "#F5A8AE"
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
 * /saison:
 *   get:
 *      description: affichage de tous les saison + filtre avec nom
 *      tags:
 *          - saison
 *      parameters:
 *          - in: query
 *            name: nom
 *            description: nom de la saison
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
router.get('/:id', findOne)
/**
 * @swagger
 * /saison/{id}:
 *   get:
 *      description: affichage d'une saison en fonction de son ID 
 *      tags:
 *          - saison
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la saison
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
 * /saison/{id}:
 *   put:
 *      description: update d'une saison en fonction de son ID 
 *      tags:
 *          - saison
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la saison
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
router.delete('/:id', deleteOne)
/**
 * @swagger
 * /saison/{id}:
 *   delete:
 *      description: suppression d'une saison en fonction de son ID 
 *      tags:
 *          - saison
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la saison
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
router.delete('/', deleteAll)
/**
 * @swagger
 * /saison:
 *   delete:
 *      description: supprime toutes les saisons
 *      tags:
 *          - saison
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

router.post('/migrate-data-previous', migrateDataToPreviousSeasons);
/**
 * @swagger
 * /saison/migrate-data-previous:
 *   post:
 *      description: migration des données de la saison courante vers les saisons précédentes
 *      tags:
 *          - saison
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

router.post('/migrate-data-current', migrateDataToCurrentSeason);
/**
 * @swagger
 * /saison/migrate-data-current:
 *   post:
 *      description: migration des données de la saison prochaine vers la saison courante
 *      tags:
 *          - saison
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

export default router