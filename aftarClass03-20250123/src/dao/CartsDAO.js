import { cartsModel } from "./models/cartsModel.js";

export class CartsDAO{
    static async getCarts(){
        return await cartsModel.find().lean()
    }

    static async getCartBy(filtro={}){
        return await cartsModel.findOne(filtro).lean()
    }

    static async getCartBy(filtro={}){
        return await cartsModel.findOne(filtro).lean()
    }

    static async addCart(){
        return await cartsModel.create({products:[]})
    }

    static async updateCart(id, cart){
        return await cartsModel.findByIdAndUpdate(id, cart, {new: true })
    }

}