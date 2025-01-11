import { Router } from 'express';
import {
  getCart,
  createCart,
  insertProductCart,
  updateProductsCart,
  updateQuantityProductCart,
  deleteCart,
  deleteProductCart,
} from '../controllers/carts.controllers.js';

const cartRouter = Router();

cartRouter.get('/:cid', getCart); //Consultar los productos guardados en un carritp
cartRouter.post('/', createCart); //Crear un nuevo carrito
cartRouter.post('/:cid/products/:pid', insertProductCart); //Agregar nuevo producto al carrito
cartRouter.put('/:cid', updateProductsCart); //Mofidicar totalmente el array de productos del carrito
cartRouter.put('/:cid/products/:pid', updateQuantityProductCart); //Actualizo cantidad de productos
cartRouter.delete('/:cid', deleteCart); //Elimino todos los productos del carrito
cartRouter.delete('/:cid/products/:pid', deleteProductCart); //Elimino producto del carrito

export default cartRouter;
