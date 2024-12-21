import mongoose from "mongoose";
export const usuariosModelo=mongoose.model(
    "usuarios", 
    new mongoose.Schema(
        {
            nombre: String, 
            username: {type: String, unique:true},
            email: {type: String, unique:true},
            password: String,
            rol: {type: String, default: "user"}
        },
        {
            timestamps: true,
            // strict: false, 
            // collection: "usuarios2022"
        }
    )
)