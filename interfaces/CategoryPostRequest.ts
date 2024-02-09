import { Request } from "express";
import { UserInterface } from "./UserInterface";

export interface CategoryPostRequest extends Request {
    user?: UserInterface
}