import React from 'react';

const Card = ({ image }) => {
  return (
    <div
      className="
        w-[70px] h-[140px]   /* mobile size */
        sm:w-[100px] sm:h-[180px]  /* small tablets */
        md:w-[120px] md:h-[200px]  /* medium screens */
        lg:w-[150px] lg:h-[250px]  /* large desktop */
        cursor-pointer bg-[#131359e3] border-2 border-[#3a3aff]
        rounded-2xl overflow-hidden
        hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]
        hover:border-white transition-shadow duration-300
      "
    >
      <img src={image} alt="card" className="w-full h-full object-cover" />
    </div>
  );
};

export default Card;
