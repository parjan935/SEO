import React, { useState } from "react";
import user from "../assets/user.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex bg-gray-300 h-screen">
      <div className="flex flex-col h-screen w-[400px] bg-gray-300">
        <Link to="/">
          <button className="m-5 p-4 py-2 hover:bg-gray-400 rounded-2xl">
            {`<`} Back
          </button>
        </Link>
        <div className="bg-white w-fit rounded-full mx-auto">
          <img src={user} alt="User" className="h-64 rounded-full" />
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl mx-auto mt-10 w-fit">Name</h1>
          <h1 className="text-2xl mx-auto mt-3 w-fit">Plan: Premium</h1>
        </div>
        <Link to="/">
          <div className=" text-white bg-blue-500 rounded-lg px-4 py-1 pb-2 w-fit text-2xl mx-auto my-10 hover:bg-blue-600 ">
            <i className="fa-solid fa-arrow-right-from-bracket rotate-180"></i>{" "}
            Sign out
          </div>
        </Link>
      </div>
      <div className="flex h-screen flex-grow bg-gray-500 rounded-l-3xl items-center justify-center">
        <form action="" className="w-3/4 h-full">
          <h1 className="text-5xl font-medium w-fit mx-auto my-10 mt-20">Change Password</h1>
          
          {/* Old Password */}
          <h1 className="text-xl font-medium mb-2">Old Password :</h1>
          <div className="flex w-full mb-10">
            <input
              type={showOldPassword ? "text" : "password"}
              className="flex-grow p-2 rounded-l-lg"
              placeholder="Old Password"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowOldPassword((prev) => !prev);
              }}
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
            >
              {showOldPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* New Password */}
          <h1 className="text-xl font-medium mb-2">New Password :</h1>
          <div className="flex w-full mb-10">
            <input
              type={showNewPassword ? "text" : "password"}
              className="flex-grow p-2 rounded-l-lg"
              placeholder="New Password"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowNewPassword((prev) => !prev);
              }}
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
            >
              {showNewPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Confirm New Password */}
          <h1 className="text-xl font-medium mb-2">Confirm New Password :</h1>
          <div className="flex w-full mb-10">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="flex-grow p-2 rounded-l-lg"
              placeholder="Confirm New Password"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowConfirmPassword((prev) => !prev);
              }}
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
