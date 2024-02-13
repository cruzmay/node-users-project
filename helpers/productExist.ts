import { Product } from "../models/product"

export const productExist = async (id: string) => {
    const product = await Product.findById(id)
    if(!product) {
        throw new Error( `not Product in DB`)
    }
}