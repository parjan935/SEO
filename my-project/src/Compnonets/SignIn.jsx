import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { userName, password });
    setUserName("");
    setPassword("");
  };

  const navigate = useNavigate();
  const signup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <Navbar option="signin"/>
      <div className="bg-darkNavy h-screen pt-56 pb-12 flex items-center justify-center flex-grow">
        <div className="w-[500px] bg-navy2 p-8 text-white">
          <form
            className="flex flex-col  shadow-slate-800 shadow-[0px_0px_240px_rgba(1,1,1,100)] bg-navy2 p-4 rounded-2xl space-y-5 py-8 px-8 md:-mt-20"
            onSubmit={handleSubmit}
          >
            <h1 className="text-5xl text-white  font-bold text-center">
              Sign in
            </h1>
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
              <label
                htmlFor="password"
                className="text-1xl font-medium outline-none active:outline-gray-950"
              >
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                className="p-2 border border-gray-300 rounded-md outline-none text-black"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors "
            >
              Log In
            </button>
            <div className="w-full text-center">
              New here ?{" "}
              <a onClick={signup} className="cursor-pointer">
                Sign up
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
