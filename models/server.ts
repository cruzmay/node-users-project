import express, { Express } from "express";
import cors from "cors"
import { dbConnection } from "../database/dbconnection";
import { userRouter } from "../Routes/users";


export class Server {
    private app: Express
    private port: string | undefined
    constructor(){
        this.app = express()
        this.port = process.env.PORT

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
        this.app.use("/api/users", userRouter )
    }
    public listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on port: ${this.port}`)
        })
    }
}  