import { Request, Response } from "express"
import { sign } from "jsonwebtoken"

const user = {
    id_user: '',
    name: '',
    email: '',
    password: ''
}

export class LoginController {

    login = async (request: Request, response: Response) => {

        const tokenData = {
            name: user.name,
            email: user.email
        }

        const tokenKey = '123456'
        const tokenOption = {
            subject: user.id_user
        }

        const token = sign( tokenData, tokenKey, tokenOption )

        return response.status(200)
            .json({
                token
            })
    }

}