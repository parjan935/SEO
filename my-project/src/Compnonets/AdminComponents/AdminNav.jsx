import { useState } from "react";
import React from "react";
import logo from "../../assets/LOGO.jpg";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

const AdminNav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // e.preventDefault();
    localStorage.removeItem("AdminToken");
    navigate("/signin");
  };

  const [menu, setmenu] = useState(false);

  const openMenu = () => {
    setmenu(!menu);
  };

  return (
    <>
      <nav className="bg-darkNavy fixed top-0 left-0 right-0 flex flex-col justify-between items-center  pt-3 z-10 shadow-[0px_4px_10px_rgba(0,0,0,0.5)]">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex items-center ">
            <div className="text-white md:hidden ml-3">
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
                className={`h-[45px] md:h-[50px] w-auto pt-1 rounded-xl`}
              />
              <div className="pl-2 text-2xl md:text-4xl font-bold text-white flex flex-col">
                SEO
                <span className=" text-xs md:text-lg font-light">
                  optimizer
                </span>
              </div>
            </div>
            <ul className="hidden md:flex">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-white text-xl font-medium ml-10 hover:text-gray-400  border-b-2 border-white"
                    : "text-white text-xl font-medium ml-10 hover:text-gray-400 border-b-2 border-b-navy2  "
                }
              >
                Users
              </NavLink>
              <NavLink
                to="/admin/activity"
                className={({ isActive }) =>
                  isActive
                    ? "text-white text-xl font-medium ml-10 hover:text-gray-400  border-b-2 border-white"
                    : "text-white text-xl font-medium ml-10 hover:text-gray-400 border-b-2 border-b-navy2  "
                }
              >
                Activity
              </NavLink>
            </ul>
          </div>
          <div>
            {/* <i className="fa-solid fa-user fa-2xl bg-white p-5 px-2 cursor-pointer rounded-full hover:bg-gray-300 mr-5"></i>
             */}
            <button
              onClick={handleLogout}
              className=" text-white bg-blue-800 rounded-lg px-4 py-1 pb-2 font-medium 
            text-xl md:text-2xl mx-7 hover:bg-blue-500"
            >
              Logout
            </button>
          </div>
        </div>
        {/* menu  */}
        <div
          className={`flex placeholder w-full justify-evenly mt-3 ${
            menu ? `max-h-[1000px]` : `max-h-0`
          }
        }  overflow-hidden bg-gray-400  duration-1000 ease-in-out`}
        >
          <Link to="/admin/dashboard">
            <div className="text-white text-xl font-medium py-1.5 hover:text-black duration-300 ease-in-out ">
              Users
            </div>
          </Link>
          <Link to="/admin/activity">
            <div className="text-white text-xl font-medium py-1.5 hover:text-black duration-300 ease-in-out ">
              Activity
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default AdminNav;
