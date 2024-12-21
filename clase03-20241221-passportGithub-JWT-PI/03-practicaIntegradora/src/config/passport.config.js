import passport from "passport";
import local from "passport-local"
import github from "passport-github2"
import { UsuariosManager } from "../dao/UsuariosManager.js";
import { generarHash } from "../utils.js";
import { config } from "./config.js";

export const iniciarPassport=()=>{

    // 1)
    passport.use("registro",
        new local.Strategy(
            {
                // usernameField: "email",
                passReqToCallback: true
            },
            async(req, username, password, done)=>{
                try {
                    let {nombre, email, rol}=req.body
                    if(!nombre || !email){
                        console.log("No se ingreso nombre o email")
                        return done(null, false)
                    }

                    let existe=await UsuariosManager.getBy({username})
                    if(existe){
                        return done(null, false)
                    }

                    existe=await UsuariosManager.getBy({email})
                    if(existe){
                        return done(null, false)
                    }

                    password=generarHash(password)

                    let nuevoUsuario=await UsuariosManager.create({nombre, username, password, rol, email})
                    return done(null, nuevoUsuario)

                } catch (error) {
                    return done(error)
                }
            }
        )
    )



    passport.use("github", 
        new github.Strategy(
            {
                clientID:config.GITHUB.CLIENT_ID,
                clientSecret:config.GITHUB.CLIENT_SECRET, 
                callbackURL:config.GITHUB.CALLBACK
            },
            async(t1, t2, profile, done)=>{
                try {
                    // console.log(profile)
                    // return done(null, false)
                    let {name, email, login:username}=profile._json
                    if(!email || !username){
                        return done(null, false)
                    }
                    let usuario=await UsuariosManager.getBy({username})
                    if(!usuario){
                        let existeMail=await UsuariosManager.getBy({email})
                        if(!existeMail){
                            usuario=await UsuariosManager.create({nombre:name, username, email})
                        }
                    }
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )



    // 1' solo para sessions
    // passport.serializeUser()
    // passport.deserializeUser()
}

