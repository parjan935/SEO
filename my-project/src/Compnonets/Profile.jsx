import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/TokenUtils";

const Profile = ({ isOpen, onClose, userDetails }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout("Token");
    navigate("/signin"); 
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-navy2  text-gray-300 text-sm top-16 right-10 rounded-lg p-6 pr-20 max-w-fit w-full h-fit relative shadow-lg transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <h2 className="text-xl text-white font-semibold mb-4">Profile Details</h2>
        <p className="mb-2">
          <strong className="text-white">Name:</strong> {userDetails.userName}
        </p>
        <p className="mb-2">
          <strong className="text-white">Email:</strong> {userDetails.email}
        </p>
        <p>
          <strong className="text-white">Subscription:</strong> {userDetails.subscription}
        </p>
        <button className="px-8 py-2 mt-3 bg-xoraTeal  text-black rounded-lg hover:opacity-80" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
