import React, { useState } from "react";

const Copy = ({ text }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const textToCopy = text;

  const handleCopyText = () => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopySuccess(true);
        // Reset after 10 seconds to allow multiple copies
        setTimeout(() => setCopySuccess(false), 3000);
      },
      () => alert("Failed to copy text!")
    );
  };

  return (
    <div className="flex pl-4 bg-gray-100 rounded-lg max-w-md space-x-5">
      <div className="relative group">
        <button
          onClick={handleCopyText}
          className="bg-white hover:bg-black active:bg-gray-500 text-white font-bold rounded"
        >
          <i
            className={`fa-solid ${
              copySuccess ? "fa-circle-check" : "fa-clone"
            } fa-xs text-black hover:text-white px-2 py-5 `}
          ></i>
        </button>

        <div className="absolute w-fit left-1/4 transform -translate-x-1/3 mt-0 p-2 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
          {copySuccess ? "Text copied!" : "Copy text !"}
        </div>
      </div>
    </div>
  );
};

export default Copy;
