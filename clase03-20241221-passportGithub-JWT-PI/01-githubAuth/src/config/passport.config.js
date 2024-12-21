import passport from "passport"
import github from "passport-github2"
import { config } from "./config.js"
import { usuariosModelo } from "../models/usuario.model.js"

export const initPassport=()=>{

    // paso 1)
    passport.use("github", 
        new github.Strategy(
            {
                clientID: config.GITHUB.CLIENT_ID,
                clientSecret: config.GITHUB.CLIENT_SECRET,
                callbackURL: config.GITHUB.CALLBACK
            },
            async(token, token2, profile, done)=>{
                try {
                    // console.log(profile)
                    let {name, email}=profile._json
                    if(!email){
                        return done(null, false)
                    }
                    let usuario=await usuariosModelo.findOne({email})
                    if(!usuario){
                        usuario=await usuariosModelo.create({name, email, profile})
                    }
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    // paso 1'
    passport.serializeUser((user, done)=>{
        return done(null, user)
    })
    passport.deserializeUser((user, done)=>{
        return done(null, user)
    })

}