import express from 'express';
const router = express.Router()

import {create, findAll, findOne, findByDate, update, deleteOne, deleteAll, getDates} from '../controllers/concertNext.controller.js'

router.post('/', create);
/**
 * @swagger
 * /next/concert:
 *   post:
 *      description: Create a new next concert
 *      tags:
 *          - concertNext
 *      parameters:
 *          - in: body
 *            name: concert
 *            description: Le prochain concert à ajouter
 *            schema:
 *              type: object
 *              required:
 *                - id_scene
 *                - id_artiste
 *                - heure_debut
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
 *                heure_debut:
 *                  type: string
 *                  example: "20:00"
 *                date_debut:
 *                  type: string
 *                  example: "2021-06-01"
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
router.get('/', findAll);
/**
 * @swagger
 * /next/concert:
 *   get:
 *      description: Trouver les prochains concerts pour le nom donné
 *      tags:
 *          - concertNext
 *      parameters:
 *          - in: query
 *            name: nom
 *            description: Nom du prochain concert
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
/**
 * @swagger
 * /next/concert/date:
 *   get:
 *      description: Trouver toutes les dates des concerts
 *      tags:
 *          - concertNext
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
 * /next/concert/{id}:
 *   get:
 *      description: Trouver le prochain concert pour l'id donné
 *      tags:
 *          - concertNext
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
router.get('/date/:date', findByDate)
/**
 * @swagger
 * /next/concert/date/{date}:
 *   get:
 *      description: Trouver le concert pour la date donnée
 *      tags:
 *          - concertNext
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
 * /next/concert/{id}:
 *   put:
 *      description: Updater le concert pour l'id donné
 *      tags:
 *          - concertNext
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du concert
 *            required: false
 *            type: string
 *          - in: body
 *            name: concert
 *            description: Le concert à modifier
 *            schema:
 *              type: object
 *              required:
 *                - id_scene
 *                - id_artiste
 *                - heure_debut
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
 *                heure_debut:
 *                  type: string
 *                  example: "20:00"
 *                date_debut:
 *                  type: string
 *                  example: "2021-06-01"
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
router.delete('/:id', deleteOne);
/**
 * @swagger
 * /next/concert/{id}:
 *   delete:
 *      description: Supprimer le prochain concert pour l'id donné
 *      tags:
 *          - concertNext
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
router.delete('/', deleteAll);
/**
 * @swagger
 * /next/concert:
 *   delete:
 *      description: Supprimer tous les prochains concerts
 *      tags:
 *          - concertNext
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

export default router;