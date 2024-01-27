import { Schema, model } from "mongoose"
import { UserRoleEnum, UserInterface } from "../interfaces"


const userSchema = new Schema<UserInterface>({
    name: {
        type: String,
        required: [ true, "name is required"]
    },
    email: {
        type: String,
        required: [ true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [ true, "password is required"]
    },
    role: {
        type: String,
        required: true,
        enum: UserRoleEnum
    },
    active: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String,
    },
    google: {
        type: Boolean,
        default: false,
    }


})

userSchema.methods.toJSON = function() {
    const {__v, password, ...user } = this.toObject()
    return user
}

const User = model("user", userSchema)
export { User }