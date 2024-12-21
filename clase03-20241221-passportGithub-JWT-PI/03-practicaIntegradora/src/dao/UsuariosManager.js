import { usuariosModelo } from "./models/usuarios.model.js"

export class UsuariosManager {
    static async getBy(filtro={}){   // espero un filtro así. {email:"juan@test.com"}
        return await usuariosModelo.findOne(filtro).lean()  // lean para "deshidratar"
    }

    static async create(usuario){
        let nuevoUsuario=await usuariosModelo.create(usuario)
        return nuevoUsuario.toJSON()   // toJSON para "deshidratar"
    }  

}

UsuariosManager.getBy
// const usuariosManager=new UsuariosManager()
// usuariosManager.get()
