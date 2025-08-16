import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
// inside UserDataContext or a helper file
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import authBg from "../assets/authBg.png"

export const frontendImagesMap = {
  img1: image1,
  img2: image2,
  img4: image4,
  img5: image5,
  img6: image6,
  img7: image7,
  authBg: authBg
};

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:8000";
  
  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch current user on mount
  useEffect(() => {
    const handleCurrentUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        setUserData(result.data);
        console.log("Current user:", result.data);
      } catch (error) {
        if (error.response?.status === 401) {
          // User not logged in
          setUserData(null);
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    handleCurrentUser();
  }, []);

  const getGeminiResponse=async(command)=>{
      try {
        const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,
          {command},{withCredentials:true}
        )
        return result.data
      } catch (error) {
        console.log(error)
      }
  } 

  const value = {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    isLoading,
    getGeminiResponse
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
