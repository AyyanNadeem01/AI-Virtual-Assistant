// cloudinary.js

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadOnCloudinary = async (filePath) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath);
        fs.unlink(filePath, (err) => {
            if (err) console.error("Failed to delete local file:", err);
        });
        return uploadResult.secure_url;
    } catch (error) {
        fs.unlink(filePath, (err) => {
            if (err) console.error("Failed to delete local file after upload error:", err);
        });
        throw error;
    }
}

export default uploadOnCloudinary;