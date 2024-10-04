import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      {/* Spinner container */}
      <div className="relative">
        {/* Outer Circle */}
        <div className="absolute -top-32 -left-6 w-20 h-20 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
        {/* Inner Circle */}
        <div className="absolute -top-32 -left-7 w-20 h-20 border-4 border-blue-300 border-solid rounded-full border-t-transparent animate-ping"></div>
        {/* Pulse Effect */}
        <div className="absolute -top-[7.3rem] -left-3 w-14 h-14 bg-blue-400 rounded-full opacity-75 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
