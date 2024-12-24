import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
  const navigate=useNavigate();
  const token = localStorage.getItem("AdminToken");
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");
  const [selecteduser, setSelectedUser] = useState(null);

  const options = ["All", "Base", "Premium", "Premium plus"];
  const [warn, setWarn] = useState("");

  const [searchData, setsearchData] = useState("");

  const AllUsers =
    selectedOption != "All"
      ? users.filter((user) => user.subscription === selectedOption)
      : users;

  const filteredUsers =
    searchData != ""
      ? AllUsers.filter(
          (user) =>
            user.userName.toLowerCase().includes(searchData.toLowerCase()) ||
            user.email.toLowerCase().includes(searchData.toLowerCase())
        )
      : AllUsers;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (err) {
        console.log("Error Fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  if (!token){
    const LoginAgain=()=>{
      navigate('/signin')
    }
    return(
      <div className="flex flex-col justify-center items-center mt-5">
      <h1>Session logged out!</h1>
      <button className="text-white bg-black rounded-lg px-4 py-2 font-medium mt-3
            text-base md:text-lg mx-7 hover:bg-white hover:text-black duration-300 flex justify-center items-center" onClick={LoginAgain}>Login Again</button>
      </div>
    )
  }
    

  const deleteUser = async () => {
    const option = confirm(
      `Are u sure u want to remove ${selecteduser.userName}`
    );
    if (option) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/admin/${selecteduser.email}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        alert("User removed successfully.");
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert(error.error);
      }
    }
  };

  const removeSubs = async () => {
    if (selecteduser.subscription === "Base") {
      alert(`${selecteduser.userName} is already in Base plan`);
      return;
    }
    const updateUser = {
      userName: selecteduser.userName,
      email: selecteduser.email,
      subscription: "Base",
    };
    const option = confirm(
      `${selecteduser.userName}'s subscription plan will be set to Base Plan.\n Are u sure about this operation?`
    );
    if (option) {
      try {
        const response = await axios.put(
          `http://localhost:3000/admin/${selecteduser.email}`,
          { updateUser },
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        alert("Users Subscrption is set to Base plan.");
        window.location.reload();
        alert(error.error);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Operation cancelled.");
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="bg-darkNavy  w-full min-h-screen pt-32 flex flex-col lg:flex-row">
        {/* Users Data  */}
        <div className="text-xs md:text-base list-none h-fit lg:fixed px-0 mb-5 lg:w-[200px] lg:border-t-2 text-white  flex lg:flex-col justify-center">
          {options.map((opt, key) => (
            <li
              key={key}
              className={`cursor-pointer  border-b-2 p-3  hover:bg-gray-400 hover:text-black ${
                selectedOption == opt ? "bg-gray-400 text-black" : ""
              }`}
              onClick={(e) => setSelectedOption(opt)}
            >
              {opt} Users
            </li>
          ))}
        </div>
        <div className=" lg:ml-[200px] p-8 pt-0 h-fit w-full flex flex-col items-center">
          <div className="bg-gray-400 sticky top-24 w-fit rounded-md mt-5">
            <input
              type="text"
              value={searchData}
              onChange={(e) => setsearchData(e.target.value)}
              placeholder="Enter name or email"
              className="w-[300px] sm:w-[500px] p-2 pl-4 h-10 bg-gray-200 rounded-md  rounded-r-none focus:outline-none focus:ring-0"
            />
            <i className="fa-solid fa-magnifying-glass text-white mx-3 text-xl cursor-pointer hover:text-black duration-300"></i>
          </div>
          <h1 className="text-2xl font-bold text-center my-6 text-white">
            {`${selectedOption} Users`}
          </h1>
          <div className="w-full flex flex-wrap justify-center gap-6">
            <table className="lg:w-8/12 table table-striped table-hover">
              <thead>
                <tr className="text-center">
                  <th scope="col">userName</th>
                  {/* <th scope="col">Email</th> */}
                  <th scope="col">Subscription</th>
                  {/* <th scope="col">Operations</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, key) => (
                  <tr
                    key={key}
                    className="hover:bg-gray-600 cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={(e) => setSelectedUser(user)}
                  >
                    <td className="border border-gray-700 px-4 py-2 w-1/2">
                      <i className="fa-solid fa-user fa-2xl text-3xl mr-5 "></i>
                      {user.userName}
                    </td>
                    {/* <td className="border border-gray-700 px-4 py-2 w-1/2">
                      {user.email}
                    </td> */}
                    <td className="border border-gray-700 px-4 py-2">
                      {user.subscription}
                    </td>
                    {/* <td>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={removeSubs}
                        >
                          Remove subscription
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={deleteUser}
                        >
                          Delete user
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="modal fade mt-40"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog w-[300px] lg:w-[400px]">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 font-bold"
                    id="exampleModalLabel"
                  >
                    {selecteduser != null ? (
                      <div>
                        <i className="fa-solid  fa-user fa-2xl text-3xl mr-5"></i>
                        {selecteduser.userName}
                      </div>
                    ) : (
                      <Spinner />
                    )}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body ">
                  {selecteduser != null ? (
                    <div>
                      <p>
                        <span className="w-fit font-semibold">Email : </span>
                        {selecteduser.email}
                      </p>
                      <p>
                        <span className="w-fit font-semibold">
                          Subscription :{" "}
                        </span>
                        {selecteduser.subscription}
                      </p>
                    </div>
                  ) : (
                    <Spinner />
                  )}
                </div>
                <div className="flex flex-wrap gap-2 p-3 border-t-2 justify-end">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={removeSubs}
                  >
                    Remove subscription
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={deleteUser}
                  >
                    Delete user
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
