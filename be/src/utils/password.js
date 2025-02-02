import { hash, compare } from "bcrypt";
import { SALT_ROUND } from "./config.js";

export async function hashPass(password){
    try {
        const hashedPass = await hash(password,SALT_ROUND)
        return hashedPass
    } catch (e) {
        console.log(e)
    }
}

export async function verifyPass(password, hashedPass){
    try {
        const verified = await compare(password, hashedPass);
        if(!verified){
            return false
        } else {
            return true
        }
    } catch (e) {
        console.log(e)
    }
}