import mongoose from "mongoose";
import { config } from "../config/config.js";
// import fs from "fs"

export let DAO

switch (config.PERSISTENCE) {
    case "MONGO":
        try {
            await mongoose.connect(
                config.MONGO_URL,
                {dbName:config.DB_NAME}
            )
            console.log(`DB Online!`)
        } catch (error) {
            console.log("Error al conectar a DB")
        }
        DAO=(await import("./usuariosMongoDAO.js")).usuariosMongoDAO

        // let importDAO=await import("./usuariosMongoDAO.js")
        // DAO=importDAO.usuariosMongoDAO

        break;

    case "FS":
        DAO=(await import("./usuariosFsDAO.js")).usuariosFsDAO

        break;

    default:
        throw new Error(`Verifique configuración de persistencia!`)
        // break;
}