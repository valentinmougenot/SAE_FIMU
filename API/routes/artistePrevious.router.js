import express from 'express';
const router = express.Router()

import { create, findAll, findOne, findByYear, update, deleteOne, deleteAll } from '../controllers/artistePrevious.controller.js'

router.post('/', create);
/**
 * @swagger
 * /previous/artiste:
 *   post:
 *      description: Création d'un artiste
 *      tags:
 *          - artistePrevious
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
 *                - lien_site
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
 *                lien_site:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: "https://www.wikipedia.org"
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
 * /previous/artiste:
 *   get:
 *      description: affichage de tous les artistes + filtre avec nom
 *      tags:
 *          - artistePrevious
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
 * /previous/artiste/{id}:
 *   get:
 *      description: affichage d'un artiste en fonction de son ID 
 *      tags:
 *          - artistePrevious
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
router.get('/year/:year', findByYear);
/**
 * @swagger
 * /previous/artiste/year/{year}:
 *   get:
 *      description: affichage d'un artiste en fonction de son année
 *      tags:
 *          - artistePrevious
 *      parameters:
 *          - in: path
 *            name: year
 *            description: année de l'artiste
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
 * /previous/artiste/{id}:
 *   put:
 *      description: update d'un artiste en fonction de son ID 
 *      tags:
 *          - artistePrevious
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de l'artiste
 *            required: true
 *            type: integer
 *          - in: body
 *            name: artiste
 *            description: L'artiste à modifier
 *            schema:
 *              type: object
 *              required:
 *                - nom
 *                - photo
 *                - biographie
 *                - lien_video
 *                - lien_site
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
 *                lien_site:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: "https://www.wikipedia.org"
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
 * /previous/artiste/{id}:
 *   delete:
 *      description: suppression d'un artiste en fonction de son ID 
 *      tags:
 *          - artistePrevious
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
 * /previous/artiste:
 *   delete:
 *      description: supprime tous les artistes
 *      tags:
 *          - artistePrevious
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router;