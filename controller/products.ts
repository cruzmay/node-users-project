import { Request, Response } from "express";
import { ProductInterface, ProductPostInterface } from "../interfaces";
import { Product } from "../models/product";

const getProducts = async (req: Request, res: Response) => {
    const { limit, from } = req.query;
    const query: Partial<ProductInterface> = { active: true };
  
    const [count, products] = await Promise.all([
      Product.countDocuments(query),
      Product
        .find(query)
        .skip(Number(from))
        .limit(Number(limit))
        .populate("category", "name")
        .populate("user", "name")
    ]);
  
    res.json({ count, products });
}

const getProductsById = (req: Request, res: Response) => {
    res.json({msg: "get - product by Id"})
}

const postProduct = async (req: ProductPostInterface, res: Response) => {
    const {name, description, category, price } = req.body;
    const user = req.user?._id;
  
    const productExist = await Product.findOne({ name });
  
    if (productExist) {
      return res.status(401).json({
        msg: "this Product already exist",
      });
    }
  
    const data = {
      name,
      description,
      category,
      price,
      user,
    };
  
    const product = new Product(data);
    await product.save();
  
    res.status(200).json(product);
}

const putProduct = (req: Request, res: Response) => {
    res.json({msg: "put - product"})
}

const deleteProduct = (req: Request, res: Response) => {
    res.json({msg: "delete - product"})
}

export {
    getProducts,
    getProductsById,
    postProduct,
    putProduct,
    deleteProduct
}