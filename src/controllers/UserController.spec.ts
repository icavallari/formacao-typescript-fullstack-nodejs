import { makeMockResponse } from "../__mocks__/mockResponse.mock"

import { Request } from "express"
import { makeMockRequest } from "../__mocks__/mockRequest.mock"
import { UserController } from "./UserController"

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn()
}

jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe('UserController', () => {

    const userController = new UserController()
    const mockResponse = makeMockResponse()

    it('Deve adicionar um novo usuario', () => {
        const mockRequest = {
            body: {
                name: 'rodrigo',
                email: 'icavallari@hotmail.com',
                password: '123456',
            }
        } as Request        

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message: 'usuario criado'})
    })

    it('Deve não adicionar um novo usuario por falta de email', () => {
        const mockRequest = {
            body: {
                name: 'rodrigo',
                email: '',
                password: '123456',
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'All fields must be informed'})
    })    

    it('Deve não remover usuario por falta do email', () => {

        const mockRequest = {
            body: {
                email: ''
            }
        } as Request

        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({
            message: 'E-mail must be informed',
        })

    })

    it('Deve retornar o usuario com o userId informado', async () => {

        const mockRequest = makeMockRequest({            
            params: {
                userId: '123456',
            }
        })

        userController.getUser(mockRequest, mockResponse)
        expect(mockUserService.getUser).toHaveBeenCalledWith('123456')
        expect(mockResponse.state.status).toBe(200)

    })

    /*it('Deve remover usuario', () => {

        const mockRequest = {
            body: {
                email: 'icavallari@hotmail.com'
            }
        } as Request

        const mockResponse = makeMockResponse()

        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({
            message : 'usuario deletado'
        })

    })*/

})