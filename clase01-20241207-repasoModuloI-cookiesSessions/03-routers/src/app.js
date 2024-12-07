import express from 'express';
// import { HeroesManager } from './dao/HeroesManager.js';
// import { logger } from './middlewares/logger.js';
// import { auth } from './middlewares/auth.js';
// import {heroes} from "./data/heroes.js"
import { router as heroesRouter } from './routes/heroes.router.js';
import { router as villanosRouter } from './routes/villanosRouter.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))

app.use("/api/heroes", heroesRouter)
app.use("/api/villanos", villanosRouter)
// app.use(logger)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send('OK');
})

// app.get("/api/heroes", logger, auth, (req, res)=>{
//     let heroes=HeroesManager.getHeroes()

//     res.setHeader('Content-Type','application/json');
//     return res.status(200).json({heroes});
// })

// alta de heroes
// listar solo algún heroes
// modificar y eliminar

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}...!!!`);
});

