import { heroesModelo } from "./models/heroesModelo.js";

export class HeroesMongoManager{
    static async getHeroes(){
        return heroesModelo.find().lean()
    }

    static async addHeroe(heroe){
        let nuevoHeroe=await heroesModelo.create(heroe)
        return nuevoHeroe.toJSON()
    }
}