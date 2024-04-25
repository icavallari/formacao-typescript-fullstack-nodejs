import * as jwt from 'jsonwebtoken'
import { UserService } from "./UserService"

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {

    const userService = new UserService(mockUserRepository)
    const mockUser = {
        id_user: '123456',
        name: 'rodrigo',
        email: 'icavallari@hotmail.com',
        password: '123456'
    }

    it('Deve criar/remover usuario', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))

        const response = await userService.createUser('rodrigo', 'icavallari@hotmail.com', '')
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)

        //userService.deleteUser('icavallari@hotmail.com')
        //expect(mockConsole).toHaveBeenCalledWith('DB apos delecao', [])
    })

    it('Deve retornar token de usuario', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(
            () => Promise.resolve(mockUser)
        )

        jest.spyOn(jwt, 'sign').mockImplementation(
            () => 'token'
        )

        const token = await userService.getToken('rodrigo@com', '123456')
        expect(token).toBe('token')
    })

    it('Deve retornar erro quando usuario invalido', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(
            () => Promise.resolve(null)
        )
         
        await expect(userService.getToken('rodrigo@', '123456'))
            .rejects.toThrow(new Error('Email/password invalid!'))
    })

})