import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-white"></div>
    </div>
  );
};

export default Spinner;
