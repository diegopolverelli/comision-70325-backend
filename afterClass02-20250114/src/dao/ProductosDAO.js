import { productoModelo } from "./models/productoModel.js";

export class ProductosDAO{
    static async getProdcuts(){
        return await productoModelo.find().lean()
    }

    static async getProdcutBy(filtro={}){
        return await productoModelo.findOne(filtro).lean()
    }

    static async addProduct(producto){
        let nuevoProducto=await productoModelo.create(producto)
        return nuevoProducto.toJSON()
    }

    static async addProducts(productos){
        return await productoModelo.insertMany(productos)
    }
}