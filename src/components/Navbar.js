import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const hendleLogout =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('type')
    navigate('/login')

  }
  useEffect(() => {
    // console.log(location.pathname)
  }, [location]);
  return (
   <>
   <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
  <div className="flex items-center flex-shrink-0 text-white mr-6">
  <Link className="navbar-brand" to="/">
  Clien-Feedback's
          </Link>
  </div>
  <div className="block lg:hidden">
    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
    
    </button>
  </div>
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="text-sm lg:flex-grow">
     <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Home
      </Link>
     <Link to="/about" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        About
      </Link>
      {localStorage.getItem('type')?.toUpperCase() === 'A' ? (
  <Link
    to="/admin"
    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
  >
    Admin Dashboard
  </Link>
) : null}

    
    
    </div>
    <div>
    {!localStorage.getItem('token')?<form className="flex" role="search">
              <Link to="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" role="button">
                Login
              </Link>
              <Link to="/signup" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" role="button">
                Sign up
              </Link>
            </form>:<button onClick={hendleLogout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</button>}
          
          
    </div>
  </div>
</nav>
   </>
  )
}

export default Navbar