import {Router} from 'express';
const router = Router();

import reseauxSociauxController from '../controllers/reseauxSociaux.controller';

router.get('/', reseauxSociauxController.getReseauxSociaux);
router.get('/:id', reseauxSociauxController.getReseauSocialById);
router.post('/', reseauxSociauxController.createReseauSocial);
router.put('/:id', reseauxSociauxController.editReseauSocial);
router.delete('/', reseauxSociauxController.deleteReseauxSociaux);
router.delete('/:id', reseauxSociauxController.deleteReseauSocialById);

export default router;