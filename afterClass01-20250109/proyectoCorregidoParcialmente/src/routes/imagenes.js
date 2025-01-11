import { Router } from 'express';
import { uploadProds } from '../config/multer.js';

// Configuración de multer para subir imágenes de productos
const multerRouter = Router();

// Ruta para subir imágenes de productos
multerRouter.post('/products', uploadProds.single('product'), (req, res) => {
  console.log(req);
  res.status(200).send('imagen subida');
});

export default multerRouter;
