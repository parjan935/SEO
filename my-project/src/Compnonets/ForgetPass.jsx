import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPass = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const [inProcess,setInProcess]=useState(false)

  const [optsent, setotpsent] = useState(false);
  const [optVerified, setotpVerified] = useState(false);

  const [userName, setUserName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");

  const [error, seterror] = useState("");

  const [showpass, setshowPass] = useState(false);
  const [confirmshowpass, setconfirmshowPass] = useState(false);

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

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

  const sendOTP = async (e) => {
    e.preventDefault();
    setInProcess(true)
    if (userName === "") {
      seterror("Please enter username.");
      setTimeout(() => {
        seterror("");
      }, 2000);
      return;
    }
    try {
      console.log("try");
      const response = await axios.post(
        "http://localhost:3000/user/request-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: { name: userName },
        }
      );
      console.log("OTP sent");
      toast.success(response.data.message);
      seterror("");
      setotpsent(true);
    } catch (error) {
      setMessage(error);
    }
    setInProcess(false)
  };

  const validateOTP = async (e) => {
    e.preventDefault();
    setInProcess(true)
    if (otp.join("") === "") {
      seterror("Please Enter OTP");
      setTimeout(() => {
        seterror("");
      }, 2000);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/user/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: { name: userName, otp: otp.join("") ,use:"Password reset"},
        }
      );
      console.log("OTP verified");
      toast.success(response.data.message);
      setotpVerified(true);
      seterror("");
    } catch (error) {
      setMessage(error.response.data.message);
    }
    setInProcess(false)
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setInProcess(true)
    if (password === "" || confirmpassword === "") {
      seterror("Please enter and confirm password");
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:3000/user/resetPass",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: { name: userName, newPassword:password, confirmNewPassword:confirmpassword},
        }
      );
      console.log("password reset successfull");
      setUserName("")
      setOtp("")
      setPassword("")
      setconfirmPassword("")
      seterror("");
      setotpsent(false)
      setotpVerified(false)
      toast.success(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
    setInProcess(false)
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center duration-300 ${
        isOpen ? "opacity-100" : "opacity-1100"
      }`}
    >
      <div className="bg-gray-300 p-10 pt-5 text-black rounded-xl shadow-slate-800 shadow-[0px_0px_240px_rgba(1,1,1,100)]">
        <div className="text-end">
          <i
            onClick={handleOverlayClick}
            className={`fa-solid fa-xmark w-fit mb-3 p-1 rounded-sm cursor-pointer hover:rotate-90 duration-300`}
          ></i>
        </div>

        {/* Send OTP */}
        <form
          className={`w-[250px] md:w-[300px] flex flex-col items-center ${optsent ? "hidden" : ""} `}
        >
          <h1 className="text-2xl font-semibold mb-6">Enter Username</h1>
          <input
            className="w-[250px] md:w-[300px] p-3 mb-3 border rounded-md border-gray-300 focus:ring-blue-500"
            type="text"
            name="name"
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            required
          />
          <p className="text-red-400">{error}</p>
          <button
            type="submit"
            onClick={sendOTP}
            disabled={inProcess}
            className="mt-3 px-6 py-2 bg-blue-500 w-[200px] text-white rounded-md hover:bg-blue-600"
          >
            {inProcess?<Spinner/> :"Request OTP"}
          </button>
        </form>

        {/* Validate OTP Form */}
        <form
          className={`flex flex-col items-center ${
            optsent && !optVerified ? "" : "hidden"
          }`}
        >
          <h1 className="text-2xl font-semibold mb-0">Enter OTP </h1>
          <p className="mb-4">sent to your registered email</p>
          <div className="flex gap-2">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                className="w-12 h-12 mb-3 text-center text-xl border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <p className="text-red-400">{error}</p>
          <button
            type="submit"
            onClick={validateOTP}
            disabled={inProcess}
            className="mt-3 px-6 py-2 bg-blue-500 w-[200px] text-white rounded-md hover:bg-blue-600"
          >
            {inProcess?<Spinner/> :"Verify OTP"}
          </button>
        </form>
        <form
          className={`flex flex-col items-center ${
            optVerified ? "" : "hidden"
          }`}
        >
          <h1 className="text-2xl font-semibold mb-6">Reset password</h1>

          <div className="bg-white m-0 p-0 rounded-md mb-3 border-gray-300">
            <input
              type={showpass ? "text" : "password"}
              value={password}
              placeholder="Enter password"
              className="w-[300px] p-3 border-none rounded-md  focus:ring-blue-500 active:border-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              class={`fa-regular ${
                showpass ? "fa-eye" : "fa-eye-slash"
              } text-xl cursor-pointer px-2 py-0`}
              onClick={() => setshowPass(!showpass)}
            ></i>
          </div>
          <div className="bg-white m-0 p-0 rounded-md mb-3 border-gray-300">
            <input
              type={confirmshowpass ? "text" : "password"}
              value={confirmpassword}
              placeholder="confirm password"
              className="w-[300px] p-3 border-none rounded-md  focus:ring-blue-500 active:border-none"
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            <i
              class={`fa-regular ${
                confirmshowpass ? "fa-eye" : "fa-eye-slash"
              } text-xl cursor-pointer px-2 py-0`}
              onClick={() => setconfirmshowPass(!confirmshowpass)}
            ></i>
          </div>
          <p className="text-red-400">{error}</p>
          <button
            onClick={resetPassword}
            disabled={inProcess}
            type="submit"
            className="mt-3 px-6 py-2 bg-blue-500 w-[200px] text-white rounded-md hover:bg-blue-600"
          >
            {inProcess?<Spinner/> :"Save password"}
          </button>
        </form>
      </div>
      <ToastContainer
        className="top-24"
        position="top-center"
        autoClose={1000}
        limit={3}
      />
    </div>
  );
};

export default ForgetPass;
