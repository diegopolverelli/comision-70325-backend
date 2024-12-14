import { usuariosModelo } from "./models/usuarios.modelo.js";

export class UsuariosManagerMongo{

    static async create(usuario){
        let nuevoUsuario=await usuariosModelo.create(usuario)
        return nuevoUsuario.toJSON()
    }

    static async getBy(filtro={}){
        return await usuariosModelo.findOne(filtro).lean()
    }

}

// UsuariosManagerMongo.getBy()

// const um=new UsuariosManagerMongo()
// um.getBy()