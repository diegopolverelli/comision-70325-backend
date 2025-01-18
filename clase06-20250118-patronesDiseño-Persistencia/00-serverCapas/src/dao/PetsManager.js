import {v4} from "uuid"
let pets=[]

export class PetsManager{
    static async get(){
        return pets
    }

    static async create(pet){
        let id=v4()
        let newPet={
            id, 
            ...pet
        }      
        pets.push(newPet)
        return newPet  
    }
}