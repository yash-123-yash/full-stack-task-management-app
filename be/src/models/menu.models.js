import mongoose from "mongoose"

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
})

export const Menu = mongoose.model("menu", menuSchema);