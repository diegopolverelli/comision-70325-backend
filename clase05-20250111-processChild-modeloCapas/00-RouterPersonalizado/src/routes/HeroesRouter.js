import { HeroesManager } from "../managers/HeroesManager.js";
import { CustomRouter } from "./router.js";

const heroesManager=new HeroesManager()

export class HeroesRouter extends CustomRouter{

    init(){
        this.get("/", ["admin"], (req, res)=>{
            let heroes=heroesManager.getHeroes()

            if(req.query.error){
                return res.badRequest(`Error de prueba!!!`)
            }

            // res.setHeader('Content-Type','application/json');
            // return res.status(200).json({payload:heroes});
            // res.success(undefined, heroes)
            return res.success(`Heroes recuperados!`, heroes)
        })
    }
}