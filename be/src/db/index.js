import mongoose from "mongoose";
import { DATABASE_URL } from "../utils/config.js";

const dbString = DATABASE_URL;

const options = {
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true,
    }
  };

export async function connectDB(){
    await mongoose.connect(dbString, options)
    return;
}