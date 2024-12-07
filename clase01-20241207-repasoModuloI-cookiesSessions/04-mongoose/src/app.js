import express from 'express';
// import { HeroesManager } from './dao/HeroesManager.js';
// import { logger } from './middlewares/logger.js';
// import { auth } from './middlewares/auth.js';
// import {heroes} from "./data/heroes.js"
import { router as heroesRouter } from './routes/heroes.router.js';
import { router as villanosRouter } from './routes/villanosRouter.js';
import { conectarDB } from './database.js';
import { config } from './config/config.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))

app.use("/api/heroes", heroesRouter)
app.use("/api/villanos", villanosRouter)


app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}...!!!`);
});

conectarDB(config.MONGO_URL, config.DB_NAME)

