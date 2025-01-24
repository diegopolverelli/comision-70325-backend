import mongoose from "mongoose";

export const usersModel=mongoose.model(
    "usuarios", 
    new mongoose.Schema(
        {
            email: {type:String, unique: true}, 
            password: String, 
            cart: mongoose.Schema.Types.ObjectId
        },
        {
            timestamps:true
        }
    )
)