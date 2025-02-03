import { verifyToken } from "../utils/userAuthService.js";

export const checkUser= (req,res,next)=>{
    const authId = req.headers.authorization;

    if(!authId){
        return res.status(401).json({
            message: "User Unauthorization"
        })
    }

    const token = authId.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    const user = verifyToken(token)

    console.log("middle: ", user)

    if(!user){

        return res.status(401).json({
            message:"No user Found"
        })
    }

    req.user=user

    next()
}