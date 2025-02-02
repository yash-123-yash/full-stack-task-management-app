import { Router } from 'express'
import { handleLogin,handleLogout,handleSignup } from '../controllers/user.controllers.js'
import { checkUser } from '../middlewares/userAuth.middlewares.js'

export const authRouter = Router()

authRouter.post("/login",handleLogin)
authRouter.post('/signup',handleSignup)
authRouter.get('/logout',checkUser,handleLogout)






