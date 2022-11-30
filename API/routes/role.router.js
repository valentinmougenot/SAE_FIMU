import express from 'express';
const router = express.Router();

import {create, findAll, findOne, update, deleteOne, deleteAll} from '../controllers/role.controller.js';

router.post('/', create);
/**
 * @swagger
 * /roles:
 *   post:
 *      description: Crée un rôle
 *      tags:
 *          - roles
 *      parameters:
 *          - in: body
 *            name: reseau_social
 *            description: Le lien du réseau social à lier à l'artiste (JOBST)
 *            schema:
 *              type: object
 *              required:
 *                - reseau_social
 *              properties:
 *                genre:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 5000
 *                  example: https://www.facebook.com/JobstOfficial
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
router.get('/:id', findOne);
router.put('/:id', update);
router.delete('/:id', deleteOne);
router.delete('/', deleteAll);

export default router;