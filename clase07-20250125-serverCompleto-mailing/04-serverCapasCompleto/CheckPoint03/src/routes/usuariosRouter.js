import { Router } from 'express';
import { UsuariosController } from '../controller/usuariosController.js';
export const router=Router()

router.get('/', UsuariosController.getUsuarios)
router.post("/", UsuariosController.createUsuario)