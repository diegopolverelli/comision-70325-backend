// process.loadEnvFile("./src/.env")
import dotenv from "dotenv"

dotenv.config({
    path:"./src/.env", 
    override: true
})

export const config={
    PRUEBA_PORT: process.env.PRUEBA_PORT,
    PORT: process.env.PORT || 3007,
    MONGO_URL: process.env.MONGO_URL, 
    DB_NAME: process.env.DB_NAME
}