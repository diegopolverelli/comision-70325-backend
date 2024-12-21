import express from 'express';
import mongoose from 'mongoose';

import passport from 'passport';
// import local from "passport-local"
import { iniciarPassport } from './config/passport.config.js';

import { router as sessionsRouter } from './routes/sessionsRouter.js';
import { router as heroesRouter } from './routes/heroesRouter.js';
import { router as villanosRouter } from './routes/villanosRouter.js';
import { config } from './config/config.js';
const PORT=config.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// paso 2)
iniciarPassport()
// passport.use("login", new local.Strategy({}, async(username, done)=>{

// }))
app.use(passport.initialize())
// app.use(passport.session())   // solo va si uso Sessions (express-session)

app.use("/api/sessions", sessionsRouter)
app.use("/api/heroes", heroesRouter)
app.use("/api/villanos", villanosRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


const connDB=async()=>{
    try {
        await mongoose.connect(
            config.MONGO_URL,
        {
            dbName: config.DB_NAME
        }
        )
        console.log("DB conectada...!!!")
    } catch (error) {
        console.log(`Error al conectar a DB: ${error}`)
    }
}
connDB()