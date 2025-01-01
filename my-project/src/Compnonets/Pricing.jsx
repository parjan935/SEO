import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentGateway from "./PaymentGateway";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise=loadStripe('pk_test_51OyWGwSDlwM9qquDZ3gG7MlIOijr05rwL8TGNBZhSFNGLa7csxb9plcL9dR6Q7l7lJa1qX4Z7b0AbDgw6BRXFLVl00IeBHLvUc')

function Pricing() {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");

  // State for managing the selected plan's amount
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Open Payment Modal
  const openPayment = (amount) => {
    if (!token) {
      toast.info("You are not logged in");
      navigate("/signin");
    } else {
      setSelectedPlan(amount); // Set the selected plan's amount
    }
  };

  // Close Payment Modal
  const closePayment = () => {
    setSelectedPlan(null); // Reset the selected plan
  };

  return (
    <div>
      <Navbar />
      <div className="bg-darkNavy flex flex-col lg:flex-row lg:h-screen lg:pt-0 pt-40 items-center justify-center space-y-20 lg:space-x-10 lg:space-y-0 pb-10">
        {/* General Plan */}
        <div className="flex flex-col text-white h-[450px] w-[300px] rounded-lg text-2xl bg-blue-500 hover:scale-110 duration-500 ease-in-out z-0 p-5 px-7">
          <h1 className="text-4xl w-fit m-auto">Base Plan</h1>
          <div className="flex flex-col flex-grow space-y-6 py-10">
            <div className="flex space-x-2">
              <i className="fa-solid fa-check text-base"></i>
              <span className="text-base">Video Acceptance range: up to 10 min</span>
            </div>
            <div className="flex space-x-2">
              <i className="fa-solid fa-check text-base"></i>
              <span className="text-base">Normal processing speed</span>
            </div>
            <div className="flex space-x-2">
              <i className="fa-solid fa-check text-base"></i>
              <span className="text-base">Perfect for beginners</span>
            </div>
          </div>
          <div className="text-center mb-10 ">
            <button
              className="bg-gold text-black rounded-lg p-3 px-8 text-center m-auto hover:bg-green-500 duration-500 ease-in-out"
              // onClick={() => openPayment(0)} // Free Plan Amount
            >
              Free
            </button>
          </div>
        </div>

        {/* Premium Plus Plan */}
        <div className="flex flex-col text-white h-[500px] w-[320px] rounded-lg bg-blue-700 text-2xl hover:scale-110 duration-300 ease-in-out z-10  p-5 px-7">
          <h1 className="text-4xl w-fit m-auto">Premium</h1>
          <h1 className="text-4xl w-fit m-auto">Plus</h1>
          <div className="flex flex-col flex-grow space-y-6 py-10">
            <div className="flex space-x-2">
              <i className="fa-solid fa-check text-base"></i>
              <span className="text-base">Video Acceptance range: more than 20 min</span>
            </div>
            <div className="flex space-x-2">
              <i className="fa-solid fa-check text-base"></i>
              <span className="text-base">Faster Processing Speed</span>
            </div>
            <div className="flex space-x-2">
              <i className="fa-solid fa-check text-base"></i>
              <span className="text-base">Optimized for professionals</span>
            </div>
          </div>
          <div className="text-center mb-10">
            <button
              className="bg-gold text-black rounded-lg p-3 text-center m-auto hover:bg-green-500 duration-500 ease-in-out"
              onClick={() => openPayment(50)} // Premium Plus Plan Amount
            >
              Buy now - 50$
            </button>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="flex flex-col text-white h-[450px] w-[300px] rounded-lg bg-blue-500 text-2xl hover:scale-110 duration-300 ease-in-out z-0 p-5 px-7">
          <h1 className="text-4xl w-fit m-auto">Premium</h1>
          <div className="flex flex-col flex-grow space-y-6 py-10">
            <div className="flex space-x-2">
              <i className="fa-solid fa-check text-base"></i>
              <span className="text-base">Video Acceptance range: up to 20 min</span>
            </div>
            <div className="flex space-x-2">
              <i className="fa-solid fa-check text-base"></i>
              <span className="text-base">Standared Processing Speed</span>
            </div>
            <div className="flex space-x-2">
              <i className="fa-solid fa-check text-base"></i>
              <span className="text-base">Great for content creators</span>
            </div>
          </div>
          <div className="text-center mb-10">
            <button
              className="bg-gold text-black rounded-lg p-3 text-center m-auto hover:bg-green-500 duration-500 ease-in-out"
              onClick={() => openPayment(25)} // Premium Plan Amount
            >
              Buy now - 25$
            </button>
          </div>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      {selectedPlan !== null && (
        <Elements stripe={stripePromise}>
          <PaymentGateway isOpen={true} onClose={closePayment} amt={selectedPlan} />
        </Elements>
      )}

      <div className="lg:fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
      <ToastContainer position="top-center" autoClose={1000} limit={3} />
    </div>
  );
}

export default Pricing;
