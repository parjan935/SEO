import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/LOGO.jpg";
import SignIn from "./SignIn";

const Navbar = ({ option }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [menu, setmenu] = useState(false);

  const openMenu = () => {
    setmenu(!menu);
  };

  return (
    <>
      <nav
        className="bg-darkNavy fixed top-0 left-0 right-0 flex py-3 flex-row justify-between 
      items-center z-10 shadow-[0px_4px_10px_rgba(0,0,0,0.5)]"
      >
        <div className="flex space-x-5 md:space-x-0 items-center pl-4">
          <div className="text-white md:hidden ">
            <i
              onClick={openMenu}
              className="fa-solid fa-bars fa-2x cursor-pointer"
            ></i>
          </div>
          <div className="flex flex-row items-center ">
            <img
              src={logo}
              alt="logo"
              className="h-[50px] w-auto pt-2 rounded-xl"
            />
            <div className="pl-2 text-3xl font-bold text-white flex flex-col">
              SEO
              <span className=" text-sm font-light">optimizer</span>
            </div>
          </div>
          <ul className="hidden md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white text-xl font-medium ml-10 hover:text-gray-400  border-b-2 border-white"
                  : "text-white text-xl font-medium ml-10 hover:text-gray-400 border-b-2 border-b-navy2  "
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                isActive
                  ? "text-white text-xl font-medium ml-10 hover:text-gray-400  border-b-2 border-white"
                  : "text-white text-xl font-medium ml-10 hover:text-gray-400 border-b-2 border-b-navy2 "
              }
            >
              Features
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                isActive
                  ? "text-white text-xl font-medium ml-10 hover:text-gray-400  border-b-2 border-white"
                  : "text-white text-xl font-medium ml-10 hover:text-gray-400 border-b-2 border-b-navy2 "
              }
            >
              Pricing
            </NavLink>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                isActive
                  ? "text-white text-xl font-medium ml-10 hover:text-gray-400  border-b-2 border-white"
                  : "text-white text-xl font-medium ml-10 hover:text-gray-400 border-b-2 border-b-navy2"
              }
            >
              FAQ
            </NavLink>
          </ul>
        </div>
        {localStorage.getItem("Token") != null ? (
          <Link to="/profile">
            <i className="fa-solid fa-user fa-2xl bg-white p-5 px-2 rounded-full hover:bg-gray-300 mr-5"></i>
          </Link>
        ) : (
          <Link to={option == "signin" ? "/signup" : "/signin"}>
            <div
              className=" text-white bg-blue-800 rounded-lg px-4 py-1 pb-2 font-medium 
          text-2xl mx-7 hover:bg-blue-500"
            >
              {option == "signin" ? "Sign up" : "Sign in"}
            </div>
          </Link>
        )}
      </nav>
      {/* menu */}
      <div
        className={` ${menu ? "mt-20" : "mt-0"} ${
          menu ? `max-h-[1000px]` : `max-h-0`
        } ${
          menu || option == "signin" || option == "signup" ? "mt-0" : "mt-20"
        }  overflow-hidden bg-gray-500  duration-1000 ease-in-out`}
      >
        <Link to="/">
          <div className="text-white text-xl font-medium pl-10 py-1 hover:bg-gray-400 ">
            Home
          </div>
        </Link>
        <Link to="/features">
          <div className="text-white text-xl font-medium pl-10 py-1 hover:bg-gray-400 ">
            Features
          </div>
        </Link>
        <Link to="/price">
          <div className="text-white text-xl font-medium pl-10 py-1 hover:bg-gray-400  ">
            Pricing
          </div>
        </Link>
        <Link to="/faq">
          <div className="text-white font-medium text-xl pl-10 py-1 hover:bg-gray-400  ">
            FAQ
          </div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
