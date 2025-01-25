import { Router } from 'express';
import { OrdenesController } from '../controller/OrdenesController.js';
export const router=Router()

router.get('/', OrdenesController.getOrdenes)
router.post("/", OrdenesController.createOrden)