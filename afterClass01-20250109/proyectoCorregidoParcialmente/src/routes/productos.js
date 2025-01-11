import { Router } from 'express';

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controllers.js';

const productRouter = Router();

productRouter.get('/', getProducts); // Consultar productos
productRouter.get('/:pid', getProduct); // Consultar producto via ID
productRouter.post('/', createProduct); //Crear un nuevo producto
productRouter.put('/:pid', updateProduct); //Actualiza un producto dado su id y pido los datos a actualizar del cuerpo de la peticion
productRouter.delete('/:pid', deleteProduct); //Elimina un producto dado su id

export default productRouter;
