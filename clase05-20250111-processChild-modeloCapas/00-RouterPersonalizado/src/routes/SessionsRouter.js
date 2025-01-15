import { config } from "../config/config.js";
import { CustomRouter } from "./router.js";
import jwt from "jsonwebtoken"

export class SessionsRouter extends CustomRouter{

    init(){
        this.get("/login", ["public"], (req, res)=>{
            let token
            if(req.query.user=="usuario"){
                token=jwt.sign({name:"usuario", rol:"user"}, config.SECRET, {expiresIn: "1h"} )
            }

            if(req.query.user=="admin"){
                token=jwt.sign({name:"administador", rol:"admin"}, config.SECRET, {expiresIn: "1h"} )
            }

            if(req.query.user != "admin" && req.query.user!="usuario"){
                return res.unauthorized("Credenciales inválidas")
            }

            if(!req.query.user){
                return res.badRequest(`Complete usuario`)
            }            

            return res.success(`Login existoso!`, token)

        })
    }
}