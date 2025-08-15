import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"

export const getCurrentUser=async(req, res)=>{
    try{
        const userId=req.userId
        const user=await User.findById(userId).select("-password")
        if(!user){
           return res.status(401).json({ message: "User not found" });           
        }
           return res.status(200).json(user);
    
    }catch(error){
       return res.status(500).json(error);
    }
}

// // Inside user.controller.js
// export const updateAssistant = async (req, res) => {
//   try {
//     const { assistantName, imageUrl } = req.body;
//     let assistantImage;

//     // Check for a new file upload first
//     if (req.file) {
//       assistantImage = await uploadOnCloudinary(req.file.path);
//     } 
//     // If no file was uploaded, check if an imageUrl was sent from the frontend
//     else if (imageUrl) {
//       assistantImage = imageUrl;
//     } else {
//       // You might want to handle this case, e.g., if no image is provided at all
//       assistantImage = null; // Or use a default image URL
//     }

//     const user = await User.findByIdAndUpdate(
//       req.userId, {
//         assistantName,
//         assistantImage
//       }, {
//         new: true
//       }
//     ).select("-password");

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };
export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;
   console.log("req file:",req.file)
   console.log("img url:",imageUrl)
    if (req.file) {
      // This is where the error from uploadOnCloudinary will be caught
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else if (imageUrl) {
      assistantImage = imageUrl;
    } else {
      assistantImage = null;
    }

    const user = await User.findByIdAndUpdate(
      req.userId, {
        assistantName,
        assistantImage
      }, {
        new: true
      }
    ).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    // This will now correctly catch the error thrown from uploadOnCloudinary
    console.error("Error in updateAssistant:", error);
    return res.status(500).json(error);
  }
};