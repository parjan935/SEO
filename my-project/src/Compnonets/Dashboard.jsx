import React, { useState, useEffect } from "react";
import logo from "../assets/SEO_logo.jpg";
import mainimg from "../assets/LOGO2.jpg";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const token = localStorage.getItem("Token");
  const [warn, setwarn] = useState(false);
  const navigate = useNavigate();

  const navtotry = () => {
    if (token) {
      navigate("/main");
    } else {
      toast.warning("Please Login to access it...");
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col bg-darkNavy2 pt-20 h-fit min-h-screen">
        <div className="flex-grow flex">
          <div className="bg-darkNavy2 flex flex-row h-fit pt-8">
            <div className="flex flex-col sm:pl-5 space-y-4 w-fit lg:w-3/4 xl:w-9/12">
              {/* <div className="text-yellow-400 text-lg ml-8">SEO optimizer</div> */}
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-cyan-700 to-cyan-900 text-left sm:text-left mx-10 mt-3 text-5xl sm:text-7xl md:text-8xl lg:text-7xl font-semibold xl:text-8xl"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "10px 30px 30px rgba(0, 0, 0, 0.5)", // Shadow cast on the ground
                }}
              >
                AMAZINGLY SIMPLE
              </span>

              <div className="text-white  sm:text-left text-base text-ce font-semibold mx-10 py-8 w-fit h-fit ">
                SEO Optimizer with GENAI is a cutting-edge tool designed to
                revolutionize search engine optimization by leveraging
                generative AI. It automates content analysis, keyword
                generation, and optimization strategies to enhance website
                visibility and ranking. By integrating AI-driven insights, the
                tool helps businesses create high-quality, SEO-friendly content
                tailored to search engine algorithms, ensuring improved traffic,
                relevance, and user engagement.
              </div>
              <div className="flex flex-col items-center justify-center">
                <div
                  onClick={navtotry}
                  className={`px-10 py-2 mb-9 h-fit w-fit bg-cyan-500 text-center text-4xl font-medium hover:opacity-80 rounded-lg cursor-pointer`}
                >
                  Try it
                </div>
              </div>
            </div>
            {/* Dashboard Image */}
            <div className="hidden lg:flex w-1/2 mx-16 justify-center items-center">
              <div className="shadow-lg"></div>
              <video src="/mainimg.mp4" autoPlay loop muted className="" />
              {/* <img src="/mainimg.gif" alt="Example GIF" /> */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer position="top-center" autoClose={1000} limit={3} />
    </>
  );
}

export default Dashboard;
