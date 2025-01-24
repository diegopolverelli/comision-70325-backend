process.loadEnvFile("./src/.env")
console.log("config.js")
export const config={
    PORT: process.env.PORT || 3007, 
    MONGO_URL: process.env.MONGO_URL, 
    DB_NAME: process.env.DB_NAME,
    SECRET: process.env.SECRET
}