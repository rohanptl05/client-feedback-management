import React, { useContext, useState, useEffect } from "react";
import feedbackContext from "../context/feedbacks/feedbackContext";

const Admin = () => {
  const context = useContext(feedbackContext);
  // const { searchFeedback } = context;

  const [feed, setFeed] = useState({
    search: "",
    startdate: "",
    enddate: "",
    category: "",
    priorities: "",
  });

  useEffect(() => {
    // searchFeedback(feed);
    console.log("Search filters updated:", feed);
  }, [feed]);

  const handleOnChange = (e) => {
    setFeed({ ...feed, [e.target.name]: e.target.value });
  };

  return (
    <>
      {localStorage.getItem("type") === "A" ? (
        <div className="container">
          <h1 className="bg-emerald-400 p-5 text-center text-2xl font-extrabold font-serif">
            Admin Dashboard
          </h1>
          <div>
            <form>
              <div className="list-none bg-gray-600 flex flex-wrap items-center p-4 space-x-4">
                {/* Search Input */}
                <li className="flex items-center space-x-2">
                  <label htmlFor="search" className="text-white">
                    Search:
                  </label>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search"
                    className="p-2 rounded"
                    onKeyUp={handleOnChange}
                  />
                </li>

                {/* Date Range */}
                <li className="flex items-center space-x-2">
                  <label htmlFor="startdate" className="text-white">
                    Date: From
                  </label>
                  <input
                    type="date"
                    name="startdate"
                    id="startdate"
                    className="p-2 rounded"
                    onChange={handleOnChange}
                  />
                </li>
                <span className="text-white">to</span>
                <li className="flex items-center space-x-2">
                  <label htmlFor="enddate" className="text-white">
                    To:
                  </label>
                  <input
                    type="date"
                    name="enddate"
                    id="enddate"
                    className="p-2 rounded"
                    onChange={handleOnChange}
                  />
                </li>

                {/* Category Dropdown */}
                <li>
                  <label htmlFor="category" className="text-white">
                    Category:
                  </label>
                  <select
                    className="form-control p-2 rounded"
                    id="category"
                    name="category"
                    onChange={handleOnChange}
                  >
                    <option value="">Select a category</option>
                    <option value="Bug">Bug</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Complaint">Complaint</option>
                    <option value="General">General</option>
                  </select>
                </li>

                {/* Priority Dropdown */}
                <li>
                  <label htmlFor="priorities" className="text-white">
                    Priority:
                  </label>
                  <select
                    className="form-control p-2 rounded"
                    id="priorities"
                    name="priorities"
                    onChange={handleOnChange}
                  >
                    <option value="">Select a priority</option>
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </li>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="container">
          <h2>You are not authorized to view this page. Please log in.</h2>
        </div>
      )}
    </>
  );
};

export default Admin;
