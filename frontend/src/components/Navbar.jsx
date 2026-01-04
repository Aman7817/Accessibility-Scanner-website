

// src/components/Navbar.jsx
import React, { useContext } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { user, logout } = useAuth() || {}; // get user & logout from context
  const navigate = useNavigate();

  const base = "px-4 py-2 rounded-md transition-colors";
  const active = "bg-white text-blue-600";

  const handleLogout = () => {
    logout();
    navigate("/"); // after logout redirect to home
  };

  return (
    <header className="bg-gradient-to-r  z-index: 1000 from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="bg-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">WebLoom</h1>
        </div>

        <nav className="flex space-x-1 bg-blue-500 p-1 rounded-lg">
          <NavLink to="/" end className={({ isActive }) => `${base} ${isActive ? active : "text-white hover:bg-blue-400"}`}>
            Home
          </NavLink>
          {/* <NavLink to="/report" className={({ isActive }) => `${base} ${isActive ? active : "text-white hover:bg-blue-400"}`}>
            Reports
          </NavLink> */}
          <NavLink to="/about" className={({ isActive }) => `${base} ${isActive ? active : "text-white hover:bg-blue-400"}`}>
            About
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => `${base} ${isActive ? active : "text-white hover:bg-blue-400"}`}>
            Blog
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `${base} ${isActive ? active : "text-white hover:bg-blue-400"}`}>
            Dashboard
          </NavLink>

          {user ? (
            <>
              <NavLink to="/profile" className={({ isActive }) => `${base} ${isActive ? active : "text-white hover:bg-blue-400"}`}>
                {user.firstName || user.name || "Profile"}
              </NavLink>
              <button onClick={handleLogout} className={`${base} text-white hover:bg-red-500`}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => `${base} ${isActive ? active : "text-white hover:bg-blue-400"}`}>
                Login
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => `${base} ${isActive ? active : "text-white hover:bg-blue-400"}`}>
                Signup
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
