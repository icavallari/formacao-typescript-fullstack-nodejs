import { UserService } from "./UserService"

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {

    const userService = new UserService(mockUserRepository)

    it('Deve criar/remover usuario', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
            id_user: '123456',
            name: 'rodrigo',
            email: 'icavallari@hotmail.com',
            password: '123456'
        }))

        const response = await userService.createUser('rodrigo', 'icavallari@hotmail.com', '')
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            id_user: '123456',
            name: 'rodrigo',
            email: 'icavallari@hotmail.com',
            password: '123456'
        })

        //userService.deleteUser('icavallari@hotmail.com')
        //expect(mockConsole).toHaveBeenCalledWith('DB apos delecao', [])
    })


})