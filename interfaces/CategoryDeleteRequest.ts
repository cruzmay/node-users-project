import { Request } from "express";
import { CategoriesInterface } from "./categoriesInterface";

interface CategoryDeleteParams {
    id?: string
}

export interface CategoryDeleteRequest extends Request<CategoryDeleteParams, {}, CategoriesInterface> {
    uid?: string
} 