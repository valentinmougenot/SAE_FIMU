import express from 'express';
const router = express.Router();

import { create, findAll, findOne, update, deleteByIdArtiste, deleteAll } from '../controllers/jouePrevious.controller.js';

router.post('/', create);
/**
 * @swagger
 * /previous/joue:
 *   post:
 *      description: Create a new previous joue 
 *      tags:
 *          - previousJoue
 *      parameters:
 *          - in: body
 *            name: concert
 *            description: Le prochain concert à ajouter
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
router.get('/', findAll);
router.get('/:id', findOne);
router.put('/:id', update);
router.delete('/artiste/:id', deleteByIdArtiste);
router.delete('/', deleteAll);

export default router;