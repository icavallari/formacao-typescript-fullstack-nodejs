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

        if(!user.name){
            return response.status(400).json({message: 'Name must be informed'})
        }
        
        this.userService.createUser(user.name, user.email)

        return response.status(201).json({ 
            message: 'usuario criado'
        })

    }

    getAllUsers = (request: Request, response: Response) => {

        return response.status(200)
            .json(this.userService.getUsers())

    }

    deleteUser = (request: Request, response: Response) => {

        const email = request.body.email

        if(!email){
            return response.status(400).json({message: 'E-mail must be informed'})
        }

        this.userService.deleteUser(email)

        return response.status(200)
            .json({ message : 'usuario deletado' })
    }

}