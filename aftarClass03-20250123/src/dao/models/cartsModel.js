import mongoose from "mongoose";

export const cartsModel=mongoose.model(
    "carts", 
    new mongoose.Schema(
        {
            products:[]
        },
        {
            timestamps: true
        }
    )
)