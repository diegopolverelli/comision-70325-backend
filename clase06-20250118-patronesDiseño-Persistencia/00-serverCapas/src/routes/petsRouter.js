import { Router } from 'express';
import { PetsManager } from '../dao/PetsManager.js';
import { PetsController } from '../controllers/PetsController.js';
export const router=Router()

router.get('/', PetsController.getPets)

router.post("/", PetsController.createPet)