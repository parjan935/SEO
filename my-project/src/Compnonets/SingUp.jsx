import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {saveTokenToLocalStorage} from '../utils/TokenUtils'
import Spinner from "./Spinner";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [optsent, setotpsent] = useState(false);

  const [inProcess,setInProcess]=useState(false)

  const notifyLogin = (e) => toast.success(e);

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

  const getUser = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:3000/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.user);
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  const handleSubmit = async (e) => {
    setInProcess(true)
    e.preventDefault();

    const data = {
      userName,
      email,
      password,
      role: "user",
      subscription: "Base",
    };

    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        notifyLogin("Registration Successfull!");
        // localStorage.setItem("Token", result.token);
        saveTokenToLocalStorage('Token',result.token); 
        // getUser();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(result.error);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    } catch (err) {
      setMessage("Error connecting to the server");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      console.log("Error connecting to the server");
      console.log(err);
    }
    setInProcess(false)
  };

  const signin = () => {
    navigate("/signin");
  };

  const validateOTP = async (e) => {
    e.preventDefault();
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
          body: { name: userName, otp: otp.join(""), use: "Registration" },
        }
      );
      console.log("OTP verified");
      toast.success(response.data.message);
      seterror("");
      setEmail("");
      setPassword("");
      setUserName("");
      setotpsent(false)
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col max-h-screen">
      <Navbar option="signup" />
      <div className="bg-darkNavy pt-20 md:pt-40 flex items-center justify-center h-screen ">
        {/* registratiom */}
        {/* {optsent ? (
          <form
            className="w-[450px] text-white flex flex-col shadow-slate-800 shadow-[0px_0px_240px_rgba(1,1,1,100)] bg-navy2 p-4 rounded-2xl space-y-5 py-8 px-8 md:-mt-20"
            onSubmit={validateOTP}
          >
            <h1 className="text-2xl font-semibold mb-6">Enter OTP</h1>
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
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors "
            >
              Verift OTP
            </button>
          </form>
        ) : (
        )} */}
          <form
            className="w-[380px] md:w-[450px] text-white flex flex-col shadow-slate-800 shadow-[0px_0px_240px_rgba(1,1,1,100)] bg-navy2 rounded-2xl space-y-5 py-8 px-8 md:-mt-20"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl md:text-5xl text-white  font-bold text-center">
              Register
            </h1>
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-1xl font-medium">
                Email:
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="p-2 border border-gray-300 rounded-md text-black"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-1xl font-medium">
                Username:
              </label>
              <input
                type="text"
                id="name"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                className="p-2 border border-gray-300 rounded-md text-black"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="password"
                className="text-1xl font-medium outline-none active:outline-gray-950"
              >
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="p-2 border border-gray-300 rounded-md outline-none text-black"
                required
              />
            </div>

            <p className="text-red-500 text-center m-0 mt-3 text-sm">{message}</p>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors "
            >
              Register
            </button>
            <div className="w-full text-center">
              Have an account ?{" "}
              <a onClick={signin} className="cursor-pointer">
                {inProcess?<Spinner/>:"Sign in"}
              </a>
            </div>
          </form>
        
      </div>
      <ToastContainer position="top-center" autoClose={1000} limit={3} />
    </div>
  );
}

export default SignIn;
