import React, { useState } from 'react';

function QandA({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" text-white border border-b-1 border-t-0 border-l-0 border-r-0  rounded-md my-1 p-3  w-full max-w-xl items-centre ">
      {/* Question */}
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleDropdown}>
        <h3 className="text-lg font-semibold ">{question}</h3>
        <span className="text-lg">{isOpen ? '▲' : '▼'}</span>
      </div>
      {/* Answer */}
      {isOpen && (
        <div className=" p-2 mt-2 text-gray-500 whitespace-normal">
          {answer}
        </div>
      )}
    </div>
  );
}

export default QandA;
