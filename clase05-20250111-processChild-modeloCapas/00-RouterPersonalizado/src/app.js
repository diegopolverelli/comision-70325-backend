import express from 'express';
import { router as pruebasRouter } from './routes/pruebasRouter.js';
import { HeroesRouter } from './routes/HeroesRouter.js';
import { ProductsRouter } from './routes/Products.Router.js';
import { SessionsRouter } from './routes/SessionsRouter.js';
import { config } from './config/config.js';

// const PORT=3000;
const PORT=config.PORT;

const app=express();
const heroesRouter=new HeroesRouter()
const productsRouter=new ProductsRouter()
const sessionsRouter=new SessionsRouter()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/pruebas", pruebasRouter)
app.use("/api/heroes", heroesRouter.getRouter())
app.use("/api/products", productsRouter.getRouter())
app.use("/api/sessions", sessionsRouter.getRouter())

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
