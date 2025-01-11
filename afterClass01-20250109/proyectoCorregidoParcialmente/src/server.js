import express from 'express';
import mongoose from 'mongoose';
import { create } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import { __dirname } from './path.js';
import productRouter from './routes/productos.js';
// import cartRouter1 from './routes/carritos.routes.js';
import multerRouter from './routes/imagenes.js';
import cartRouter from './routes/carritos.js';
import chatRouter from './routes/chat.js';
import orderRouter from './routes/orders.routers.js';
import { router as vistasRouter } from './routes/viewsRouter.js';
import { ProductsDAO } from './dao/ProductsDAO.js';


const app = express();
const handlebars = create();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log('Server on port', PORT);
});

//mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// 'mongodb+srv://amdelavegalic:m0r3n42024@cluster-backend.lgcd4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-backend'
// "mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=prueba100"


await mongoose
.connect(
  'mongodb+srv://amdelavegalic:m0r3n42024@cluster-backend.lgcd4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-backend'
)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log(err));

// Inicializo Socket.io en el servidor
const io = new Server(server);

app.use(express.json()); // middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); // middleware para parsear URL-encoded

// Configuración de handlebars

app.engine('handlebars', handlebars.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get("/prueba", async(req, res)=>{

  let productos=await ProductsDAO.get2()
  // console.log(productos)

  console.log(productos[0])
  console.log(Object.keys(productos[0]))

  let producto2=productos[0].toJSON()
  console.log(producto2)
  console.log(Object.keys(producto2))



  res.setHeader('Content-Type','application/json');
  return res.status(200).json({productos});


})

// app.use('/public', express.static(path.join(__dirname, 'public'))); // middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // middleware para archivos estáticos
app.use('/api/products', productRouter); // middleware para rutas
app.use('/api/carts', cartRouter); // middleware para rutas
app.use('/api/chat', (req, res, next)=>{
  console.log("/api/chat")

  next()
}, chatRouter); // middleware para rutas
app.use('/api/orders', orderRouter); // middleware para rutas
app.use('/upload', multerRouter); // middleware para subir archivos
app.use("/", vistasRouter)

app.get('/', (req, res) => {
  res.status(200).send('Ok');
});

let mensajes = [];
//Conexiones de socket.io
//socket = info que llega de la conexion
io.on('connection', (socket) => {
  //Cuando se producza el "apreton de manos", puedo ejecutar las sigueintes funciones
  console.log('Usuario conectado: ', socket.id); //ID de conexion

  socket.on('mensaje', (data) => {
    //Cuando el usuario me envia un mensaje, trabajo con esos datos
    console.log('Mensaje recibido: ', data);
    mensajes.push(data);
    //Envia el array de mensajes
    socket.emit('respuesta', mensajes);
  });

  //Detectar desconexion
  socket.on('disconnect', () => {
    console.log('Usuario desconectado: ', socket.id);
  });
});

