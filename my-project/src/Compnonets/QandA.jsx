import React, { useState, useRef, useEffect } from 'react';

function QandA({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className=" text-white border border-b-1 border-t-0 border-l-0 border-r-0  rounded-md my-1 p-3  w-5/6 max-w-3xl items-centre ">

      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <h3 className="sm:text-lg text-md font-semibold ">{question}</h3>
        {/* <span className="text-lg duration-300">{isOpen ? "▲" : "▼"}</span> */}
        <i class={`fa-solid fa-caret-down ${isOpen?"rotate-180":""} `}></i>
      </div>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${height}px` : '0',
        }}z
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
      >
        <div className="p-2 mt-2 text-gray-500 whitespace-normal">
          {answer}
        </div>
      </div>

    </div>
  );
}

export default QandA;
