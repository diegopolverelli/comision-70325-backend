import mongoose from "mongoose"
console.log("ConnDB.js")
export const conectarDB=async(url, dbName)=>{
    try {
        console.time("Demora al conectar a DB:")
        await mongoose.connect(
            url, 
            {
                dbName
            }
        )
        console.timeEnd("Demora al conectar a DB:")

        console.log("DB online!")
    } catch (error) {
        console.log(`Error al conectar a DB: ${error.message}`)
    }
}