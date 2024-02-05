import express, { Express } from "express";
import cors from "cors"
import { dbConnection } from "../database/dbconnection";
import { authRouter, userRouter } from "../Routes";


export class Server {
    private app: Express
    private port: string | undefined
    public usersPath: string
    public authPath: string
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = "/api/users"
        this.authPath = "/api/auth"

        this.connectDatabase()
        this.middlewares()
        this.routes()
    }
    private async connectDatabase () {
        await dbConnection()
    }
    private middlewares() {
       this.app.use(express.static("public")) 
       this.app.use(cors())
       this.app.use(express.json())
    }
    public routes() {
        this.app.use(this.usersPath, userRouter)
        this.app.use(this.authPath, authRouter)
    }
    public listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on port: ${this.port}`)
        })
    }
}  