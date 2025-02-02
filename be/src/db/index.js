import mongoose from "mongoose";
import { DATABASE_URL } from "../utils/config.js";

const dbString = DATABASE_URL

export async function connectDB(){
    await mongoose.connect(dbString)
    return;
}