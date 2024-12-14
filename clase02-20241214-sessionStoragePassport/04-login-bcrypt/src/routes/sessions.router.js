import { Router } from 'express';
import { generaHash, isValidPassword, procesaErrores } from '../utils.js';
import { UsuariosManagerMongo } from '../dao/UsuariosManagerMONGO.js';
export const router=Router()

router.post('/register',async(req,res)=>{
    let {nombre, email, password, web}=req.body
    if(!nombre || !email || !password){
        if(web){
            return res.redirect("/register?mensaje=Complete name | email | password")
        }
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`nombre | email | password son requeridas`})
    }
    
    // validaciones pertinentes

    let regExEmail = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    if(!regExEmail.test(email)){
        if(web){
            return res.redirect("/register?mensaje=email formato invalido")
        }

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Formato inválido del email`})
    }

    let regExNombre= /[0-9]/
    if(regExNombre.test(nombre)){
        if(web){
            return res.redirect("/register?mensaje=nombre no puede tener números")
        }

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No se admiten nombres con números`})
    }

    try {
        let existe=await UsuariosManagerMongo.getBy({email})
        if(existe){
            if(web){
                return res.redirect(`/register?mensaje=El email ${email} ya existe en DB`)
            }
    
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El email ${email} ya está registrado en DB`})
        }

        // new cart con ManagerCarts _id

        password=generaHash(password)

        let nuevoUsuario=await UsuariosManagerMongo.create({nombre, email, password})
        
        if(web){
            return res.redirect(`/login?mensaje=Login exitoso para el usuario ${email}!`)
        }

        res.setHeader('Content-Type','application/json')
        res.status(200).json({payload:"Registro exitoso!", nuevoUsuario})
    } catch (error) {
        procesaErrores(res, error)
    }

})

router.post("/login", async(req, res)=>{
    let {email, password, web}=req.body
    if(!email || !password){
        if(web){
            return res.redirect("/login?mensaje=email | password son requeridos")
        }

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`email | password son requeridos`})
    }

    try {
        let usuarioLogueado=await UsuariosManagerMongo.getBy({email})
        if(!usuarioLogueado){
            if(web){
                return res.redirect("/login?mensaje=credenciales inválidas")
            }

            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`credenciales inválidas`})
        }

        if(!isValidPassword(password, usuarioLogueado.password)){
            if(web){
                return res.redirect("/login?mensaje=credenciales inválidas")
            }   

            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`credenciales inválidas`})
        }

        delete usuarioLogueado.password  // eliminar datos sensibles

        req.session.usuario=usuarioLogueado

        if(web){
            return res.redirect("/perfil")
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Login exitoso`, usuarioLogueado});

    } catch (error) {
        procesaErrores(res, error)
    }
})

router.get("/logout", (req, res)=>{
    req.session.destroy(error=>{
        if(error){
            procesaErrores(res, error)
        }

        if(req.query.web){
            return res.redirect("/login?mensaje=Logout exitoso!")
        }


        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Logout exitoso!`});
    })
})