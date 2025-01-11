import productModel from "../models/product.model.js";

export class ProductsDAO{

    static async get(){

        return await productModel.find().lean()

    }

    static async get2(){

        return await productModel.find()

    }


    static async getPaginado(){

        return await productModel.paginate({},{lean:true})

    }
}