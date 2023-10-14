import { User } from "../Models/user.js";
import jwt from "jsonwebtoken";
import { generateToken, generateRefreshToken } from "../Helpers/generateTokens.js"
import { header } from "express-validator";

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            throw ({ code: 11000 });
        }
        user = new User({ email, password });
        await user.save();

        // jwt
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);

        return res.status(201).json({ ok: "true", token });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: "usuario existente" });
        }
        return res.status(500).json({ error: "error en la base de datos: " + error });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user)
            return res.status(403).json({ error: "No existe el usuario" });

        const correctPassword = await user.comparePasword(password);
        if (!correctPassword)
            return res.status(403).json({ error: "contraseña incorrecta" });

        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);

        res.json({ token, expiresIn });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error en la base de datos: " + error });
    }
}


export const infoUser = async (req, res) => {
    try {
        let user = await User.findById(req.uid).lean();
        return res.json({ email: user.email });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const refreshToken=(req,res)=>{
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie){
            throw new Error('No Berrer')
        }
        const {uid} =  jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH_SECRET);
        const { token, expiresIn } = generateToken(uid);
        return res.status(200).json({ token, expiresIn });

    } catch (error) {
        console.log(error);
    }


}

export const logout =(req,res)=>{
    res.clearCookie('refreshToken');
    res.json({ok:true});
}
