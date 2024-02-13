import { Request, Response } from "express";
import { SearchRequestParams } from "../interfaces/SearchRequestParams";
import { isValidObjectId } from "mongoose";
import { User } from "../models/User";
import { Category } from "../models/categories";
import { Product } from "../models/product";

enum enumCollections {
    user = "users", 
    category = "categories",
    product = "products"

}

const searchUser = async (item: string, res: Response) => {
    const isValidId = isValidObjectId(item)
    if(isValidId) {
        const user = await User.findById(item)
        return res.json({
            results: user ? [user] : []
        })
    }
    const regex = new RegExp(item, "i")
    const users = await User.find({
        $or:[{name: regex}, {email: regex}],
        $and:[{active: true}]
    })
    res.json({
        results: users
    })
}
const searchCategory = async (item: string, res: Response) => {
    const isValidId = isValidObjectId(item)
    if(isValidId) {
        const cat = await Category.findById(item)
        return res.json({
            results: cat ? [cat] : []
        })
    }
    const regex = new RegExp(item, "i")
    const category = await Category.find({
        $or:[{name: regex}],
        $and:[{active: true}]
    })
    res.json({
        results: category
    })
}
const searchProduct = async (item: string, res: Response) => {
    const isValidId = isValidObjectId(item)
    if(isValidId) {
        const prod = await Product.findById(item)
        return res.json({
            results: prod ? [prod] : []
        })
    }
    const regex = new RegExp(item, "i")
    const product = await Product.find({
        $or:[{name: regex},{price: Number(item)? Number(item): 0}],
        $and:[{active: true}]
    })
    res.json({
        results: product
    })
}

export const search = (req: Request<SearchRequestParams>, res: Response) => {

let { collection, item} = req.params
collection = collection.toLowerCase()

switch (collection) {
    case enumCollections.category:
        searchCategory(item, res)
        break;
    case enumCollections.user:
        searchUser(item, res)
        break;
    case enumCollections.product:
        searchProduct(item, res)
        break;
    default:
        res.status(500).json({
            msg: `DB error, collections allowed: ${Object.values(enumCollections).join(", ")} `
        })
}
}