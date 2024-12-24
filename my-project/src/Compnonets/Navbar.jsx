import React, { createContext, useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/LOGO.jpg";
import SignIn from "./SignIn";
import Profile from "./Profile";
import Modal from "react-modal";

const Navbar = ({ option, login }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [menu, setmenu] = useState(false);

  const token = localStorage.getItem("Token");
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUserDetails(result.user);
          // console.log(result);
        } else {
          const result = await response.json();
          alert(result.error || "Failed to fetch user details");
        }
      } catch (err) {
        console.log("Error fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openMenu = () => {
    setmenu(!menu);
  };

  return (
    <>
      <nav className="bg-darkNavy fixed top-0 left-0 right-0 flex flex-col pt-3 z-10 shadow-[0px_4px_10px_rgba(0,0,0,0.5)]">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex space-x-2 md:space-x-0 items-center pl-4">
            <div className="text-white md:hidden ">
              <i
                onClick={openMenu}
                className={`fa-solid fa-bars fa-xl sm:fa-2xl fa-2x cursor-pointer ${
                  menu ? "rotate-90" : ""
                } duration-1000  `}
              ></i>
            </div>
            <div className="flex flex-row items-center ">
              <img
                src={logo}
                alt="logo"
                className={`h-[45px] md:h-[50px] w-auto pt-2 rounded-xl`}
              />
              <div className="pl-2 text-xl md:text-2xl font-bold text-white flex flex-col">
                SEO
                <span className=" text-xs md:text-sm font-light">
                  optimizer
                </span>
              </div>
            </div>
            <ul className="hidden md:flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white text-lg font-medium ml-10 hover:text-gray-400"
                    : "text-gray-300 text-lg ml-10 hover:text-white "
                }
              >
                <i class="fa-solid fa-house mr-2 text-gray-400"></i>
                Home
              </NavLink>
              <NavLink
                to="/features"
                className={({ isActive }) =>
                  isActive
                    ? "text-white text-lg font-medium ml-10 hover:text-gray-400 "
                    : "text-gray-300 text-lg  ml-10 hover:text-white "
                }
              >
                <i class="fa-solid fa-bolt mr-2 text-gray-400"></i>
                Features
              </NavLink>
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  isActive
                    ? "text-white text-lg font-medium ml-10 hover:text-gray-400"
                    : "text-gray-300 text-lg  ml-10 hover:text-white"
                }
              >
                {/* <i class="fa-solid fa-bolt mr-2 text-gray-400"></i> */}
                <i class="fa-solid fa-dollar-sign mr-2 text-gray-400"></i>
                Pricing
              </NavLink>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  isActive
                    ? "text-white text-lg font-medium ml-10 hover:text-gray-400 "
                    : "text-gray-300 text-lg  ml-10 hover:text-white "
                }
              >
                <i class="fa-solid fa-question mr-2 text-gray-400"></i>
                FAQ
              </NavLink>
            </ul>
          </div>
          {localStorage.getItem("Token") != null ? (
            <div>
              <i
                onClick={openModal}
                className="fa-solid fa-user fa-2xl bg-white  p-4 px-2 cursor-pointer rounded-full hover:bg-gray-300 mr-5"
              ></i>
              <Profile
                isOpen={isModalOpen}
                onClose={closeModal}
                userDetails={userDetails}
              />
            </div>
          ) : (
            <Link to={option == "signin" ? "/signup" : "/signin"}>
              <div
                className=" text-white bg-blue-800 rounded-lg px-4 py-1 pb-2 font-medium 
              text-xl md:text-2xl mx-7 hover:bg-blue-500"
              >
                {option == "signin" ? "Sign up" : "Sign in"}
              </div>
            </Link>
          )}
        </div>
        {/* menu */}
        <div
          className={`flex justify-evenly mt-3 ${
            menu ? `max-h-[1000px]` : `max-h-0`
          }
        }  overflow-hidden bg-gray-400  duration-1000 ease-in-out`}
        >
          <Link to="/">
            <div className="text-white text-xl font-medium py-1.5 hover:text-black duration-300 ease-in-out ">
              Home
            </div>
          </Link>
          <Link to="/features">
            <div className="text-white text-xl font-medium py-1.5 hover:text-black duration-300 ease-in-out ">
              Features
            </div>
          </Link>
          <Link to="/pricing">
            <div className="text-white text-xl font-medium  py-1.5 hover:text-black duration-300 ease-in-out ">
              Pricing
            </div>
          </Link>
          <Link to="/faq">
            <div className="text-white font-medium text-xl  py-1.5 hover:text-black duration-300 ease-in-out ">
              FAQ
            </div>
          </Link>
        </div>
      </nav>
      {/* </nav> */}
    </>
  );
};

export default Navbar;
