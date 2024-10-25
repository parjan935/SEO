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
import Sample from "./Compnonets/QandA";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/price" element={<Pricing />}></Route>
          <Route path="/faq" element={<Faq />}></Route>
          <Route path="/features" element={<Features />}></Route>
          <Route path="/main" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
