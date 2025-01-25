import express from 'express';
import { uploader } from './utils.js';
import { enviarMail } from './mailing.js';

import fs from "fs"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))

app.post("/enviarmail", uploader.array("archivos"), async(req, res)=>{

    let {to, subject, message} = req.body
    if(!to || !subject || !message){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`to | subject | message son requeridos`})
    }


    try {

        // proceso algo... 

        
        let resultado
        if(req.files){
            let adjuntos=[]
            req.files.forEach(file=>{
                adjuntos.push({
                    path: file.path, 
                    filename: file.originalname
                })
            })
            
            resultado=await enviarMail(to, subject, message, adjuntos)

            req.files.forEach(f=>{
                fs.unlinkSync(f.path)
            })
        }else{
            resultado=await enviarMail(to, subject, message, [])
        }
        
        if(resultado.rejected.length>0){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Error al enviar a los siguientes destinatarios: ${JSON.stringify(resultado.rejected)}`})
        }
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Mail enviado...!!! "});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Error... :(`})
    }
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
