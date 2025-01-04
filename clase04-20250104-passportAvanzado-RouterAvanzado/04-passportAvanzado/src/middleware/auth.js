import jwt from "jsonwebtoken"
import { SECRET } from "../utils.js";

export const auth=(req, res, next)=>{
    // if(!req.headers.authorization){
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(401).json({error:`No hay usuarios autenticados`})
    // }

    console.log(req.cookies)

    if(!req.cookies.cookietoken){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuarios autenticados`})
    }

    // BEARER Token    // Bearer 8da9fad9fasdo.adfasdf98as9d8fj.asdfasdf
    // let token=req.headers.authorization.split(" ")[1]
    let token=req.cookies.cookietoken

    try {
        let usuario=jwt.verify(token, SECRET)
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`${error.message}`})
    }


    next()
}