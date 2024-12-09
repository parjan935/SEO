import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";

const AdminDashBoard = () => {
  const token = localStorage.getItem("AdminToken");
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");

  const options = [
    "All",
    "Base",
    "Premium",
    "Premium plus",
  ];
  const [warn, setWarn] = useState("");

  const [searchData, setsearchData] = useState("");

  const AllUsers =
    selectedOption != "All"
      ? users.filter((user) => user.subscription === selectedOption)
      : users;

  const filteredUsers =
    searchData != ""
      ? AllUsers.filter((user) =>
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
        // console.log(data);
        setUsers(data);
      } catch (err) {
        console.log("Error Fetching users:", err);
      }
    };

    fetchUsers();
  }, [token]);

  if (!token)
    return (
      <h1>
        Session Logged out. <br /> Please Login again.
      </h1>
    );

  return (
    <div>
      <AdminNav />
      <div className="bg-darkNavy  w-full min-h-screen pt-32 flex flex-col lg:flex-row">
        {/* Users Data  */}
        <div className="text-xs md:text-md list-none h-fit lg:fixed px-0 mb-5 lg:w-[200px] lg:border-t-2 text-white  flex lg:flex-col justify-center">
          {options.map((opt) => (
            <li
              className={`cursor-pointer  border-b-2 p-3 px-5 hover:bg-gray-400 hover:text-black ${
                selectedOption == opt ? "bg-gray-400 text-black" : ""
              }`}
              onClick={(e) => setSelectedOption(opt)}
            >
              {opt} Users
            </li>
          ))}
        </div>
        <div className=" lg:ml-[200px] p-8 pt-0 h-fit w-full flex flex-col items-center mx-auto">
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
            <table className="w-8/12 border-none bg-transparent text-white mb-20 mx-20 shadow-slate-800 shadow-[0px_0px_240px_rgba(1,1,1,100)] ">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className=" border border-gray-700 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-700 px-4 py-2 text-left">
                    Email
                  </th>
                  <th className="border border-gray-700 px-4 py-2 text-left">
                    Subscription
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-600">
                    <td className="border border-gray-700 px-4 py-2">
                      <i className="fa-solid  fa-user fa-2xl text-3xl mr-5"></i>
                      {user.userName}
                    </td>
                    <td className="border border-gray-700 px-4 py-2 ">
                      {user.email}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {user.subscription}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;

// {filteredUsers.map((user, index) => (
//   <div
//     key={index}
//     className={`${user.subscription=="premium"?"bg-blue-300":""}
//      ${user.subscription == "premium plus" ? "bg-amber-500" : ""}
//      ${user.subscription == "Base" ? "bg-gray-300" : ""}
//       w-[300px] shadow-white rounded-lg p-4 border-none`}
//   >

//     <i className="fa-solid fa-user fa-2xl text-3xl"></i>
//     <p className="text-lg font-semibold">
//       <span className="font-bold text-gray-700">Name:</span>{" "}
//       {user.userName}
//     </p>
//     <p className="text-gray-700">
//       <span className="font-bold">Email:</span> {user.email}
//     </p>
//     <p className="text-gray-700">
//       <span className="font-bold">Subscription:</span>{" "}
//       {user.subscription}
//     </p>
//   </div>
// ))}
