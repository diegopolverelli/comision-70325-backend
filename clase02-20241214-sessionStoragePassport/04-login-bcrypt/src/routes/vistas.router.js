import { Router } from 'express';
import { auth } from '../middleware/auth.js';
export const router=Router()

router.get('/',(req,res)=>{

    res.status(200).render('home',{
        isLogin:req.session.usuario
    })
})

router.get('/register',(req,res)=>{
    let {mensaje}=req.query

    res.status(200).render('register',
        {
            mensaje,
            isLogin:req.session.usuario
        }
    )
})

router.get('/login',(req,res)=>{
    let {mensaje}=req.query

    res.status(200).render('login',
        {
            mensaje,
            isLogin:req.session.usuario
        }
    )
})

router.get('/perfil', auth, (req,res)=>{

    res.status(200).render('perfil',
        {
            usuario:req.session.usuario,
            isLogin:req.session.usuario
        }
    )
})

