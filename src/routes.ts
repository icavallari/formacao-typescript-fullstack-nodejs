import { Router } from "express";
import { LoginController } from "./controllers/LoginController";
import { UserController } from './controllers/UserController';

export const router = Router()

const userController = new UserController()
const loginController = new LoginController()

router.post('/user', userController.createUser)
router.get('/user/:userId', userController.getUser)
router.delete('/user/:userId', userController.deleteUser)
router.get('/users', userController.getAllUsers)

router.post('/login', loginController.login)

