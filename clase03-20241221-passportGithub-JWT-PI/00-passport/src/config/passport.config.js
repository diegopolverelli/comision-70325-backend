import passport from "passport" // middleware
import local from "passport-local"  // estrategia de autenticación
import { UsuariosManagerMongo } from "../dao/UsuariosManagerMONGO.js"
import { generaHash, validaPass } from "../utils.js"

export const iniciarPassport=()=>{

    // 1)
    passport.use("registro", 
        new local.Strategy(
            {
                usernameField: "email", 
                passReqToCallback: true
            },
            async(req, username, password, done)=>{
                try {
                    // logica de registro
                    let {nombre} =req.body
                    if(!nombre){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(400).json({error:`nombre es requerido`})
                        return done(null, false)
                    }

                    // validaciones pertinentes
                    let existe=await UsuariosManagerMongo.getBy({email:username})
                    if(existe){
                        return done(null, false)
                    }

                    password=generaHash(password)

                    let usuario=await UsuariosManagerMongo.create({nombre, email:username, password})
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use("login", 
        new local.Strategy(
            {
                usernameField: "email", 
                // passReqToCallback: true
            },
            async(username, password, done)=>{
                try {
                    // logica de login
                    let usuario=await UsuariosManagerMongo.getBy({email:username})
                    if(!usuario){
                        return done(null, false)
                    }
                    if(!validaPass(password, usuario.password)){
                        return done(null, false)
                    }
                    return done(null, usuario)

                    // return done(null, {_id: "000000000000000000001111", nombre:"Juan", email:"juan@test.com"})
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    // 1' o 1b  // SOLO SI SESSIONS...!!!
    passport.serializeUser((user, done)=>{
        return done(null, user._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let usuario=await UsuariosManagerMongo.getBy({_id:id})
        return done(null, usuario)
    })

}