import express from "express";
import { login, register } from "../Controllers/auth.controller.js";
import { validationResultExpress } from "../Midelwares/validationResultsExpress.js";
import { body } from "express-validator";
const router = express.Router();


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


export default router;