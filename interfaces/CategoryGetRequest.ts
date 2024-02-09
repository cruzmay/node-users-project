import { Request } from "express";

interface CategoryId {
    id?: string
}

export interface CategoryGetRequest extends Request<CategoryId> {
  uid?: string
}