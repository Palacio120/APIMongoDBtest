import 'dotenv/config';
import './Database/conectdb.js';
import cookieParser from 'cookie-parser';
import express from "express";
import cors from "cors";
import authRouter from './Routes/auth.route.js';
import linkRouter from "./Routes/link.route.js";
import redirectRouter from './Routes/redirect.route.js';

const app = express();
const whithelist=[process.env.ORIGIN1, process.env.ORIGIN2];
app.use(cors({
    origin:function(origin,callback){
        if(!origin||whithelist.includes(origin)){
            return callback(null, origin)
        }
        return callback(
            "Error de Cors "+ origin+ "fuera del whithe list"
        )
    }
}));
app.use(express.json());
app.use(cookieParser());
app.use('/',redirectRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/links', linkRouter);

//for test proupose 
//app.use(express.static('Public'));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});