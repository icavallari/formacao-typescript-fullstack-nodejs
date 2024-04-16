import { User, UserService } from "./UserService"

describe('UserService', () => {

    const mockDB: User[] = []
    const userService = new UserService(mockDB)

    it('Deve criar/remover usuario', () => {
        const mockConsole = jest.spyOn(global.console, 'log')

        userService.createUser('rodrigo', 'icavallari@hotmail.com')
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', [
            { name: 'rodrigo', email: 'icavallari@hotmail.com' }
        ])

        userService.deleteUser('icavallari@hotmail.com')
        expect(mockConsole).toHaveBeenCalledWith('DB apos delecao', [])
    })


})