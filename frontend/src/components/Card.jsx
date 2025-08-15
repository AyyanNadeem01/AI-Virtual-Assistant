import React, { useContext } from 'react';
import { UserDataContext } from '../context/userContext';

const Card = ({ image, id }) => {
  const { selectedImage,setFrontendImage,setBackendImage, setSelectedImage } = useContext(UserDataContext);

  return (
    <div
      onClick={() => {setSelectedImage(id)
        setBackendImage(null),
        setFrontendImage(null)
      }}
      className={`
        w-[70px] h-[140px]
        sm:w-[100px] sm:h-[180px]
        md:w-[120px] md:h-[200px]
        lg:w-[150px] lg:h-[250px]
        cursor-pointer bg-[#131359e3] border-2 border-[#3a3aff]
        rounded-2xl overflow-hidden
        hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]
        hover:border-white transition-shadow duration-300
        ${selectedImage === id ? "border-white border-4 shadow-[0_0_20px_rgba(59,130,246,0.8)]" : ""}
      `}
    >
      <img src={image} alt="card" className="w-full h-full object-cover" />
    </div>
  );
};

export default Card;
