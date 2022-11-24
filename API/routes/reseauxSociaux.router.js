import express from 'express';
const router = express.Router();

import { create, findAll, findOne, update, deleteOne, deleteAll } from '../controllers/reseauxSociaux.controller.js';

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findOne);
router.put('/:id', update);
router.delete('/:id', deleteOne);
router.delete('/', deleteAll);

export default router;