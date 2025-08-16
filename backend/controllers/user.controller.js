import { response } from "express"
import uploadOnCloudinary from "../config/cloudinary.js"
import geminiResponse from "../gemini.js"
import User from "../models/user.model.js"
import moment from "moment"
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

// Inside user.controller.js
export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;

    // Check for a new file upload first
    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    } 
    // If no file was uploaded, check if an imageUrl was sent from the frontend
    else if (imageUrl) {
      assistantImage = imageUrl;
    } else {
      // You might want to handle this case, e.g., if no image is provided at all
      assistantImage = null; // Or use a default image URL
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
    return res.status(500).json(error);
  }
};


export const askToAssistant=async(req,res)=>{
  try {
    const {command}=req.body
    const user=await User.findById(req.userId)
    const userName=user.name
    const assistantName=user.assistantName
    const result= await geminiResponse(command,assistantName,userName)
    
    const jsonMatch=result.match(/{[\s\S]*}/)
    if(!jsonMatch){
      return response.status(400).json({response:"sorry i can't understand"})
    }
    const gemResult=JSON.parse(jsonMatch[0])
    const type=gemResult.type

    switch(type){
      case "get_date" :
        return res.json({
          type,
          userInput:gemResult.userInput,
          response:`current date is ${moment().format("YYYY-MM-DD")}`
        });
        case "get_time" :
        return res.json({
          type,
          userInput:gemResult.userInput,
          response:`current time is ${moment().format("hh:mm A")}`
        });
        case "get_day" :
        return res.json({
          type,
          userInput:gemResult.userInput,
          response:`today is ${moment().format("dddd")}`
        });
        case "get_month" :
        return res.json({
          type,
          userInput:gemResult.userInput,
          response:`Current month is ${moment().format("MMMM")}`
        });
        case "youtube_search":
        case "youtube_play":
        case "general":
        case "calculator_open":
        case "instagram_open":
        case "facebook_open":
        case "weather-show":
          return res.json({
            type,
            userInput: gemResult.userInput,
            response:gemResult.response
          });
        default:
          return res.status(400).json({
            response: "I did n't understand that command."
          })


    }

  } catch (error) {
    return res.status(500).json(error,{
       response: "ask assistant error"})

  }

}