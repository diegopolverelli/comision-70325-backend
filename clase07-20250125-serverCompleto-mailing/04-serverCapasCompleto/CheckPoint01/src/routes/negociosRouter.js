import { Router } from 'express';
import { NegociosController } from '../controller/NegociosController.js';
export const router=Router()

router.get('/', NegociosController.getNegocios)
router.post("/", NegociosController.createNegocio)