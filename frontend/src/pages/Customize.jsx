import React from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import authBg from "../assets/authBg.png"
import { RiImageAddLine } from "react-icons/ri"

const Customize = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full min-h-screen bg-gradient-to-t from-[black] to-[#0404adf4] py-10'>
     <h1 className='mb-[30px] gap-[20px] p-[20px] text-white text-[30px] text-center'>Select your 
      <span className='text-blue-400'> Assistant Image</span></h1>
      <div className='w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-[20px]'>
        <Card image={image1} />
        <Card image={authBg} />
        <Card image={image2} />
        <Card image={image7} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <div className="cursor-pointer w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#131359e3] border-2
          border-[#3a3aff] rounded-2xl overflow-hidden
          hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] flex items-center justify-center hover:border-white transition-shadow duration-300">
          <RiImageAddLine className="text-white w-[25px] h-[25px]" />
        </div>
      </div>
      <button className="mt-[30px] text-black font-semibold text-[19px] min-w-[150px] h-[60px]  
          bg-white rounded-full transition-all duration-300 ease-in-out
          hover:bg-blue-400 hover:text-white hover:shadow-lg hover:shadow-blue-400/50
          active:scale-95"
        >
          Next
        </button>
      
    </div>
  )
}

export default Customize
