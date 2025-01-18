import mongoose from "mongoose"

export class Singleton{
    static #instancia=null

    constructor(url, dbName){
        mongoose.connect(url, {dbName})
    }

    static conectarDB(url, dbName){
        if(this.#instancia){
            console.log(`Conexión previamente establecida!`)
            return this.#instancia
        }

        this.#instancia=new Singleton(url, dbName)
        console.log(`DB online!`)
        return this.#instancia
    }


}