import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {    

    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {

        const user = request.body

        if(!user.name || !user.email || !user.password){
            return response.status(400).json({message: 'All fields must be informed'})
        }
        
        this.userService.createUser(user.name, user.email, user.password)

        return response.status(201).json({ 
            message: 'usuario criado'
        })

    }

    getUser = async (request: Request, response: Response) => {

        const { userId } = request.params
        const user = await this.userService.getUser(userId)
        return response.status(200)
            .json(user)

    }

    getAllUsers = async (request: Request, response: Response) => {

        const users = await this.userService.getUsers();
        return response.status(200)
            .json(users)

    }

    deleteUser = (request: Request, response: Response) => {

        const userId = request.params.userId
        const email = request.body.email

        if(!email){
            return response.status(400).json({message: 'E-mail must be informed'})
        }

        this.userService.deleteUser(email)

        return response.status(200)
            .json({ message : 'usuario deletado' })
    }

}