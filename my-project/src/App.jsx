import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Compnonets/Dashboard";
import SignIn from "./Compnonets/SignIn";
import Pricing from "./Compnonets/Pricing";
import SignUp from "./Compnonets/SingUp";
import Main from "./Compnonets/Main";
import Faq from "./Compnonets/Faq";
import Features from "./Compnonets/Features";
import Copy from "./Compnonets/Copy";
import Profile from "./Compnonets/Profile";
import ForgetPass from "./Compnonets/ForgetPass";
import AdminDashBoard from "./Compnonets/AdminComponents/AdminDashBoard";
import PaymentGateway from "./Compnonets/PaymentGateway";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Activity from "./Compnonets/AdminComponents/Activity";
import { useState, useEffect } from "react";
import Navbar from "./Compnonets/Navbar";
import { resetInactivityTimer, handleUserActivity } from './utils/TokenUtils'


// const plainPasswords = [
//   "Parjan@123", "John@456", "Jane@789", "Alice@123", "Bob@456",
//   "Charlie@789", "David@123", "Eve@456", "Frank@789", "Grace@123"
// ];

const stripePromise = loadStripe(
  "pk_test_51OyWGwSDlwM9qquDZ3gG7MlIOijr05rwL8TGNBZhSFNGLa7csxb9plcL9dR6Q7l7lJa1qX4Z7b0AbDgw6BRXFLVl00IeBHLvUc"
);

export default function App() {
  useEffect(() => {
    resetInactivityTimer();

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/payment" element={<PaymentGateway />} />
          </Routes>
        </Elements>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/pricing" element={<Pricing />}></Route>
          <Route path="/faq" element={<Faq />}></Route>
          <Route path="/features" element={<Features />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/admin/dashboard" element={<AdminDashBoard />}></Route>
          <Route path="/admin/activity" element={<Activity />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
