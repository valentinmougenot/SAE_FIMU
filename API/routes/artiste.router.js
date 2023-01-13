import express from 'express';
const router = express.Router()

import {create, findAll, findOne, update, deleteOne, deleteAll, createAll, updateAll} from '../controllers/artiste.controller.js'

router.post('/', create);
/**
 * @swagger
 * /artiste:
 *   post:
 *      description: Création d'un artiste
 *      tags:
 *          - artiste
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

router.post('/all', createAll);
/**
 * @swagger
 * /artiste/all:
 *   post:
 *      description: Création d'un artiste avec toutes les informations le concernant
 *      tags:
 *          - artiste
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
 *                - fait
 *                - nationalite
 *                - possede
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
 *                fait:
 *                  type: array
 *                  items:
 *                    type: integer
 *                    example: 1
 *                nationalite:
 *                  type: array
 *                  items:
 *                    type: integer
 *                    example: 1
 *                possede:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id_reseaux_sociaux:
 *                        type: integer
 *                        example: 1
 *                      lien:
 *                        type: string
 *                        example: "https://www.facebook.com/Chelabom/"
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
 * /artiste:
 *   get:
 *      description: affichage de tous les artistes + filtre avec nom
 *      tags:
 *          - artiste
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
 * /artiste/{id}:
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
 * /artiste/{id}:
 *   put:
 *      description: update d'un artiste en fonction de son ID 
 *      tags:
 *          - artiste
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de l'artiste
 *            required: true
 *            type: integer
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
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
router.put('/all/:id', updateAll);
/**
 * @swagger
 * /artiste/all/{id}:
 *   put:
 *      description: Création d'un artiste avec toutes les informations le concernant
 *      tags:
 *          - artiste
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
 *                - fait
 *                - nationalite
 *                - possede
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
 *                fait:
 *                  type: array
 *                  items:
 *                    type: integer
 *                    example: 1
 *                nationalite:
 *                  type: array
 *                  items:
 *                    type: integer
 *                    example: 1
 *                possede:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id_reseaux_sociaux:
 *                        type: integer
 *                        example: 1
 *                      lien:
 *                        type: string
 *                        example: "https://www.facebook.com/Chelabom/"
 * 
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
 * /artiste/{id}:
 *   delete:
 *      description: suppression d'un artiste en fonction de son ID 
 *      tags:
 *          - artiste
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
 * /artiste:
 *   delete:
 *      description: supprime tous les artistes
 *      tags:
 *          - artiste
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/


export default router;