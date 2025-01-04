import passport from "passport"
import passportJWT from "passport-jwt"
import { SECRET } from "../utils.js"

const buscaToken=req=>{
    let token=null

    if(req.cookies.cookietoken){
        token=req.cookies.cookietoken
    }

    return token
}

export const iniciarPassport=()=>{
    // paso 1
    passport.use("current",
        new passportJWT.Strategy(
            {
                secretOrKey: SECRET,
                jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscaToken])
            },
            async(usuario, done)=>{
                try {
                    console.log(`pasa por passport!`)
                    // return done(error)  // fallo
                    // return done(null, false)  // fallo
                    // return done(null, usuario)  OK!!!

                    if(usuario.nombre=="Juan"){
                        return done(null, false, {messages:`El usuario Juan tiene el acceso temporalmente inhabilitado. Contacte a RRHH.`})
                    }

                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )



    // paso 1 bis o 1' (solo si usamos sessions)
    // passport.serializeUser()
    // passport.deserializeUser()
}