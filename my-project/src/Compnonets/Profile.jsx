import React, { useState, useEffect } from "react";
import userimg from "../assets/user.png";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = localStorage.getItem("Token");
  const [userDetails,setUserDetails]=useState(null);

  useEffect(() => {

    if (!token) {
      // setError("User not authenticated. Please log in.");
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
          console.log(result)
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

  
  
  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem("Token");
    localStorage.removeItem("userDetails");
    navigate("/");
  };
  
  const [oldPassword,setOldPassword]=useState("")
  const [newPassword,setNewPassword]=useState("")
  const [confirmNewPassword,setConfirmNewPassword]=useState("")

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }

    const token = localStorage.getItem("Token"); // Retrieve JWT token

    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const data = {
      currentPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      const response = await fetch("http://localhost:3000/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(response)
      console.log(result)
      if (response.ok) {
        setOldPassword("")
        setNewPassword("")
        setConfirmNewPassword("")
        alert("Password changed successfully!\n Please Login again");
        handleLogout()
      } else {
        alert(result.error || "Failed to change password");
        
      }
    } catch (err) {
      alert("Error connecting to the server:", err);
    }
  }

  return (
    <>{token!=null ?
      <div className="flex bg-gray-300 h-screen">
        <div className="flex flex-col h-screen w-[400px] bg-gray-300">
          <Link to="/">
            <button className="m-5 p-4 py-2 hover:bg-gray-400 rounded-2xl">
              {`<`} Back
            </button>
          </Link>
          <div className="bg-white w-fit rounded-full mx-auto">
            <img src={userimg} alt="User" className="h-64 rounded-full" />
          </div>
          <div className="flex-grow">
            {userDetails ? <h1 className="text-2xl mx-auto mt-10 w-fit">{userDetails.userName}</h1> : ""}
            <h1 className="text-2xl mx-auto mt-3 w-fit">
              Subscription : {userDetails ? userDetails.subscription :""}
            </h1>
          </div>
          <div
            onClick={handleLogout}
            className=" text-white bg-blue-500 rounded-lg px-4 py-1 pb-2 w-fit text-2xl mx-auto my-10 hover:bg-blue-600 cursor-pointer"
            >
            <i className="fa-solid fa-arrow-right-from-bracket rotate-180"></i>{" "}
            Sign out
          </div>
        </div>
        <div className="flex h-screen flex-grow bg-gray-500 rounded-l-3xl items-center justify-center">
          <form action="" className="w-3/4 h-full" onSubmit={handleChangePassword}>
            <h1 className="text-5xl font-medium w-fit mx-auto my-10 mt-20">
              Change Password
            </h1>

            {/* Old Password */}
            <h1 className="text-xl font-medium mb-2">Old Password :</h1>
            <div className="flex w-full mb-10">
              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                className="flex-grow p-2 rounded-l-lg"
                placeholder="Old Password"
                />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowOldPassword((prev) => !prev);
                }}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
                >
                {showOldPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* New Password */}
            <h1 className="text-xl font-medium mb-2">New Password :</h1>
            <div className="flex w-full mb-10">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                className="flex-grow p-2 rounded-l-lg"
                placeholder="New Password"
                />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowNewPassword((prev) => !prev);
                }}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
                >
                {showNewPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Confirm New Password */}
            <h1 className="text-xl font-medium mb-2">Confirm New Password :</h1>
            <div className="flex w-full mb-10">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                }}
                className="flex-grow p-2 rounded-l-lg"
                placeholder="Confirm New Password"
                />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmPassword((prev) => !prev);
                }}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
                >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors "
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
      : 
      <div className="flex flex-col justify-center items-center text-center pt-10">
        <h1 className="text-2xl">
        Logged out. <br/> Please login again.
        </h1>
        <Link to='/signin'>
          <div className=" text-white bg-blue-800 rounded-lg px-4 py-1 pb-2 font-medium 
            text-2xl m-5 hover:bg-blue-700 cursor-pointer">
              Login
          </div>
        </Link>
      </div>
      }
    </>
  );
};

export default Profile;
