import { Router } from 'express';
import jwt from "jsonwebtoken"
import passport from 'passport';
import { config } from '../config/config.js';
export const router=Router()

router.post('/register', passport.authenticate("register", {session:false}), (req,res)=>{

    let nuevoUsuario=req.user
    console.log(req.user)
    delete nuevoUsuario.password

    res.setHeader('Content-Type','application/json')
    res.status(200).json({nuevoUsuario})
})

router.post("/login", passport.authenticate("login", {session:false}), (req, res)=>{

    delete req.user.password
    let token=jwt.sign(req.user, config.SECRET, {expiresIn:"1h"})

    res.cookie("cookieToken", token)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:req.user, message:"Login exitoso"});
})