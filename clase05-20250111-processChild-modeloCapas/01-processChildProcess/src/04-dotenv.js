import fs from "fs"
import { config } from "./config/04-config.js"
// const PORT=config.PORT

// console.log(PORT)
import express from 'express';
const PORT=config.PORT;

console.log(config.PRUEBA_PORT)

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
