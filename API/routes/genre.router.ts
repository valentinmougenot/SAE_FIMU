import {Router} from 'express';
const router = Router();

import genreController from '../controllers/genre.controller';

router.get('/', genreController.getGenres);
router.get('/:id', genreController.getGenreById);
router.post('/', genreController.createGenre);
router.put('/:id', genreController.editGenre);
router.delete('/', genreController.deleteGenres);
router.delete('/:id', genreController.deleteGenreById);

export default router;