import multer from 'multer';
import { __dirname } from '../path.js';

// Configuración de multer para subir imágenes de productos
const storageProducts = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/public/img/products`); // Guardar las imágenes en esta carpeta
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`); // Concatenar la fecha actual con el nombre original del archivo
  },
});

// Middleware para utilizar a nivel de ruta
export const uploadProds = multer({ storage: storageProducts });
