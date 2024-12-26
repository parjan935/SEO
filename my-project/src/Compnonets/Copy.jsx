import React, { useState, useEffect } from "react";

const Copy = ({ text }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyText = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      },
      () => alert("Failed to copy text!")
    );
  };

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );

    return () => tooltipList.forEach((tooltip) => tooltip.dispose());
  }, [copySuccess]);

  return (
    <div className="flex ml-4 py-0 bg-gray-400 rounded-lg max-w-md space-x-5">
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={copySuccess ? "Text copied!" : "Copy text!"}
        onClick={handleCopyText}
      >
        <i
          className={`fa-solid ${
            copySuccess ? "fa-circle-check" : "fa-clipboard"
          } fa-lg text-black hover:text-white px-0 py-2`}
        ></i>
      </button>
    </div>
  );
};

export default Copy;
