// import React, { useContext } from 'react';
// import { UserDataContext } from "../context/userContext";
// import {useNavigate} from "react-router-dom"
// import axios from "axios"

// const Home = () => {
//   const { userData, serverUrl,setUserData } = useContext(UserDataContext);
//   const navigate=useNavigate()
//   const handleLogout=async ()=>{
//    try {
//      const response=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
//     console.log(response)
//     setUserData(null)
//     navigate("/signin")
  
//    } catch (error) {
//       console.log(error)  
//    }
//   }
//   return (
//     <div
//       className="flex flex-col justify-center items-center w-full min-h-screen 
//       bg-gradient-to-t from-black to-[#02026df4] gap-[15px]"
//     >
//               <button onClick={()=>{handleLogout()}}
//           className="mt-[30px] text-black font-semibold text-[19px] min-w-[150px] h-[60px]  
//           bg-white rounded-full transition-all duration-300 ease-in-out
//           hover:bg-blue-400 absolute top-[20px] right-[20px] hover:text-white hover:shadow-lg hover:shadow-blue-400/50
//           active:scale-95"
//         >
//          Logout
//         </button>
//         <button onClick={()=>navigate("/customize")}
//           className="mt-[30px] text-black font-semibold text-[19px] min-w-[200px] h-[60px]  
//           bg-white rounded-full transition-all duration-300 ease-in-out
//           hover:bg-blue-400 absolute top-[100px] right-[20px] hover:text-white hover:shadow-lg hover:shadow-blue-400/50
//           px-[20px] py-[10px] active:scale-95"
//         >
//         Customize your Assistant
//         </button>

//       {/* Rounded container */}
//       <div className="shadow-lg w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-3xl">
//         <img
//           src={userData?.assistantImage}
//           alt="assistant"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <h1 className="text-[18px] text-white">I'm {userData?.assistantName}</h1>
//     </div>
//   );
// };

// export default Home;
import React, { useContext } from 'react';
import { UserDataContext, frontendImagesMap } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { userData, serverUrl, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      console.log(response);
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full min-h-screen 
      bg-gradient-to-t from-black to-[#02026df4] gap-[15px] relative"
    >
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-[30px] text-black font-semibold text-[19px] min-w-[150px] h-[60px]  
        bg-white rounded-full transition-all duration-300 ease-in-out
        hover:bg-blue-400 absolute top-[20px] right-[20px] hover:text-white hover:shadow-lg hover:shadow-blue-400/50
        active:scale-95"
      >
        Logout
      </button>

      {/* Customize Button */}
      <button
        onClick={() => navigate("/customize")}
        className="mt-[30px] text-black font-semibold text-[19px] min-w-[200px] h-[60px]  
        bg-white rounded-full transition-all duration-300 ease-in-out
        hover:bg-blue-400 absolute top-[100px] right-[20px] hover:text-white hover:shadow-lg hover:shadow-blue-400/50
        px-[20px] py-[10px] active:scale-95"
      >
        Customize your Assistant
      </button>

      {/* Rounded container for Assistant Image */}
      <div className="shadow-lg w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-3xl">
        <img
          src={
            userData?.assistantImage
              ? frontendImagesMap[userData.assistantImage] || userData.assistantImage
              : ""
          }
          alt="assistant"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Assistant Name */}
      <h1 className="text-[18px] text-white">
        I'm {userData?.assistantName || "Your Assistant"}
      </h1>
    </div>
  );
};

export default Home;
