import dotenv from "dotenv";

dotenv.config()

export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const SALT_ROUND = parseInt(process.env.SALT_ROUND);
export const PORT = process.env.PORT;