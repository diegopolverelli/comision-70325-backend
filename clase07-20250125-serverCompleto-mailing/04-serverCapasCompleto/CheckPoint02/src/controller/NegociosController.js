import { manejaErrores } from "../utils.js";

export class NegociosController{
    static async getNegocios(req, res){
        try {
            let negocios="get negocios"
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({negocios});
        } catch (error) {
            manejaErrores(error, res)
        }
    }

    static async createNegocio(req, res){
        let {nombre, productos} = req.body
        // validaciones   
        if(!nombre || !productos || !Array.isArray(productos)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`nombre y productos son requeridos (productos debe ser un array válido de ítems del menú)`})
        }
        // productos    [{id:1, descrip:"Milanesa c/ fritas", precio: 8000},]

        try {
            let nuevoNegocio=`Nuevo negocio generado: ${nombre}`
            res.setHeader('Content-Type','application/json');
            return res.status(201).json({nuevoNegocio});
        } catch (error) {
            manejaErrores(error, res)
        }
    }
}