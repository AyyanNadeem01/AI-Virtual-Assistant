import React, { useContext, useState } from 'react'
import { UserDataContext } from '../context/userContext'
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from "react-router-dom";
import axios from "axios"
const Customize2 = () => {
    // Inside customize2.jsx
    const navigate=useNavigate()
const {
  setUserData,
  userData,
  backendImage,
  selectedImage, // This should now hold the image URL
  serverUrl
} = useContext(UserDataContext);
const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
const [loading, setLoading]=useState(false)
const handleUpdateAssistant = async () => {
  try {setLoading(true)
    const formData = new FormData();
    formData.append("assistantName", assistantName);

    // Check if a file was uploaded
    if (backendImage) {
      formData.append("assistantImage", backendImage);
    } else if (selectedImage) {
      // If a pre-selected image was chosen, send its URL.
      // The backend will need to handle this URL.
      formData.append("imageUrl", selectedImage); 
    }

    const result = await axios.put(`${serverUrl}/api/user/update`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data" // Crucial for sending FormData
      }
    });

    console.log(result.data);
    setUserData(result.data);
    setLoading(false)
      navigate("/");
  } catch (error) {
    console.log(error);
  }
};
    return (
    <div className='relative flex flex-col justify-center items-center w-full min-h-screen bg-gradient-to-t from-[black] to-[#0404adf4] py-10'>
<IoArrowBack onClick={()=> navigate("/customize")} className='cursor-pointer absolute top-[30px] left-[30px] text-white w-[25px] h-[25px]'/>
      <h1
      className='mb-[30px] gap-[20px] p-[20px] text-white text-[30px] text-center'
      >Enter your <span
      className='text-blue-400'
      >Assistant Name</span></h1>

         {/* Name Input */}
        <input value={assistantName} onChange={(e)=> setAssistantName(e.target.value)}
          type="text"
          className="max-w-[600px] w-full h-[60px] outline-none border-2 border-white
          bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]
          transition-all duration-300 ease-in-out
          focus:border-blue-400 focus:shadow-[0_0_10px_rgba(96,165,250,0.7)]
          hover:border-blue-300"
          placeholder="eg. Sifrah "
          required />

        {assistantName && (   
            <button onClick={
                handleUpdateAssistant
                
            }
            type="submit" className="h-[50px] w-[300px] mt-[30px] text-black font-semibold text-[19px] min-w-[150px] h-[60px]  
          bg-white rounded-full transition-all duration-300 ease-in-out
          hover:bg-blue-400 hover:text-white hover:shadow-lg hover:shadow-blue-400/50
          active:scale-95"
      >
        {loading?"Loading...":"Finally Create your Assistant"}
      </button>)}

    </div>
  )
}

export default Customize2
