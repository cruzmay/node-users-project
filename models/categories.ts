import { Schema, model  } from "mongoose"
import { CategoriesInterface } from "../interfaces/categoriesInterface"

const categoriesSchema = new Schema<CategoriesInterface>({
    name: {
        type: String,
        required: [ true, "role not valid"],
        unique: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,

    }
})

categoriesSchema.methods.toJSON = function() {
    const {__v, active,  ...data } = this.toObject()
    return data
}

export const Category = model("category", categoriesSchema)