import { Request } from "express";
import { CategoriesInterface } from "./categoriesInterface"; {}

interface CategoryPutParams {
    id?: string
}

export interface CategoryPutRequest extends Request<CategoryPutParams, {}, CategoriesInterface> {
    uid?: string
}