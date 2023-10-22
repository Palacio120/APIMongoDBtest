import axios from "axios";
import { validationResult, body, param } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const bodyLoginValidation = [
    body('email', 'formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Formato de contraseña incorrecto')
        .trim()
        .isLength({ min: 6 }),
    validationResultExpress,
]

export const bodyRegisterValidation = [
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
        }),
    validationResultExpress
]

export const bodyLinkValidator = [
    body('longLink', 'Formato de link incorrecto')
        .trim()
        .notEmpty()
        .custom(async value => {
            try {
                if (!value.startsWith('https://')) {
                    value = "https://" + value;
                }
                await axios.get(value);
                return (value);
            } catch (error) {
                throw new Error("Error 404 page not found");
            }

        }),
    validationResultExpress
]

export const paramsValidator = [
    param('nanoLink', 'Formato de id incorrecto')
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress
]