import { Request } from "express";
import { UserInterface } from "./UserInterface";
import { ProductInterface } from "./ProductInterface";
import { CategoriesInterface } from "./categoriesInterface";

interface PostRequestBody extends ProductInterface {
    name: string
    price: number
    category: CategoriesInterface
    description: string
    available: boolean
}

export interface ProductPostInterface extends Request<{},{}, PostRequestBody> {
    user?: UserInterface
}