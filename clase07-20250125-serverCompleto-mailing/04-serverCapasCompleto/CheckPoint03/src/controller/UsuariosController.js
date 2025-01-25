import { UsuariosDAO } from "../dao/UsuariosDAO.js";
import { manejaErrores } from "../utils.js";

export class UsuariosController{
    static async getUsuarios(req, res){
        try {
            // let usuarios="get usuarios"
            let usuarios=await UsuariosDAO.getUsuarios()

            res.setHeader('Content-Type','application/json');
            return res.status(200).json({usuarios});
        } catch (error) {
            manejaErrores(error, res)
        }
    }

    static async createUsuario(req, res){
        let {nombre, email}=req.body
        // validaciones 
        if(!nombre || !email){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`nombre | email son requeridos`})
        }

        // resto validaciones pertinentes
        try {
            // let nuevoUsuario=`nuevo Usuario generado: ${email}`
            let nuevoUsuario=await UsuariosDAO.createUser({nombre, email})
            res.setHeader('Content-Type','application/json');
            return res.status(201).json({payload:"Usuario creado con éxito", nuevoUsuario});
        } catch (error) {
            manejaErrores(error, res)
        }
    }
}