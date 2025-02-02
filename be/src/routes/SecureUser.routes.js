import { Router } from "express"
import { checkUser } from "../middlewares/userAuth.middlewares.js";

export const SecureUserroutes = Router();

SecureUserroutes.get('/secure/user', checkUser, (req, res) => {
    const user = req.user;
    
    if (user) {
        res.status(202).json({
            message: "User is authenticated",
            user: user 
        });
    } else {
        res.status(401).json({
            error: "User not authenticated"
        });
    }
});