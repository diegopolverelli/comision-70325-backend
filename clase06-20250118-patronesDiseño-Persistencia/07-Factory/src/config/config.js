process.loadEnvFile("./src/.env")

export const config={
    PORT: process.env.PORT || 3007,
    MONGO_URL: process.env.MONGO_URL, 
    DB_NAME: process.env.DB_NAME, 
    PERSISTENCE: process.env.PERSISTENCE
}