import express from 'express';
import sessions from "express-session"
import FileStore from "session-file-store"

import { config } from './config/config.js';
import { UsuariosManager } from './dao/UsuariosManager.js';
import { auth } from './middleware/auth.js';
const PORT=config.PORT;

const app=express();

const fileStore=FileStore(sessions)

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(sessions({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new fileStore({
        path:"./src/sessions",
        ttl: 3600,
        retries: 0
    })
}))

app.get('/',(req,res)=>{

    if(req.session.contador){
        req.session.contador++
    }else{
        req.session.contador=1
    }

    res.setHeader('Content-Type','text/plain');
    res.status(200).send(`Home. Visitas ${req.session.contador}`);
})

app.post("/login", async(req, res)=>{
    let {user, pass}=req.body
    
    let usuarios=await UsuariosManager.getUsuarios()
    let usuario=usuarios.find(u=>u.nombre==user && u.password==pass)
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Credenciales inválidas`})
    }

    req.session.usuario=usuario

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Login exitoso para ${usuario.nombre}`});
})


app.get('/datos', auth, (req,res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Datos confidenciales"});
})

app.get("/logout", (req, res)=>{
    req.session.destroy(error=>{
        if(error){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error en logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso"});
    })
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
