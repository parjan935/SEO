// LoadingDots.js
import React from 'react';

const LoadingDots = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-2 h-2 bg-white rounded-full animate-bounce mt-3"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce200 mt-3"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce400 mt-3"></div>
    </div>
  );
};

export default LoadingDots;
