import { Router } from 'express';
import { ProductsController } from '../controller/ProductsController.js';
import passport from 'passport';
export const router=Router()

router.get('/', passport.authenticate("current", {session: false}), ProductsController.getProducts)
router.get('/seed', passport.authenticate("current", {session: false}), ProductsController.seed)