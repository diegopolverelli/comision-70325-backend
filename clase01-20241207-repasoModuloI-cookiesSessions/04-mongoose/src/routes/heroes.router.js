import {Router} from "express"
import { logger } from "../middlewares/logger.js";
import { auth } from "../middlewares/auth.js";
// import { HeroesManager } from "../dao/HeroesManager.js";
import {HeroesMongoManager as HeroesManager} from "../dao/HeroesMongoManager.js"

export const router=Router()

router.get("/", logger, auth, async(req, res)=>{
    let heroes=await HeroesManager.getHeroes()

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({heroes});
})

router.post("/", async(req, res)=>{
    // codigo de validacion de las props
    let {name, ...otrasProps}=req.body   // ... son aquí el operador rest
    if(!name){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Prop. name es requerida`})
    }

    // resto validaciones pertinentes...

    try {
        let nuevoHeroe=await HeroesManager.addHeroe({name, ...otrasProps})   // ... son el operador spread
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:"Heroe creado", nuevoHeroe});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`${error.message}`})
    }

})