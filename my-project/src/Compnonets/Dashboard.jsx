import React, { useState, useEffect } from "react";
import logo from "../assets/SEO_logo.jpg";
import mainimg from "../assets/LOGO2.jpg";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TOKEN_EXPIRY_TIME = 60 * 60 * 1000;

function Dashboard() {
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const navtotry = () => {
    if (token) {
      navigate("/main");
    } else {
      alert("Please Login to Access it..\nLogin now ");
      navigate("/signin");
    }
  };

  useEffect(() => {
    let inactivityTimer;

    const removeToken = () => {
      localStorage.removeItem("token");
      console.log("Token removed due to inactivity.");
    };

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        removeToken();
      }, TOKEN_EXPIRY_TIME);
    };

    const activityEvents = ["mousemove", "keypress", "scroll", "click"];
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetInactivityTimer)
    );

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetInactivityTimer)
      );
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-full bg-darkNavy">
        <div className="flex-grow flex">
          <div className="bg-darkNavy flex flex-row h-fit pt-8">
            <div className="flex flex-col pl-5 space-y-4 w-fit lg:w-3/4 xl:w-9/12">
              <div className="text-yellow-400 text-lg ml-8">SEO optimizer</div>
              <div className="text-white h-fit w-2/5 mx-10 text-7xl md:text-8xl lg:text-7xl font-bold xl:text-8xl">
                AMAZINGLY SIMPLE
              </div>
              <div className="text-white text-base font-semibold mx-10 py-8 w-fit h-fit ">
                SEO Optimizer with GENAI is a cutting-edge tool designed to
                revolutionize search engine optimization by leveraging
                generative AI. It automates content analysis, keyword
                generation, and optimization strategies to enhance website
                visibility and ranking. By integrating AI-driven insights, the
                tool helps businesses create high-quality, SEO-friendly content
                tailored to search engine algorithms, ensuring improved traffic,
                relevance, and user engagement.
              </div>
              <div className="mx-auto">
                <div
                  onClick={navtotry}
                  className=" mt-0 px-10 py-2 my-9 h-fit w-fit bg-xoraTeal text-center text-4xl font-medium hover:opacity-80 rounded-lg cursor-pointer"
                >
                  Try it
                </div>
              </div>
            </div>
            {/* Dashboard Image */}
            <div className="hidden lg:flex w-1/2 ml-48 mt-10">
              <div className="shadow-lg"></div>
              <img
                src={mainimg}
                className="w-2/5 absolute right-[15px] top-24 h-[450px] bg-no-repeat bg-cover "
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
