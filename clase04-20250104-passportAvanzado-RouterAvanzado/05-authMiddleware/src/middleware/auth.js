import jwt from "jsonwebtoken"
import { SECRET } from "../utils.js";

// export const auth=(req, res, next)=>{
//     // if(!req.headers.authorization){
//     //     res.setHeader('Content-Type','application/json');
//     //     return res.status(401).json({error:`No hay usuarios autenticados`})
//     // }

//     console.log(req.cookies)

//     if(!req.cookies.cookietoken){
//         res.setHeader('Content-Type','application/json');
//         return res.status(401).json({error:`No hay usuarios autenticados`})
//     }

//     // BEARER Token    // Bearer 8da9fad9fasdo.adfasdf98as9d8fj.asdfasdf
//     // let token=req.headers.authorization.split(" ")[1]
//     let token=req.cookies.cookietoken

//     try {
//         let usuario=jwt.verify(token, SECRET)
//         req.user=usuario
//     } catch (error) {
//         res.setHeader('Content-Type','application/json');
//         return res.status(400).json({error:`${error.message}`})
//     }


//     next()
// }





                                     // router.get("/prueba", auth(["public"]), (req, res)=>...)
export const auth=(permisos=[])=>{   // router.post("/prueba", auth(["Admin", "premiun"]), (req, res)=>...)
    return (req, res, next)=>{
        if(!Array.isArray(permisos)){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error de permisos para la ruta.`})
        }

        permisos=permisos.map(p=>p.toLowerCase())

        if(permisos.includes("public")){
            return next()
        }

        if(!req.user?.rol){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`No hay usuarios autenticados`})
        }
        console.log(req.user)

        if(!permisos.includes(req.user.rol.toLowerCase())){
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error:`No tiene privilegios suficientes para acceder al recurso solicitado`})
        }

        next()
            // Object
            // String
    }
}