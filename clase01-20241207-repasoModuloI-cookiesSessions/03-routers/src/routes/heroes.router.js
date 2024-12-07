import {Router} from "express"
import { logger } from "../middlewares/logger.js";
import { auth } from "../middlewares/auth.js";
import { HeroesManager } from "../dao/HeroesManager.js";

export const router=Router()

router.get("/", logger, auth, (req, res)=>{
    let heroes=HeroesManager.getHeroes()

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({heroes});
})

router.post("/", (req, res)=>{
    // codigo de validacion de las props


    res.setHeader('Content-Type','application/json');
    return res.status(201).json({payload:"Heroe creado"});
})