import { manejaErrores } from "../utils.js";

export class UsuariosController{
    static async getUsuarios(req, res){
        try {
            let usuarios="get usuarios"

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
        try {
            let nuevoUsuario=`nuevo Usuario generado: ${email}`
            res.setHeader('Content-Type','application/json');
            return res.status(201).json({payload:"Usuario creado con éxito", nuevoUsuario});
        } catch (error) {
            manejaErrores(error, res)
        }
    }
}