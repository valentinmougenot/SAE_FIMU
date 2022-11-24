import express from 'express';
const router = express.Router()

import { create, findAll, findOne, findByYear, update, deleteOne, deleteAll } from '../controllers/artistePrevious.controller.js'

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findOne);
router.get('/year/:year', findByYear);
router.put('/:id', update);
router.delete('/:id', deleteOne);
router.delete('/', deleteAll);

export default router;