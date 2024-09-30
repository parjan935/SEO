import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Faq = () => {
  return (
    <>
      <div className=" flex flex-col bg-navy2 h-screen">
        <Navbar />
        <div className=" mt-20 text-center flex-grow">
          <h1 className=" text-white pt-20 text-5xl">FAQ</h1>
          <h1 className=" text-white pt-10 text-5xl">Work in progress</h1>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Faq;
