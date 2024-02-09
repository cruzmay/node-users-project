import { NextFunction, Request, request } from "express"
import { Category } from "../models/categories"

export const categoryExist = async (id: string) => {
    const category = await Category.findById(id)
    if(!category) {
        throw new Error( `not Category in DB`)
    }
}