import React, { useContext, useState, useEffect } from "react";
import feedbackContext from "../context/feedbacks/feedbackContext";
import AdminFeedsfiltter from "./AdminFeedsfiltter";

const Admin = () => {
  const context = useContext(feedbackContext);
  const { searchFeedback, feedback } = context;

  const [feed, setFeed] = useState({
    search: "",
    startdate: "",
    enddate: "",
    category: "",
    priorities: "",
  });

  useEffect(() => {
    
    console.log("Filters to apply:", feed);
    searchFeedback(feed); 
  }, [feed]); 

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFeed((prevFeed) => ({ ...prevFeed, [name]: value }));
    console.log("Updated filter:", name, value); 
  };

  return (
    <div className="container">
      <h1 className="bg-emerald-400 p-5 text-center text-2xl font-extrabold font-serif">
        Admin Dashboard
      </h1>
      <form>
        <div className="list-none bg-gray-600 flex flex-wrap items-center p-4 space-x-4">
          <li className="flex items-center space-x-2">
            <label htmlFor="search" className="text-white">Search:</label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="p-2 rounded"
              onChange={handleOnChange} // Changed to onChange
            />
          </li>
          <li className="flex items-center space-x-2">
            <label htmlFor="startdate" className="text-white">Date: From</label>
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
            <label htmlFor="enddate" className="text-white">To:</label>
            <input
              type="date"
              name="enddate"
              id="enddate"
              className="p-2 rounded"
              onChange={handleOnChange}
            />
          </li>
          <li className="flex items-center space-x-2">
            <label htmlFor="category" className="text-white">Category:</label>
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
          <li className="flex items-center space-x-2">
            <label htmlFor="priorities" className="text-white">Priority:</label>
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
      <div className="mt-5">
        <h2 className="text-lg font-bold">Filtered Feedbacks</h2>
        {feedback && feedback.length > 0 ? (
          <div className="container row">
            {feedback.map((item) => (
              <AdminFeedsfiltter key={item._id} feedback={item} />
            ))}
          </div>
        ) : (
          <p>No feedback found for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
