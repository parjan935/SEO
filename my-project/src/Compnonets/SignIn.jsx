import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const notifyLogin = (e) => toast.success(e);
  
  const getUser = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("No token found");
      }

      const response =  await fetch("http://localhost:3000/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`); 
      }
      
      const data = await response.json();
      console.log(data.user)
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
        userName,
        password,
    };

    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(response)
        const result = await response.json();
        console.log(result)
        if (response.ok) {
          notifyLogin("Login Successfull!");
          localStorage.setItem('Token', result.token);
          getUser();
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
            alert(result.error);
        }
    }
    catch(err){
      console.log(err)
    }

  }

  const navigate = useNavigate();
  const signup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <Navbar option="signin" />
      <div className="flex bg-darkNavy h-screen pt-20 items-center justify-center flex-grow">
        <div className="w-[500px] bg-navy2 p-8 text-white">
          <form
            className="flex flex-col shadow-slate-800 shadow-[0px_0px_240px_rgba(1,1,1,100)] bg-navy2 p-4 rounded-2xl space-y-5 py-8 px-8 md:-mt-20"
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
      <ToastContainer  position="top-center" autoClose={1000} limit={3} />
    </div>
  );
}

export default SignIn;
