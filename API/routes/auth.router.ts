import {Router} from "express";
const router = Router();
import {verifySignUp} from "../middleware";
import authController from "../controllers/auth.controller";

router.post('/signup', [verifySignUp.checkDuplicateUsername], authController.signup);
router.post('/signin', authController.signin);

export default router;