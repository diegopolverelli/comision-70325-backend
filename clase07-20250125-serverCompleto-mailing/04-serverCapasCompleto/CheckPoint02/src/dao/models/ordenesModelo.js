import mongoose from "mongoose";

export const ordenesModelo=mongoose.model(
    "ordenes", 
    new mongoose.Schema(
        {
            nroOrden: {
                type: String, unique: true
            }, 
            fecha: Date, 
            cliente: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "usuarios"
            },
            negocio: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "negocios"
            },
            detalle: {
                type: [
                    {
                        id: Number, 
                        precio: Number, 
                        descrip: Number,
                        cantidad: Number, 
                        subtotal: Number
                    }
                ]
            },
            total: Number
        },
        {timestamps:true}
    )
)