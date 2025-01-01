import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Spinner from "./Spinner.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const REACT_APP_BACKEND_URL =
  "http://localhost:3000/user/create-payment-intent";

const PaymentGateway = ({ isOpen, onClose, amt }) => {
  const elements = useElements();
  const stripe = useStripe();
  const [inProcess, setInProcess] = useState(false);

  const plans = {
    25: "Premium",
    50: "Premium plus",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInProcess(true);
    console.log("Processing Payment ...");

    const response = await axios.post(`${REACT_APP_BACKEND_URL}`, {
      amount: amt,
    });

    console.log(response);
    const { clientSecret } = response.data;

    // Adding card
    const payment_result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log(payment_result);

    const card_result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          // Include relevant billing details here
        },
      },
    });

    setInProcess(false);

    if (payment_result.error) {
      console.error(payment_result.error.message);
      alert(payment_result.error.message);
      // toast.warning(payment_result.error.message);
    } else {
      try {
        console.log("updating plan..");
        const token = localStorage.getItem("Token");
        const updation = await axios.put(
          "http://localhost:3000/user/updatePlan",
          { updatedPlan: plans[amt] },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(updation);
      } catch (error) {
        console.log(error);
      }
      toast.success(`Payment of ${amt}$ successful`);
      elements.getElement(CardElement).clear();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center duration-300  z-1000 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-full w-[450px] mx-auto mt-10 p-6 bg-gray-200 shadow-lg rounded-lg">
        <div className="text-end">
          <i
            onClick={handleOverlayClick}
            className={`fa-solid fa-xmark w-fit mb-3 p-1 rounded-sm cursor-pointer hover:rotate-90 duration-300`}
          ></i>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p>{`Amount: ${amt}$`}</p>
          <div>
            <CardElement className="p-4 border rounded-md bg-white" />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            disabled={inProcess}
          >
            {inProcess ? <Spinner /> : `Pay ${amt}$`}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={1000} limit={3} style={{ top: "100px" }} />
    </div>
  );
};

export default PaymentGateway;
