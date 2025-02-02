import Jwt  from "jsonwebtoken"
import { JWT_SECRET } from "./config.js"

const secreteKey = JWT_SECRET

export const signToken=(user)=>{
    
    const payload = {
        _id:user._id.toString(),
        email:user.email
    }

    console.log(payload)
    
    const token = Jwt.sign(payload, secreteKey)
    
    return token;
}

export const verifyToken=(token)=>{
    
    if(!token){
        return null
    }

    const user = Jwt.verify(token,secreteKey)
    
    console.log("verify: ",user)
    return user
}