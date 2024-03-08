import { UserInterface } from "./UserInterface"
import { CategoriesInterface } from "./categoriesInterface"

export interface ProductInterface {
    name: string
    active: boolean
    user: UserInterface
    price: number
    category: CategoriesInterface
    description: string
    available: boolean
    img: string
}