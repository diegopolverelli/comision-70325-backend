import express from 'express';
import session from "express-session"
import { auth } from './middleware/auth.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:"Coder123", resave:true, saveUninitialized:true
}))


let usuarios=[
    {
        nombre:'Diego', password:'123', 
        rol: 'usuario'
    },
    {
        nombre:'Laura', password:'123', 
        rol: 'usuario'
    },
    {
        nombre:'Admin', password:'codercoder', 
        rol: 'admin'
    },
]

app.get('/',(req,res)=>{


    res.setHeader('Content-Type','text/plain');
    res.status(200).send("OK");
})
app.get('/data', auth,(req,res)=>{


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Datos confidenciales", usuarioLogueado:req.session.usuario});
})

app.post("/login", (req, res)=>{
    let {nombre, password}=req.body
    if(!nombre || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuario autenticado`})
    }

    let usuario=usuarios.find(u=>u.nombre===nombre && u.password===password)
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales invalidas`})
    }

    req.session.usuario=usuario

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Login existoso"});

})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
