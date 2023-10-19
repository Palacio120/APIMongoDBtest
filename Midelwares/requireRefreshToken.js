import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../Helpers/generateTokens.js";

export const requireRefreshToken = (req, res, next) => {
    try {
        let refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) { throw new Error('No existe el token') };

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH_SECRET);

        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res
            .status(401)
            .send({ error: tokenVerificationErrors[error.message] });
    }
}