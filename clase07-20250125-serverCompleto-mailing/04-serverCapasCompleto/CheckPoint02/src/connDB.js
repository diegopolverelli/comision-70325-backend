import mongoose from "mongoose";

export const conectarDB=async(urlMongo, db)=>{
    try {
        await mongoose.connect(
            urlMongo,
            {
                dbName: db
            }
        )
        console.log(`DB online!`)
    } catch (error) {
        console.log(`Error al conectar a DB: ${error.message}`)
        process.exit()
    }

}