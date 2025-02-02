import { User } from "../models/user.models.js"
import { hashPass, verifyPass } from "../utils/password.js";
import { userSchema } from "../utils/schema.js";
import { signToken } from "../utils/userAuthService.js"

export const handleSignup=async (req,res)=>{
    const inputData = userSchema.safeParse(req.body);
    
    if(!inputData.success){
        const errormMessage = inputData.error.errors.map((err) => {
            return {
                message: err.message
            }
        });
        return res.status(409).json({
            message: errormMessage[0].message
        })
    }
    
    const { email, password, name} = inputData.data

    try {

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(401).json({
                message:"User Already Exists"
            })
        }

        const hass = await hashPass(password);

        if(!hass){
            return res.status(500).json({
                message: "unable to parse password"
            })
        }

        const user = await User.create({
            name: name,
            email: email,
            password: hass
        })      

        if(!user){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }

        const token = signToken(user);

        if(!token){
            return res.status(500).json({
                message: "token not found"
            })
        }

        return res.status(201).cookie("sessionId", token).json({
            message: "User created successfully",
        });  
    } catch (error) {
        console.log(error);
    }
}


export const handleLogin = async(req,res) => {

    const inputData = userSchema.safeParse(req.body);

    if(!inputData.success){
        const errormMessage = inputData.error.errors.map((err) => {
            return {
                message: err.message
            }
        });
        return res.status(409).json({
            message: errormMessage[0].message
        })
    }

    const {  email, password }= inputData.data;

    const user = await User.findOne({
        
        email: email
    })

    if(!user){
        return res.status(402).json({
            message: "User not found"
        })
    }

    const verified = verifyPass(password, user.password)

    if(verified === false) {
        return res.status(401).json({
            message: "password is invalid"
        })  
    }

    const token = signToken(user)

    if(!token){
        return res.status(500).json({
            message: "token not found"
        })
    }

    return res.cookie("sessionId",token).status(201).json({
        message:"User Logged in Successfully "
    })

}


export const handleLogout=async(req,res)=>{

    try {
        const user = req.user
        if(!user){
            return res.json({
                message:"User is Unauthorized"
            })
        
        }
          return res.status(204)
                .clearCookie("sessionId")
                .json({
                    message:"User Logged Out Successfully"
                })
        
    } catch (error) {
        console.log(error)
    }
}