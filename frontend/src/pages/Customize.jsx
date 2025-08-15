import React, { useState, useRef, useContext } from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import authBg from "../assets/authBg.png"
import { RiImageAddLine } from "react-icons/ri"
import { UserDataContext } from '../context/userContext'
import {useNavigate} from "react-router-dom"
const Customize = () => {
  const { serverUrl,userData,setUserData,frontendImage,
        setFrontendImage,backendImage,setBackendImage,
        selectedImage,setSelectedImage}=useContext(UserDataContext)
  const navigate=useNavigate()
  const inputImage = useRef()
  
  const handleImage = (e) => {
    const file = e.target.files[0] // ✅ Correct property
    if (file) {
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
    }
  }

  return (
    <div className='flex flex-col justify-center items-center w-full min-h-screen bg-gradient-to-t from-[black] to-[#0404adf4] py-10'>
      <h1 className='mb-[30px] gap-[20px] p-[20px] text-white text-[30px] text-center'>
        Select your <span className='text-blue-400'>Assistant Image</span>
      </h1>

      <div className='w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-[20px]'>
  <Card image={image1} id="img1" />
<Card image={authBg} id="authBg" />
<Card image={image2} id="img2" />
<Card image={image7} id="img7" />
<Card image={image4} id="img4" />
<Card image={image5} id="img5" />
<Card image={image6} id="img6" />

{/* Upload box */}
<div
  onClick={() => {
    inputImage.current.click();
    setSelectedImage("input");
  }}
  className={`
    cursor-pointer w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#131359e3] border-2
    border-[#3a3aff] rounded-2xl overflow-hidden
    hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] flex items-center justify-center hover:border-white transition-shadow duration-300
    ${selectedImage === "input" ? "border-white border-4 shadow-[0_0_20px_rgba(59,130,246,0.8)]" : ""}
  `}
>
  {!frontendImage && <RiImageAddLine className="text-white w-[25px] h-[25px]" />}
  {frontendImage && (
    <img src={frontendImage} alt="Uploaded preview" className='w-full h-full object-cover' />
  )}
</div>



        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          hidden
          ref={inputImage}
          onChange={handleImage} 
        />
      </div>
          {selectedImage && (     
            <button onClick={()=> navigate("/customize2")}
            type="submit" className="mt-[30px] text-black font-semibold text-[19px] min-w-[150px] h-[60px]  
          bg-white rounded-full transition-all duration-300 ease-in-out
          hover:bg-blue-400 hover:text-white hover:shadow-lg hover:shadow-blue-400/50
          active:scale-95"
      >
        Next
      </button>)}
 
    </div>
  )
}

export default Customize
