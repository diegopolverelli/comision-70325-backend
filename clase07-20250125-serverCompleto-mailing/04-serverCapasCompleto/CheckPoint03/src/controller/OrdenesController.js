import { manejaErrores } from "../utils.js";
import {isValidObjectId} from "mongoose"

export class OrdenesController{
    static async getOrdenes(req, res){
        try {
            let ordenes="get ordenes"
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({ordenes});
        } catch (error) {
            manejaErrores(error, res)
        }
    }

    static async createOrden(req, res){
        let {uid, nid, pedido} = req.body
        // validaciones pertinenes
        if (!uid || !isValidObjectId(uid) || !nid || !isValidObjectId(nid) || !pedido || !Array.isArray(pedido)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`uid | nid son requeridos y de tipo MongoDB ObjectOd; pedido es requerido, de tipo array `})
        }
        try {
            let nuevaOrden=`Orden generada!`
            res.setHeader('Content-Type','application/json');
            return res.status(201).json({nuevaOrden});
        } catch (error) {
            manejaErrores(error, res)
        }
    }
}