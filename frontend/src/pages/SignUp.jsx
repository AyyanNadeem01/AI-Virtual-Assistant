import React, { useState } from 'react';
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserDataContext } from '../context/userContext';
import axios from "axios"
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {serverUrl, userData, setUserData}=useContext(UserDataContext)
  const navigate = useNavigate();
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")
  const handleSignUp=async(e)=>{
    e.preventDefault()
    setError("")
    try{setLoading(true)
        let result=await axios.post(`${serverUrl}/api/auth/signup`,{
            name,email,password
        },{withCredentials:true})
        setUserData(result.data)
        setLoading(false)
        navigate("/customize")
    }catch(error){
            console.log(error)
            setUserData(null)
            setError(error.response.data.message)
            setLoading(false)
    }
  }
  return (
    <div
      className="w-full bg-cover h-[100vh] flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form onSubmit={handleSignUp}
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000081] 
        backdrop-blur shadow-lg shadow-black flex flex-col items-center 
        justify-center gap-[20px] px-[20px]"
      >
        <h1 className="mb-30px text-white text-[30px] font-semibold">
          Register to{" "}
          <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {/* Name Input */}
        <input
          type="text"
          className="w-full h-[60px] outline-none border-2 border-white
          bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]
          transition-all duration-300 ease-in-out
          focus:border-blue-400 focus:shadow-[0_0_10px_rgba(96,165,250,0.7)]
          hover:border-blue-300"
          placeholder="Enter your Name here"
          required onChange={(e)=>setName(e.target.value)}
          value={name}
        />

        {/* Email Input */}
        <input
          type="email"
          className="w-full h-[60px] outline-none border-2 border-white
          bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]
          transition-all duration-300 ease-in-out
          focus:border-blue-400 focus:shadow-[0_0_10px_rgba(96,165,250,0.7)]
          hover:border-blue-300"
          placeholder="Email"
          required onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />

        {/* Password Input with Eye Icon */}
        <div
          className="relative w-full h-[60px] border-2 border-white
          bg-transparent text-white rounded-full text-[18px]
          transition-all duration-300 ease-in-out
          focus-within:border-blue-400 focus-within:shadow-[0_0_10px_rgba(96,165,250,0.7)]
          hover:border-blue-300"
        >
          <input
            type={showPassword ? "text" : "password"}
            className="w-full h-full outline-none rounded-full bg-transparent
            placeholder-gray-300 px-[20px] py-[10px]"
            placeholder="Password"
          required onChange={(e)=>setPassword(e.target.value)}
          value={password}
          />
          {!showPassword && (
            <IoEye
              onClick={() => setShowPassword(true)}
              className="cursor-pointer w-[25px] h-[25px] absolute top-[18px] right-[20px] text-white hover:text-blue-400 transition"
            />
          )}
          {showPassword && (
            <IoEyeOff
              onClick={() => setShowPassword(false)}
              className="cursor-pointer w-[25px] h-[25px] absolute top-[18px] right-[20px] text-white hover:text-blue-400 transition"
            />
          )}
        </div>

        {error.length>0 && (
            <p className='text-[17px] text-red-500'>*{error}</p>
        )}
        {/* SignUp Button */}
        <button disabled={loading}
          className="mt-[30px] text-black font-semibold text-[19px] min-w-[150px] h-[60px]  
          bg-white rounded-full transition-all duration-300 ease-in-out
          hover:bg-blue-400 hover:text-white hover:shadow-lg hover:shadow-blue-400/50
          active:scale-95"
        >
           {loading?"Loading":"SignUp"}
        
        </button>

        {/* SignIn Link */}
        <p
          onClick={() => navigate("/signin")}
          className="text-white cursor-pointer transition duration-300 hover:text-blue-400"
        >
          Already have an account ?{" "}
          <span className="text-blue-400 font-extrabold hover:underline">
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
