import express from 'express';
const router = express.Router();

import { create, findAll, findOne, update, deleteOne, deleteAll } from '../controllers/reseauxSociaux.controller.js';

router.post('/', create);
/**
 * @swagger
 * /reseauxsociaux:
 *   post:
 *      description: Ajout d'un réseau social
 *      tags:
 *          - reseauxSociaux
 *      parameters:
 *          - in: body
 *            name: reseauxSociaux
 *            description: Le réseau social à ajouter
 *            schema:
 *                type: object
 *                required:
 *                  - libelle
 *                  - logo
 *                properties:
 *                  libelle:
 *                     type: string
 *                     minLength: 1
 *                     maxLength: 255
 *                     example: "Twitter"
 *                  logo:
 *                     type: string
 *                     minLength: 1
 *                     maxLength: 255
 *                     example: "MDI-Twitter"
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
 * /reseauxsociaux:
 *   get:
 *      description: afficher tous les réseaux sociaux 
 *      tags:
 *          - reseauxSociaux       
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
 * /reseauxsociaux/{id}:
 *   get:
 *      description: afficher un réseau social en fonction de l'id
 *      tags:
 *          - reseauxSociaux
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du réseau social
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

router.put('/:id', update);
/**
 * @swagger
 * /reseauxsociaux/{id}:
 *   put:
 *      description: modifier un réseau social
 *      tags:
 *          - reseauxSociaux
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du réseau social à modifier
 *            required: true
 *            type: integer  
 *          - in: body
 *            name: reseauxSociaux
 *            description: Le réseau social à modifier
 *            schema:
 *                type: object
 *                required:
 *                  - libelle
 *                  - logo
 *                properties:
 *                  libelle:
 *                     type: string
 *                     minLength: 1
 *                     maxLength: 255
 *                     example: "Twitter"
 *                  logo:
 *                     type: string
 *                     minLength: 1
 *                     maxLength: 255
 *                     example: "MDI-Twitter"       
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
 * /reseauxsociaux/{id}:
 *   delete:
 *      description: supprimer un réseau social
 *      tags:
 *          - reseauxSociaux
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id du réseau social à supprimer
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
 * /reseauxsociaux:
 *   delete:
 *      description: supprimer tous les réseaux sociaux
 *      tags:
 *          - reseauxSociaux        
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/

export default router;