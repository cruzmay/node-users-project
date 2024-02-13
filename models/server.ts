import express, { Express } from "express";
import cors from "cors"
import { dbConnection } from "../database/dbconnection";
import { authRouter, userRouter, categoriesRouter, productsRouter } from "../Routes";
import { PathsInterface } from "../interfaces";
import { searchRouter } from "../Routes/search";


export class Server {
    private app: Express
    private port: string | undefined
    public paths: PathsInterface

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            auth: "/api/auth",
            user: "/api/users",
            categories: "/api/categories",
            products: "/api/products",
            search: "/api/search"
        }

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
        this.app.use(this.paths.user, userRouter)
        this.app.use(this.paths.auth, authRouter)
        this.app.use(this.paths.categories, categoriesRouter)
        this.app.use(this.paths.products, productsRouter)
        this.app.use(this.paths.search, searchRouter)
    }
    public listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on port: ${this.port}`)
        })
    }
}  