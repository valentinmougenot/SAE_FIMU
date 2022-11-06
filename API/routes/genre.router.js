import express from "express";

const router = express.Router();

import {create, findAll, findOne, update, deleteOne, deleteAll} from "../controllers/genre.controller.js";

router.post("/", create);
/**
 * @swagger
 * /genre:
 *   post:
 *      description: Crée un nouveau genre
 *      tags:
 *          - genre
 *      parameters:
 *          - in: body
 *            name: genre
 *            description: Le genre à ajouter
 *            schema:
 *              type: object
 *              required:
 *                - libelle
 *              properties:
 *                libelle:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 255
 *                  example: "Rock"
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
router.get("/", findAll);
/**
 * @swagger
 * /genre:
 *   get:
 *      description: Trouver les genres pour le nom donné
 *      tags:
 *          - genre
 *      parameters:
 *          - in: query
 *            name: nom
 *            description: Nom du genre
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
router.get("/:id", findOne);
/**
 * @swagger
 * /genre/{id}:
 *   get:
 *      description: Trouver le genre pour l'ID donné
 *      tags:
 *          - genre
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du genre
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
router.put("/:id", update);
/**
 * @swagger
 * /genre/{id}:
 *   put:
 *      description: Updater le genre pour l'ID donné
 *      tags:
 *          - genre
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du genre
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
router.delete("/:id", deleteOne);
/**
 * @swagger
 * /genre/{id}:
 *   delete:
 *      description: Supprimer le genre pour l'ID donné
 *      tags:
 *          - genre
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID du genre
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
router.delete("/", deleteAll);
/**
 * @swagger
 * /genre:
 *   delete:
 *      description: Supprimer tous les genres
 *      tags:
 *          - genre
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
*/
export default router;

