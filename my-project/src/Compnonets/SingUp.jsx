import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { userName, password, email });
    setUserName("");
    setPassword("");
    setEmail("");
  };

  const navigate = useNavigate();
  const signin = () => {
    navigate("/signin");
  };

  return (
    <div>
      <Navbar option="signup"/>
      <div className="bg-darkNavy h-screen pt-24 pb-0 flex items-center justify-center">
        <div className="w-[500px] bg-navy2 shadow-5xl p-8 text-white ">
          <form
            className="flex flex-col  shadow-slate-800 shadow-[0px_0px_240px_rgba(1,1,1,100)] bg-navy2 p-4 rounded-2xl space-y-5 py-8 px-8"
            onSubmit={handleSubmit} >
            <div className="text-5xl text-white font-bold text-center">
              Register
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-1xl font-medium">
                Username:
              </label>
              <input
                type="text"
                id="name"
                value={userName}
                onChange={(e)=>{setUserName(e.target.value)}}
                className="p-2 border border-gray-300 rounded-md text-black"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-1xl font-medium">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                className="p-2 border border-gray-300 rounded-md text-black"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-1xl font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                className="p-2 border border-gray-300 rounded-md text-black"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors"
            >
              Register
            </button>
            <div className="w-full text-center">
              Have Account ?{" "}
              <a onClick={signin} className="cursor-pointer">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default SignIn;
