import { Request } from "express";

export interface CategoriesGetRequest extends Request {
    uid?: string
}