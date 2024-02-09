import { Response } from "express";
import { Category } from "../models/categories";
import {
  CategoriesInterface,
  CategoriesGetRequest,
  CategoryGetRequest,
  CategoryPostRequest,
  CategoryPutRequest,
  CategoryDeleteRequest,
} from "../interfaces";

const getCategories = async (req: CategoriesGetRequest, res: Response) => {
  const { limit, from } = req.query;
  const query: Partial<CategoriesInterface> = { active: true };

  const [count, categories] = await Promise.all([
    Category.countDocuments(query),
    Category
      .find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user", "name"),
  ]);

  res.json({ count, categories });
};
const getCategory = async (req: CategoryGetRequest, res: Response) => {
  const id = req.params.id;
  if (id) {
    const category = await Category.findById(id)
      .populate("user", "name");
    res.status(200).json({
      category,
    });
  } else {
    return res.status(404).json({
      msg: `category id:${id} doesn't exist in the DB`,
    });
  }
};

const categoriesPost = async (req: CategoryPostRequest, res: Response) => {
  const name = req.body.name.toUpperCase();
  const user = req.user?._id;

  const catergoryExist = await Category.findOne({ name });

  if (catergoryExist) {
    return res.status(401).json({
      msg: "this Category already exist",
    });
  }

  const data = {
    name,
    user,
  };

  const category = new Category(data);
  await category.save();

  res.status(200).json(category);
};

const putCategory = async (req: CategoryPutRequest, res: Response) => {
  const id: string | undefined = req.params.id;
  let { name } = req.body;
  name = name.toUpperCase();
  const category = await Category
    .findOneAndUpdate({ _id: id }, { name }, { new: true })
    .populate("user", "name");

  if (category) {
    res.json(category);
  } else {
    return res.status(404).json({ msg: "category not found in DB" });
  }
};

const deleteCategory = async (req: CategoryDeleteRequest, res: Response) => {
  const id: string | undefined = req.params.id;
  const category = await Category
    .findOneAndUpdate({ _id: id }, { active: false }, { new: true })
    .populate("user", "name");
  if (category) {
    res.json(category);
  } else {
    return res.status(404).json({ msg: "category not found in DB" });
  }
};

export {
  categoriesPost,
  getCategories,
  getCategory,
  putCategory,
  deleteCategory,
};
