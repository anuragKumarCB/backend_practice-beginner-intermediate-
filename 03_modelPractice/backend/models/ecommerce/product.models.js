import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    productImg: {
        type: String,
    },
    stocks: {
        type: Number,
        default: 0
    },
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }
}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema)