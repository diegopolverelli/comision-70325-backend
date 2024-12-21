import { Router } from 'express';
import passport from 'passport';
export const router=Router()

// router.get("")

// paso 3

router.get('/github', passport.authenticate("github"))

router.get("/callbackGithub", passport.authenticate("github"), (req, res)=>{

    req.session.usuario=req.user

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Login correcto", datosUsuario:req.user});
})