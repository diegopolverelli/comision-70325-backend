import jwt from "jsonwebtoken"
import { config } from "../config/config.js";

export const auth=(req, res, next)=>{
    // if(!req.session.usuario){
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(401).json({error:`No hay usuarios autenticados`})
    // }

    if(!req.headers.authorization){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuarios autenticados`})
    }

    // Bearer Token   =>   Bearer a8sdfasdlfasdf.adslfkasñldfkasdf.asdfasdf
    let token=req.headers.authorization.split(" ")[1]
    try {
        let usuario=jwt.verify(token, config.SECRET)
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`${error.message}`})
    }

    // acá sé que hay un usuario válido conectado

    next()
}