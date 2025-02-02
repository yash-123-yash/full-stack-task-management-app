import { verifyToken } from "../utils/userAuthService.js";

export const checkUser= (req,res,next)=>{
    const sessionId = req.cookies.sessionId;

    if(!sessionId){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    const user = verifyToken(sessionId)

    console.log("middle: ", user)

    if(!user){

        return res.status(401).json({
            message:"No user Found"
        })
    }

    req.user=user

    next()
}