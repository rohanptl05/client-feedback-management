import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userImage from './assets/user.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('name');
    navigate('/login');
  };

  useEffect(() => {
  
  }, [location]);

  return (
    <nav className="bg-teal-500 p-4">
      <div className="container mx-auto flex  justify-between">
       
        <div className="flex items-center text-white text-lg font-bold">
          <Link to="/" className="hover:text-teal-300">
            Client-Feedback's
          </Link>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link
            to="/"
            className="text-teal-200 hover:text-white transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-teal-200 hover:text-white transition duration-300"
          >
            About
          </Link>
          {localStorage.getItem('type')?.toUpperCase() === 'A' && (
            <Link
              to="/admin"
              className="text-teal-200 hover:text-white transition duration-300"
            >
              Admin Dashboard
            </Link>
          )}
        </div>

      
        <div className="flex items-center space-x-4">
          {!localStorage.getItem('token') ? (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 border rounded text-white border-white hover:text-teal-500 hover:bg-white transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 border rounded text-white border-white hover:text-teal-500 hover:bg-white transition duration-300"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <>
              <span className="text-white">Welcome, {localStorage.getItem('name') || "User"}</span>
              <img
                src={userImage}
                className="h-8 w-8 rounded-full"
                alt="User"
              />
              <button
                onClick={handleLogout}
                className="px-4 py-2 border rounded text-white border-white hover:text-teal-500 hover:bg-white transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      <div className="block md:hidden justify-between">
        <div className="flex flex-col space-y-2 mt-4">
          <Link
            to="/"
            className="text-teal-200 hover:text-white transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-teal-200 hover:text-white transition duration-300"
          >
            About
          </Link>
          {localStorage.getItem('type')?.toUpperCase() === 'A' && (
            <Link
              to="/admin"
              className="text-teal-200 hover:text-white transition duration-300"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
