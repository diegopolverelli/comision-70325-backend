import mongoose from "mongoose"
console.log("productoModelo.js")
export const productoModelo=mongoose.model(
    "productos", 
    new mongoose.Schema(
        { 
            code: {type:String, unique:true}, 
            title: String, 
            stock: Number, 
            price: Number, 
            descrip: String, 
            status: Boolean 
        },
        {
            timestamps: true
        }
    )
)

