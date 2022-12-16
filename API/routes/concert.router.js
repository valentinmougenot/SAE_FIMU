import express from 'express';
const router = express.Router()

import {create, findAll, findOne, findByDate, update, deleteOne, deleteAll, getDates} from '../controllers/concert.controller.js'

router.post('/', create)
/**
 * @swagger
 * /concert:
 *   post:
 *      description: Create a new concert
 *      tags:
 *          - Concerts
 *      parameters:
 *          - in: body
 *            name: concert
 *            description: Le concert à ajouter
 *            schema:
 *              type: object
 *              required:
 *                - id_scene
 *                - id_artiste
 *                - date_debut
 *                - duree
 *                - nb_personnes
 *                - annee
 *              properties:
 *                id_scene:
 *                  type: integer
 *                  example: 1
 *                id_artiste:
 *                  type: integer
 *                  example: 1
 *                date_debut:
 *                  type: string
 *                  example: "2021-06-01 20:00:00"
 *                duree:
 *                  type: integer
 *                  example: 120
 *                nb_personnes:
 *                  type: integer
 *                  example: 100
 *                annee:
 *                  type: integer
 *                  example: 2022
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
 * /concert:
 *   get:
 *      description: Trouver les concerts pour le nom donné
 *      tags:
 *          - Concerts
 *      parameters:
 *          - in: query
 *            name: nom
 *            description: Nom du concert
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

router.get('/date', getDates);

router.get('/:id', findOne)
/**
 * @swagger
 * /concert/{id}:
 *   get:
 *      description: Trouver le concert pour l'id donné
 *      tags:
 *          - Concerts
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du concert
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

router.get('/date/:date', findByDate)
/**
 * @swagger
 * /concert/date/{date}:
 *   get:
 *      description: Trouver le concert pour la date donnée
 *      tags:
 *          - Concerts
 *      parameters:
 *          - in: path
 *            name: date
 *            description: date du concert
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
router.put('/:id', update)
/**
 * @swagger
 * /concert/{id}:
 *   put:
 *      description: Updater le concert pour l'id donné
 *      tags:
 *          - Concerts
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du concert
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
router.delete('/:id', deleteOne)
/**
 * @swagger
 * /concert/{id}:
 *   delete:
 *      description: Supprimer le concert pour l'id donné
 *      tags:
 *          - Concerts
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du concert
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
 * /concert:
 *   delete:
 *      description: Supprimer tous les concerts
 *      tags:
 *          - Concerts
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

export default router;