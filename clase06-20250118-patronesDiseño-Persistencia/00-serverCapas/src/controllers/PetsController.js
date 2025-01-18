import { PetsManager } from "../dao/PetsManager.js"

export class PetsController{
    static getPets=async(req,res)=>{

        let pets=await PetsManager.get()
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({pets})
    }

    static createPet=async(req, res)=>{
        let {name, specie} = req.body
        if(!name || !specie){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`name | specie son requeridos`})
        }
    
        try {
            let newPet=await PetsManager.create({name, specie})
            res.setHeader('Content-Type','application/json');
            return res.status(201).json({newPet});
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error...`})
        }
    }
}