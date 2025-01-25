process.loadEnvFile("./src/.env")

export const config={
    PORT: process.env.PORT || 3008,
    MONGO_URL: process.env.MONGO_URL, 
    DBNAME: process.env.DBNAME
}