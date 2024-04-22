import express, { Request, Response } from 'express'
import "reflect-metadata"
import { router } from './routes'

const server = express()

server.use(express.json())
server.use(router)

server.get('/', (request: Request, response: Response) => {
    response.status(200).json({
        message: 'DioBank API'
    })
})

server.listen(5000, () => console.log('server on') )