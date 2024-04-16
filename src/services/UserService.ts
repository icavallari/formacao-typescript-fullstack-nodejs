export interface User {
    name: string,
    email: string
}

const db: any = [
    {
        name: 'rodrigo',
        email: 'icavallari@hotmail.com'
    }
]

export class UserService {

    db: User[]

    constructor( 
        database = db
    ){
        this.db = database
    }

    createUser = (name: string, email: string) => {
        this.db.push({
            name,
            email
        })

        console.log('DB atualizado', this.db)
    }

    getUsers = () => {
        return this.db
    }

    deleteUser = (email: string) => {
        this.db = this.db.filter(e => e.email !== email)
        console.log('DB apos delecao', this.db)
    }

}