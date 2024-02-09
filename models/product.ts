import { Schema, model } from "mongoose";
import { ProductInterface } from "../interfaces/ProductInterface";

const productsSchema =  new Schema<ProductInterface>({
name: {
    type: String,
    required: [ true, "name is mandatory"],
    unique: true
},
active: {
 type: Boolean,
 default: true,
 required: true
},
user:{
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
},
price: {
    type: Number,
    default: 0,
},
category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true
},
description: {
    type: String,
},
available: {
    type: Boolean
}
})

productsSchema.methods.toJSON = function() {
    const {__v, active,  ...data } = this.toObject()
    return data
}


export const Product = model("product", productsSchema)