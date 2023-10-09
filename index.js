import 'dotenv/config';
import './Database/conectdb.js';
import authRouter from './Routes/auth.route.js';
import express from "express";

const app = express();
app.use(express.json());
app.use('/',authRouter);


const PORT= process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log("💢"+ `http://localhost:${PORT}`);
});