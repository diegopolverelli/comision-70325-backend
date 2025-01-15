import {Router} from "express"
import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

export class CustomRouter{
    #router
    constructor(){
        this.#router=Router()
        this.init()
    }

    getRouter(){
        return this.#router
    }

    init(){}

    // get( 1, 2, 3, 4, 5)  =>  ruta=1, funciones=[2, 3, 4, 5]
    get(ruta, permisos=[], ...funciones){    // ... son el op. rest
        // this.#router.get(ruta, this.customResponses, funciones)
        this.#router.get(ruta, this.customResponses, this.auth(permisos), this.procesaFunciones(funciones))
    }

    post(ruta, permisos=[], ...funciones){    // ... son el op. rest
        this.#router.post(ruta, this.customResponses, this.auth(permisos), this.procesaFunciones(funciones))
    }

    customResponses(req, res, next){
        res.success=(mensaje, data)=>res.status(200).json({status:"ok", message:mensaje, payload:data})
        res.badRequest=(error)=>res.status(400).json({status:"error", error})
        res.unauthorized=(error)=>res.status(401).json({status:"error", error})
        res.forbbiden=(error)=>res.status(403).json({status:"error", error})
        res.internalServerError=(error)=>res.status(500).json({status:"error", error})

        next()
    }

    procesaFunciones=(funciones=[])=>{    // [(req, res, next)=>{... } ,(req, res)=>{... }]
        return funciones.map(fn=>async(...params)=>{  //... son operador rest
            try {
                return fn(...params)
            } catch (error) {
                // res.status(400)
                // params[1].status(500).send({
                //     message:`Error. Consulte con el administrador. Detalle: ${error.message}`
                // })
                return params[1].internalServerError(`Error. Consulte con el administrador. Detalle: ${error.message}`)
            }
        })
    }

    auth(permisos=[]){
        return (req, res, next)=>{
            if(!Array.isArray(permisos)){
                res.internalServerError(`Error con permisos de la ruta. Contacte al administrador`)
            }

            permisos=permisos.map(p=>p.toLowerCase())  // ["user", "Admin"]

            if(permisos.includes("public")){
                return next()
            }

            // validaciones de seguridad pertinentes...
            if(!req.headers.authorization){    //Bearer TOKEN
                return res.unauthorized(`No hay usuarios autenticados!`)
            }

            let titulo="ingeniero en informática"
            // titulo.split("n")   // retorna un array, donde cada pos. es un corte del string por el caracter "n"

            let token=req.headers.authorization.split(" ")[1]

            let usuario
            try {
                usuario=jwt.verify(token, config.SECRET)
            } catch (error) {
                return res.unauthorized(`${error.message}`)
            }

            if(!permisos.includes(usuario.rol?.toLowerCase())){
                return res.forbbiden(`No tiene privilegios suficientes para acceder al recurso solicitado`)
            }

            return next()
        }
    }

}