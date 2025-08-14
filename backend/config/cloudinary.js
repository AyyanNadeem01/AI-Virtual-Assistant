import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
const uploadOnCloudinary=async(filePath)=>{
     cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_CLOUD_API, 
        api_secret: process.env.CLOUDINARY_CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
    });

    try {
     const uploadResult = await cloudinary.uploader
       .upload(
           filePath
       )
       fs.unlink(filePath)
       return uploadResult.secure_url
    } catch (error) {
        fs.unlink(filePath)
        console.log(error)
        return res.status(500).json({message:"internal server error"})
    }
}

export default uploadOnCloudinary