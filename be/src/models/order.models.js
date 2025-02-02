import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [{
        menuId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "menu",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalAmount: {      
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    }
}, {
    timestamps: true
})

export const Order = mongoose.model("order", orderSchema)