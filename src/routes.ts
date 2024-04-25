import { Router } from "express";
import { LoginController } from "./controllers/LoginController";
import { UserController } from './controllers/UserController';
import { verifyAuth } from "./middleware/verifyAuth";

export const router = Router()

const userController = new UserController()
const loginController = new LoginController()

router.post('/user', userController.createUser)
router.get('/user/:userId', verifyAuth, userController.getUser)
//router.delete('/user/:userId', userController.deleteUser)
router.get('/users', userController.getAllUsers)

router.post('/login', loginController.login)

