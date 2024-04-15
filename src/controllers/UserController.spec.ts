//import { makeMockRequest } from "../__mocks__/mockRequest.mock"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"

import { Request } from "express"
import { UserService } from "../services/UserService"
import { UserController } from "./UserController"

describe('UserController', () => {

    const mockUserService: Partial<UserService> = {
        createUser: jest.fn()
    }
    const userController = new UserController(mockUserService as UserService)    

    it('Deve adicionar um novo usuario', () => {
        const mockRequest = {
            body: {
                name: 'rodrigo',
                email: 'icavallari@hotmail.com'
            }
        } as Request

        const mockResponse = makeMockResponse()

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message: 'usuario criado'})
    })

})