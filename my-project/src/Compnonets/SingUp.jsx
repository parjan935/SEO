import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [otpStatus, setOtpStatus] = useState("");
  const [otp, setotp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [verification, setVerfication] = useState(false);
  const [checkOtp, setCheckOtp] = useState("");

  const navigate = useNavigate();

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
      // localStorage.setItem("userDetails", JSON.stringify(data.user));
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  const handleSubmit = async (e) => {
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
        setMessage("User registered successfully!");
        localStorage.setItem("Token", result.token);
        getUser();
        alert("User registered successfully!");
        navigate("/");
      } else {
        setMessage(result.error);
        alert(result.error);
      }
    } catch (err) {
      setMessage("Error connecting to the server");
      console.log("Error connecting to the server");
      console.log(err);
    }
    setEmail("");
    setPassword("");
    setUserName("");
  };

  
  const signin = () => {
    navigate("/signin");
  };

  return (
    <div>
      <Navbar option="signup" />
      <div className="bg-darkNavy h-screen flex items-center justify-center ">
        <div className="w-[500px] bg-navy2 shadow-5xl p-8 text-white ">
          {/* registratiom */}

          <form
            className="flex flex-col shadow-slate-800 shadow-[0px_0px_240px_rgba(1,1,1,100)] bg-navy2 p-4 rounded-2xl space-y-5 py-8 px-8 md:-mt-20"
            onSubmit={handleSubmit}
          >
            <h1 className="text-5xl text-white  font-bold text-center">
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

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors "
            >
              Register
            </button>
            <div className="w-full text-center">
              Have an account ?{" "}
              <a onClick={signin} className="cursor-pointer">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;