import mongoose from "mongoose";

export const ticketModelo=mongoose.model(
    "tickets", 
    new mongoose.Schema(
        {
            nroComp: String, 
            fecha: Date, 
            detalle: [], 
            total: Number,
            comprador: String
        },
        {
            timestamps:true
        }
    )
)