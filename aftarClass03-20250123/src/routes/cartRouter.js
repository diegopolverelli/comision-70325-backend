import { Router } from 'express';
import { addCart, getCarts, getPruebas, purchaseCart, updateCart } from '../controller/CartsController.js';
import passport from 'passport';
export const router=Router()

router.get('/', getCarts)
// router.post("/", addCart)
router.put("/:id", passport.authenticate("current", {session:false}), updateCart)

router.get('/prueba', getPruebas);

router.get(
    '/purchase/:cid', 
    passport.authenticate("current", {session:false}),
    purchaseCart 
);