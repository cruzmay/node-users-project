import { Request, Response } from "express";
import { ProductInterface, ProductPostInterface } from "../interfaces";
import { Product } from "../models/product";

const getProducts = async (req: Request, res: Response) => {
  const { limit, from } = req.query;
  const query: Partial<ProductInterface> = { active: true };

  const [count, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("category", "name")
      .populate("user", "name"),
  ]);

  res.json({ count, products });
};

const getProductsById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
    const product = await Product.findById(id)
      .populate("user", "name")
      .populate("category", "name");
    res.status(200).json({
      product,
    });
  } else {
    return res.status(404).json({
      msg: `Product id:${id} doesn't exist in the DB`,
    });
  }
};

const postProduct = async (req: ProductPostInterface, res: Response) => {
  const { name, description, category, price } = req.body;
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
};

const putProduct = async (req: Request, res: Response) => {
  const id: string | undefined = req.params.id;
  let { user, ...rest } = req.body;
  const product = await Product.findOneAndUpdate(
    { _id: id },
    { ...rest },
    { new: true }
  )
    .populate("user", "name")
    .populate("category", "name");

  if (product) {
    res.json(product);
  } else {
    return res.status(404).json({ msg: "Product not found in DB" });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const id: string | undefined = req.params.id;
  const category = await Product
    .findOneAndUpdate({ _id: id }, { active: false }, { new: true })
    .populate("user", "name")
    .populate("category", "name");
  if (category) {
    res.json(category);
  } else {
    return res.status(404).json({ msg: "category not found in DB" });
  }
};

export { getProducts, getProductsById, postProduct, putProduct, deleteProduct };
