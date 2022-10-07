import express from 'express';
const router = express.Router()

import {list, findID} from '../controllers/concert.controller.js';

router.get('/', list);
router.get('/:id', findID);

export default router;