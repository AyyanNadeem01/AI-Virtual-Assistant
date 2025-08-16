import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import { v2 as cloudinary } from 'cloudinary';
import geminiResponse from "./gemini.js"

dotenv.config()
const app=express()

// Add the Cloudinary configuration here, after dotenv.config()
// The process.env variables are now available.
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173", credentials:true
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

// app.get("/", async (req, res) => {
//   let prompt = req.query.prompt;
//   if (!prompt) {
//     return res.status(400).json({ error: "Prompt is required" });
//   }
//   let data = await geminiResponse(prompt);
//   res.json(data);
// });


app.listen(port,()=>{
    connectDb();
    console.log("Server is running at PORT:",port) 
})