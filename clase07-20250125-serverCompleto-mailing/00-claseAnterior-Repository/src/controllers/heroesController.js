// import { MemoryHeroesDAO as DAO } from "../dao/memoryHeroesDAO.js"
import { heroesService } from "../repository/heroes.service.js"

// let heroesService=new DAO()

async function getHeroes(req,res){

    // let heroes=await heroesService.get()
    let heroes=await heroesService.getHeroes()

    res.status(200).json({heroes})
}

export default {getHeroes}