import express from 'express';
import session from "express-session"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:"Coder456",
    resave: true, 
    saveUninitialized: true
}))


app.get('/',(req,res)=>{

    if(req.session.contador){
        req.session.contador++
    }else{
        req.session.contador=1
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Hola. Visitas: ${req.session.contador}`});
})

app.get("/prueba", (req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`visitas: ${req.session.contador}`});
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
