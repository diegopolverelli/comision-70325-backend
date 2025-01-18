import { Router } from 'express';
import { createUser, getUsers, getUsersByEmail } from '../controllers/UsersController.js';
export const router=Router()

router.get('/', getUsers)
router.get("/:email", getUsersByEmail)
router.post("/", createUser)