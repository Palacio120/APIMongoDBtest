import { Router } from "express";
import { login, register, infoUser, refreshToken, logout } from "../Controllers/auth.controller.js";
import { bodyLoginValidation, bodyRegisterValidation } from "../Midelwares/validationResultsExpress.js";
import { requireToken } from "../Midelwares/requireToken.js";
import { body } from "express-validator";
import { requireRefreshToken } from "../Midelwares/requireRefreshToken.js";
const router = Router();


router.post('/register', 
bodyRegisterValidation,
    register);

router.post('/login', 
    bodyLoginValidation,
    login);

router.get('/confidential',requireToken, infoUser);
router.get('/refresh',requireRefreshToken, refreshToken);
router.get('/logout', logout)

export default router;