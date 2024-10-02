import React from "react";

const Card = ({ children }) => {
  return (
    <div className="h-screen w-screen py-20 flex justify-center bg-gradient-to-br from-[#FFED46] to-[#FF7EC7] overflow-x-hidden">
      <div className="container mx-auto w-2/5 bg-gray-200/80 px-10 py-4 rounded h-fit">
        {children}
      </div>
    </div>
  );
};

export default Card;
