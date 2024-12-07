import mongoose from "mongoose";

export const heroesModelo=mongoose.model(
    "heroes",  // "heroe"
    new mongoose.Schema(
        {
            name: {type: String, unique: true},
            alias: String
        },
        {
            // collection: "superheroes",
            timestamps: true, 
            strict: false
        }
    )
)