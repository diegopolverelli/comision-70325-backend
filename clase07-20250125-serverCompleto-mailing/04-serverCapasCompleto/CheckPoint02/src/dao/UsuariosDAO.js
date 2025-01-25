import { usuariosModelo } from "./models/usuariosModelo.js";

export class UsuariosDAO{
    static async getUsuarios(){
        return usuariosModelo.find().lean()
    }

    static async createUser(usuario){
        let nuevoUsuario=await usuariosModelo.create(usuario)
        return nuevoUsuario.toJSON()
    }

    static async updateUser(id, usuario){
        return await usuariosModelo.findByIdAndUpdate(id, usuario, {new: true})
    }
}