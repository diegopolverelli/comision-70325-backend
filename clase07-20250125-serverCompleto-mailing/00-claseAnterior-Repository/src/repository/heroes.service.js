import { MemoryHeroesDAO } from "../dao/memoryHeroesDAO.js"
import { HeroesDTO } from "../dto/HeroesDTO.js"

class HeroesService{
    constructor(dao){
        this.DAO=dao
    }

    async getHeroes(){
        let heroes=await this.DAO.get()
        heroes=heroes.map(h=>new HeroesDTO(h))
        return heroes
    }
}

export const heroesService=new HeroesService(new MemoryHeroesDAO())