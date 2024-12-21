import { Router } from 'express';
import passport from 'passport';
export const router=Router()


router.post(
    '/registro',
    // paso 3...
    passport.authenticate("registro", {session:false}),
    (req,res)=>{

        // req.user que deja passport.authenticate

        res.setHeader('Content-Type','application/json')
        res.status(200).json({payload: "Usuario registrado", usuarioCreado: req.user})
    }
)

router.get("/github", passport.authenticate("github"))
router.get("/callbackGithub", passport.authenticate("github", {session:false}), (req, res)=>{

    // generar token y devolverlo en la response

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Login exitoso", usuario:req.user});
})