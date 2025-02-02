import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./db/index.js";


const app = express()

// Middlewares
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())
app.use(cors({credentials:true, origin:["https://full-stack-task-management-app-gules.vercel.app", "http://localhost:5173"]}))




// Routes
import { authRouter } from "./routes/auth.routes.js";
import { menuRoute } from "./routes/menu.routes.js";
import { orderRoute } from "./routes/order.routes.js";
import { PORT } from "./utils/config.js";

app.use("/api/v1/auth",authRouter)
app.use('/api/v1/menu',menuRoute)
app.use('/api/v1/order',orderRoute)




connectDB().then(() => {
    app.listen(PORT,()=>{
        console.log(`Server Started at PORT ${PORT}`)
    })
}).catch((e) => {
    console.log(e)
})