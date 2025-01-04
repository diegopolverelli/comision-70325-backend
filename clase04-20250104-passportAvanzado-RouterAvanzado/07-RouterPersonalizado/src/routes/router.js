import {Router} from "express"

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
    get(ruta, ...funciones){    // ... son el op. rest
        this.#router.get(ruta, this.customResponses, funciones)
    }

    post(ruta, ...funciones){    // ... son el op. rest
        this.#router.post(ruta, this.customResponses, funciones)
    }

    customResponses(req, res, next){
        res.success=(mensaje, data)=>res.status(200).json({status:"ok", message:mensaje, payload:data})
        res.badRequest=(error)=>res.status(400).json({status:"error", error})
        res.unauthorized=(error)=>res.status(401).json({status:"error", error})
        res.forbbiden=(error)=>res.status(403).json({status:"error", error})
        res.internalServerError=(error)=>res.status(500).json({status:"error", error})

        next()
    }

}