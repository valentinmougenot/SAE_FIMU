import express from 'express';
const router = express.Router();

import { create, findAll, findOne, update, deleteByIdArtiste, deleteAll } from '../controllers/possedeNext.controller.js';

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findOne);
router.put('/:id', update);
router.delete('/artiste/:id', deleteByIdArtiste);
router.delete('/', deleteAll);

export default router;