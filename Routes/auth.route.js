import { Router } from "express";
import { login, register, infoUser, refreshToken, logout } from "../Controllers/auth.controller.js";
import { validationResultExpress } from "../Midelwares/validationResultsExpress.js";
import { requireToken } from "../Midelwares/requireToken.js";
import { body } from "express-validator";
const router = Router();


router.post('/register', [
    body('email', 'formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Formato de contraseña incorrecto')
        .trim()
        .isLength({ min: 6 })
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error('no conciden las contraseñas');
            }
            return value;
        })

],
    validationResultExpress,
    register);

router.post('/login', [
    body('email', 'formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Formato de contraseña incorrecto')
        .trim()
        .isLength({ min: 6 }),
],
    validationResultExpress,
    login);

router.get('/confidential',requireToken, infoUser);
router.get('/refresh', refreshToken);
router.get('/logout', logout)

export default router;