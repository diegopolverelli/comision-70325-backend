import mongoose from "mongoose"

export const conectarDB=async(uri, db)=>{
    try {
        mongoose.connect(
            uri,
            {
                dbName: db
            }
        )
        console.log(`DB online!`)
    } catch (error) {
        console.log(`Error al conectar a DB: ${error.message}`)
    }
}