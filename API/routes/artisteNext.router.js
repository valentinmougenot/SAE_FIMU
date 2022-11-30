import express from 'express';
const router = express.Router()

import {create, findAll, findOne, update, deleteOne, deleteAll} from '../controllers/artisteNext.controller.js'

router.post('/', create);
/**
 * @swagger
 * /next/artiste:
 *   post:
 *      description: Création d'un artiste
 *      tags:
 *          - artisteNext
 *      parameters:
 *          - in: body
 *            name: artiste
 *            description: L'artiste à ajouter
 *            schema:
 *              type: object
 *              required:
 *                - nom
 *                - photo
 *                - biographie
 *                - lien_video
 *                - id_categorie
 *              properties:
 *                nom:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: "Chelabôm"
 *                photo:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: "https://www.fimu.com/fileadmin/_processed_/0/d/csm_MA_Chelabom_30a15bcc78.jpg"
 *                biographie:
 *                  type: string
 *                  example: "Composé de cinq musiciens d’horizons différents, Chelabôm s’est créé début 2019. Sur des bases funk et néo-soul, on voyage entre la musique Afro, l’Amérique du Sud, les rythmes hip-hop et Jungle, le jazz et le rock. Au centre, une chanteuse tord sa voix comme elle manie les mots, avec ardeur teinté de lyrisme. En espagnol, en français ou en anglais, le groupe présente un concert d’une intense émotion."
 *                lien_video:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: "https://www.youtube.com/watch?v=brJVpnyVuPE"
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
 * /next/artiste:
 *   get:
 *      description: affichage de tous les artistes + filtre avec nom
 *      tags:
 *          - artisteNext
 *      parameters:
 *          - in: query
 *            name: nom
 *            description: nom de l'artiste
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
router.get('/:id', findOne);
/**
 * @swagger
 * /next/artiste/{id}:
 *   get:
 *      description: affichage d'un artiste en fonction de son ID 
 *      tags:
 *          - artiste
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de l'artiste
 *            required: false
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
 * /next/artiste/{id}:
 *   put:
 *      description: update d'un artiste en fonction de son ID 
 *      tags:
 *          - artisteNext
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de l'artiste
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
 * /next/artiste/{id}:
 *   delete:
 *      description: suppression d'un artiste en fonction de son ID 
 *      tags:
 *          - artisteNext
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de l'artiste
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
 * /next/artiste:
 *   delete:
 *      description: supprime tous les artistes
 *      tags:
 *          - artisteNext
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router;