import { Router } from 'express';
import { addCart, getCarts, getPruebas, updateCart } from '../controller/CartsController.js';
export const router=Router()

router.get('/', getCarts)
// router.post("/", addCart)
router.put("/:id", updateCart)

router.get('/prueba', getPruebas);