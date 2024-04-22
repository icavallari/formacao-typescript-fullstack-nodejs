import { AppDataSource } from "../database"
import { User } from "../entities/User"
import { UserRepository } from "../repositories/UserRepository"

export class UserService {

    private userRepository: UserRepository

    constructor(
        userRepository = new UserRepository(AppDataSource.manager)
    ){
        this.userRepository = userRepository
    }

    createUser = async (name: string, email: string, password: string): Promise<User | null> => {
        const user = new User(name, email, password)
        return this.userRepository.createUser(user)
    }

    getUser = async (userId: string): Promise<User | null> => {
        return this.userRepository.getUser(userId)
    }

    getUsers = async (): Promise<User[] | null>  => {
        return this.userRepository.getUsers()
    }

    deleteUser = async (email: string) => {

    }

}