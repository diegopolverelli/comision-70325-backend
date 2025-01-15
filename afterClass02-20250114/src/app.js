import express from 'express';
import { router as productsRouter } from './routes/productsRouter.js';
import { router as cartsRouter } from './routes/cartRouter.js';
import { router as sessionsRouter } from './routes/sessionsRouter.js';
import { conectarDB } from './ConnDB.js';
import { config } from './config/config.js';
import passport from "passport"
import cookieParser from "cookie-parser"
import local from "passport-local"
import bcrypt from "bcrypt"
import { usersModel } from './dao/models/usersModel.js';
import { CartsDAO } from './dao/CartsDAO.js';
const PORT=config.PORT;

const app=express();

app.use(passport.initialize())
passport.use("register", new local.Strategy(
    {usernameField:"email"},
    async(username, password, done)=>{
        try {
            password=bcrypt.hashSync(password, 10)
            let nuevoCart=await CartsDAO.addCart()
            let nuevoUsuario=await usersModel.create({email:username, password, cart: nuevoCart._id})
            console.log({nuevoUsuario})
            console.log(Object.keys(nuevoUsuario))
            return done(null, nuevoUsuario.toJSON())
        } catch (error) {
            console.log("entra al catch")
            return done(error)
        }
    }
))

passport.use("login", new local.Strategy(
    {usernameField:"email"},
    async (username, password, done)=>{
        try {
            let usuario=await usersModel.findOne({email:username}).lean()
            if(!usuario){
                return done(null, false)
            }
            if(!bcrypt.compareSync(password, usuario.password)){
                return done(null, false)
            }
            return done(null, usuario)
        } catch (error) {
            return done(error)
        }
    }
))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/sessions", sessionsRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

conectarDB(config.MONGO_URL, config.DB_NAME)