import {Command, Option} from "commander"

const programa=new Command()

programa.addOption(new Option("-m, --mode <mode>", "Mode de ejecución del programa").choices(["dev", "prod"]).default("dev"))

programa.parse()

let {mode} = programa.opts()

// let mode="dev"

process.loadEnvFile(mode=="dev"?"./src/.env.dev":"./src/.env.prod")

export const config={
    PRUEBA_PORT: process.env.PRUEBA_PORT,
    PORT: process.env.PORT || 3007,
    MONGO_URL: process.env.MONGO_URL, 
    DB_NAME: process.env.DB_NAME
}