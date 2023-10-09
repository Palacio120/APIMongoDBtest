import { Express } from 'express';

import {v4, uuidv4} from 'uuid'
const app= express();
const PORT=8000;

app.use(express.json());

var tshirt=[];


app.get('/tshirt',(req,res)=>{
    res.json(tshirt);
});

app.get('/tshirt/:id',(req,res)=>{
    var shirt = tshirt[req.params.id];
    res.json(shirt);
});


app.post('/tshirt',(req,res)=>{
    var newTshirt = {
        logo:req.body.logo,
        name:req.body.name,
        price:req.body.price,
        id:uuidv4(),
        timestamp: new Date(), 
    };
    tshirt.push(newTshirt);

    res.send({
        tshirt:`👕 with your logo ${newTshirt.logo} and id ${newTshirt.id}`
    });
});


app.delete('/tshirt/:id',(req,res)=>{
    var id = req.params.id;
    tshirt.splice(id,1);
    res.send(`${id} was deleted from the table`);
});

app.listen(PORT,()=>{
    console.log(`its alive on https://localhost/:${PORT}`);
});