import { User, UserService } from "./UserService"

describe('UserService', () => {

    const mockDB: User[] = []
    const userService = new UserService(mockDB)

    it('Deve adicionar um novo usuario', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('rodrigo', 'icavallari@hotmail.com')
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDB)
        expect(mockDB).toHaveLength(1)
    })


})