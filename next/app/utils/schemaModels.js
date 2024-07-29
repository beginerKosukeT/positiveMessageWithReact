import mongoose from "mongoose"

const Schema = mongoose.Schema

const ItemSchema = new Schema(
    {
        title: String,
        image: String,
        author: String,
        message: String,
        email: String,
    },
    { timestamps: true }
)

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema)
export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)