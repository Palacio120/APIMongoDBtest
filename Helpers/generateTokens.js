import jwt from "jsonwebtoken";
export const generateToken = (uid) => {
    try {
        const expiresIn = 60 * 15;
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
        return { token, expiresIn }
        
    } catch (error) {
        console.log(error);    
    }
}

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 1000 * 60 * 60 * 24 * 30;
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH_SECRET, { expiresIn });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: !(process.env.MODO === 'developer'),
        expires: new Date(Date.now() + expiresIn),
    })
}
