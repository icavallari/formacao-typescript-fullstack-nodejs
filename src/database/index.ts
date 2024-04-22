import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/User"

export const AppDataSource = new DataSource({
    type: "sqlite",
    entities: [
        User
    ],
    database: "./src/database/db.sqlite",
    migrations: ["./src/database/migrations/**.ts"]
})

AppDataSource.initialize()
    .then(() => {
        console.log("data source inicializado")
    })
    .catch((error) => {
        console.log(error)
    })