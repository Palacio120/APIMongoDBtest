import 'dotenv/config';
import './Database/conectdb.js';
import authRouter from './Routes/auth.route.js';
import cookieParser from 'cookie-parser';
import express from "express";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);
app.use(express.static('Public'));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});