import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Pricing() {
  return (
    <>
      <Navbar />
      <div className=" bg-darkNavy flex flex-col lg:flex-row lg:h-screen lg:pt-0 pt-20 items-center justify-center space-y-20 lg:-mt-20 lg:space-x-10  lg:space-y-0 pb-10">
        {/* General */}
        <div
          className="flex flex-col text-white h-[450px] w-[300px] rounded-lg text-2xl bg-blue-500 hover:scale-110 
        duration-500 ease-in-out z-0 lg:z-20 p-5 px-7"
        >
          <h1 className="text-5xl w-fit m-auto">Base Plan</h1>
          {/* <h1 className="text-5xl w-fit m-auto">Plan</h1> */}
          <div className="flex flex-col flex-grow space-y-6 py-10">
            <div className="flex space-x-2 ">
              <i className="fa-solid fa-check my-2"></i>
              <span>Video Acceptance range: upto 30 min</span>
            </div>
            <div className="flex space-x-2 ">
              <i className="fa-solid fa-check my-2"></i>
              <span>Fast response</span>
            </div>
          </div>
          <div className="text-center mb-10">
            <button
              className="bg-gold text-black rounded-lg p-3 px-8 text-center m-auto hover:bg-green-500
             duration-500 ease-in-out"
            >
              Free
            </button>
          </div>
        </div>
        {/* premium Plus */}
        <div
          className="flex flex-col text-white h-[500px] w-[330px] rounded-lg bg-blue-700 text-2xl hover:scale-110 
        duration-300 ease-in-out z-0 lg:z-20 p-5 px-7"
        >
          <h1 className="text-5xl  w-fit m-auto">Premium</h1>
          <h1 className="text-5xl  w-fit m-auto">Plus</h1>
          <div className="flex flex-col flex-grow space-y-6 py-10">
            <div className="flex space-x-2 ">
              <i className="fa-solid fa-check my-2"></i>
              <span>Video Acceptance range : more than 60 min</span>
            </div>
            <div className="flex space-x-2 ">
              <i className="fa-solid fa-check my-2"></i>
              <span>Fastest response</span>
            </div>
          </div>
          <div className="text-center mb-10">
            <button
              className="bg-gold text-black rounded-lg p-3 text-center m-auto hover:bg-green-500 
            duration-500 ease-in-out"
            >
              Buy now-50$
            </button>
          </div>
        </div>
        {/* premium  */}
        <div
          className="flex flex-col text-white h-[450px] w-[300px] rounded-lg bg-blue-500 text-2xl  hover:scale-110 
        duration-300 ease-in-out z-0 lg:z-20 p-5 px-7 m-0"
        >
          <h1 className="text-5xl w-fit m-auto">Premium</h1>
          <div className="flex flex-col flex-grow space-y-6 py-10">
            <div className="flex space-x-2">
              <i className="fa-solid fa-check my-2"></i>
              <span>Video Acceptance range: upto 60 min</span>
            </div>
            <div className="flex space-x-2">
              <i className="fa-solid fa-check my-2"></i>
              <span>Faster response</span>
            </div>
          </div>
          <div className="text-center mb-10">
            <button
              className="bg-gold text-black rounded-lg p-3 text-center m-auto hover:bg-green-500
              duration-500 ease-in-out"
            >
              Buy now-25$
            </button>
          </div>
        </div>
      </div>
      <div className="lg:fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </>
  );
}

export default Pricing;
