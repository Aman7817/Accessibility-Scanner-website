// import React from 'react';

// const Navbar = ({ activeTab, setActiveTab }) => {
//   return (
//     <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
//       <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
//         <div className="flex items-center space-x-2 mb-4 md:mb-0">
//           <div className="bg-white p-2 rounded-full">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//             </svg>
//           </div>
//           <h1 className="text-2xl font-bold">DeepSeek Accessibility Scanner</h1>
//         </div>
        
//         <nav className="flex space-x-1 bg-blue-500 p-1 rounded-lg">
//           <button 
//             className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'home' ? 'bg-white text-blue-600' : 'text-white hover:bg-blue-400'}`}
//             onClick={() => setActiveTab('home')}
//           >
//             Home
//           </button>
//           <button 
//             className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'reports' ? 'bg-white text-blue-600' : 'text-white hover:bg-blue-400'}`}
//             onClick={() => setActiveTab('reports')}
//           >
//             Reports
//           </button>
//           <button 
//             className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'about' ? 'bg-white text-blue-600' : 'text-white hover:bg-blue-400'}`}
//             onClick={() => setActiveTab('about')}
//           >
//             About
//           </button>
//           <button 
//             className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'about' ? 'bg-white text-blue-600' : 'text-white hover:bg-blue-400'}`}
//             onClick={() => setActiveTab('about')}
//           >
//             Login
//           </button>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

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
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="bg-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">DeepSeek Accessibility Scanner</h1>
        </div>

        <nav className="flex space-x-1 bg-blue-500 p-1 rounded-lg">
          <NavLink to="/" end className={({ isActive }) => `${base} ${isActive ? active : "text-white hover:bg-blue-400"}`}>
            Home
          </NavLink>
          <NavLink to="/report" className={({ isActive }) => `${base} ${isActive ? active : "text-white hover:bg-blue-400"}`}>
            Reports
          </NavLink>
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

// import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUniversalAccess, faSearch, faSun, faGlobe, faUserCircle } from "@fortawesome/free-solid-svg-icons";

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
//       {/* Logo */}
//       <div className="flex items-center space-x-2">
//         <FontAwesomeIcon icon={faUniversalAccess} className="text-purple-600 text-2xl" />
//         <span className="text-xl font-bold text-gray-800">A11yTool</span>
//       </div>

//       {/* Links */}
//       <div className="hidden md:flex space-x-6 text-gray-700">
//         <Link to="/" className="hover:text-purple-600">Home</Link>
//         <Link to="/dashboard" className="hover:text-purple-600">Dashboard</Link>
//         <Link to="/report" className="hover:text-purple-600">Report</Link>
//         <Link to="/docs" className="hover:text-purple-600">Docs</Link>
//         <Link to="/api" className="hover:text-purple-600">API</Link>
//         <Link to="/blog" className="hover:text-purple-600">Blog</Link>
//         <Link to="/contact" className="hover:text-purple-600">Contact</Link>
//       </div>

//       {/* Right side controls */}
//       <div className="flex items-center space-x-4">
//         {/* Search */}
//         <button className="text-gray-600 hover:text-purple-600">
//           <FontAwesomeIcon icon={faSearch} />
//         </button>

//         {/* Theme toggle */}
//         <button className="text-gray-600 hover:text-purple-600">
//           <FontAwesomeIcon icon={faSun} />
//         </button>

//         {/* Language switcher */}
//         <select className="border rounded px-2 py-1 text-gray-700">
//           <option>EN</option>
//           <option>HI</option>
//         </select>

//         {/* Auth buttons (before login) */}
//         <div className="flex space-x-2">
//           <Link
//             to="/signup"
//             className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 transition"
//           >
//             Signup
//           </Link>
//           <Link
//             to="/login"
//             className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//           >
//             Login
//           </Link>
//         </div>

//         {/* User dropdown (after login) - static placeholder */}
//         <div className="relative hidden">
//           <button className="flex items-center space-x-2 text-gray-700 hover:text-purple-600">
//             <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
//             <span className="hidden md:inline">My Account</span>
//           </button>
//           <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
//             <Link to="/my-scans" className="block px-4 py-2 hover:bg-gray-100">My Scans</Link>
//             <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
//             <Link to="/billing" className="block px-4 py-2 hover:bg-gray-100">Billing</Link>
//             <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React from 'react';

// export default function Navbar({ activeTab, setActiveTab }) {
//   const linkClass = (tab) =>
//     `px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'}`;

//   return (
//     <nav className="flex justify-end space-x-2 p-4 bg-blue-200">
//       <button onClick={() => setActiveTab('home')} className={linkClass('home')}>Home</button>
//       <button onClick={() => setActiveTab('reports')} className={linkClass('reports')}>Reports</button>
//       <button onClick={() => setActiveTab('about')} className={linkClass('about')}>About</button>
//     </nav>
//   );
// }


// import React from 'react';

// export default function Navbar({ activeTab, setActiveTab }) {
//   return (
//     <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
//       <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
//         <div className="flex items-center space-x-2 mb-4 md:mb-0">
//           <div className="bg-white p-2 rounded-full">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M5 6h14M5 18h14" />
//             </svg>
//           </div>
//           <h1 className="text-2xl font-bold">Accessibility Dashboard</h1>
//         </div>
//         <nav className="flex space-x-6 text-lg">
//           <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'font-semibold underline' : ''}>Home</button>
//           <button onClick={() => setActiveTab('reports')} className={activeTab === 'reports' ? 'font-semibold underline' : ''}>Reports</button>
//           <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'font-semibold underline' : ''}>About</button>
//         </nav>
//       </div>
//     </header>
//   );
// }





















// import React from 'react'
// import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUniversalAccess } from "@fortawesome/free-solid-svg-icons";

// const Navbar = () => {
//   return (
//     <nav className="bg-fuchsia-900 shadow-md py-4 px-6 flex justify-between items-center">
//       {/* Replace this div with your logo */}
//       <div className="text-xl font-bold text-blue-600">
//         <FontAwesomeIcon icon={faUniversalAccess} className="text-primary text-2xl" />
        
//         A11yTool</div>
      
//       <div className="space-x-6 items-center  flex ">
//         <Link to="/" className="hover:text-blue-500">Home</Link>
//         <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
//         <Link to="/report" className="hover:text-blue-500">Report</Link>
//         <Link to="/about" className="hover:text-blue-500">About</Link>
//         <Link to="/signup" className="hover:text-blue-500">signup</Link>
//         <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</Link>
        
//       </div>
//     </nav>
//   )
// }

// export default Navbar

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUniversalAccess, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-fuchsia-900 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">

//           {/* Logo */}
//           <div className="flex items-center space-x-2 text-white font-bold text-xl">
//             <FontAwesomeIcon icon={faUniversalAccess} className="text-white text-2xl" />
//             <span>A11yTool</span>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-6 text-white">
//             <Link to="/" className="hover:text-blue-300">Home</Link>
//             <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>
//             <Link to="/report" className="hover:text-blue-300">Report</Link>
//             <Link to="/about" className="hover:text-blue-300">About</Link>
//             <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
//               Signup
//             </Link>
//             <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
//               Login
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
//               <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-2xl" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-fuchsia-800 px-4 pt-2 pb-4 space-y-2 text-white">
//           <Link to="/" className="block hover:text-blue-300">Home</Link>
//           <Link to="/dashboard" className="block hover:text-blue-300">Dashboard</Link>
//           <Link to="/report" className="block hover:text-blue-300">Report</Link>
//           <Link to="/about" className="block hover:text-blue-300">About</Link>
//           <Link to="/signup" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
//             Signup
//           </Link>
//           <Link to="/login" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
//             Login
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUniversalAccess } from "@fortawesome/free-solid-svg-icons";

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
//       {/* Logo */}
//       <div className="flex items-center space-x-2">
//         <FontAwesomeIcon icon={faUniversalAccess} className="text-purple-600 text-2xl" />
//         <span className="text-xl font-bold text-gray-800">A11yTool</span>
//       </div>

//       {/* Links */}
//       <div className="hidden md:flex space-x-6 text-gray-700">
//         <Link to="/" className="hover:text-purple-600">Home</Link>
//         <Link to="/dashboard" className="hover:text-purple-600">Dashboard</Link>
//         <Link to="/report" className="hover:text-purple-600">Report</Link>
//         <Link to="/about" className="hover:text-purple-600">About</Link>
//       </div>

//       {/* Auth buttons */}
//       <div className="flex space-x-4">
//         <Link
//           to="/signup"
//           className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 transition"
//         >
//           Signup
//         </Link>
//         <Link
//           to="/login"
//           className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//         >
//           Login
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUniversalAccess } from "@fortawesome/free-solid-svg-icons";

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
//       {/* Logo */}
//       <div className="flex items-center space-x-2">
//         <FontAwesomeIcon icon={faUniversalAccess} className="text-purple-600 text-2xl" />
//         <span className="text-xl font-bold text-gray-800">A11yTool</span>
//       </div>

//       {/* Links */}
//       <div className="hidden md:flex space-x-6 text-gray-700">
//         <Link to="/" className="hover:text-purple-600">Home</Link>
//         <Link to="/dashboard" className="hover:text-purple-600">Dashboard</Link>
//         <Link to="/report" className="hover:text-purple-600">Report</Link>
        
//       </div>

//       {/* Auth buttons */}
//       <div className="flex space-x-4">
//         <Link
//           to="/signup"
//           className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 transition"
//         >
//           Signup
//         </Link>
//         <Link
//           to="/login"
//           className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//         >
//           Login
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-3 px-6 shadow-lg">
//       <div className="max-w-6xl mx-auto flex items-center justify-between">
//         <div className="flex items-center">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-md">
//               <span className="text-purple-700 font-bold text-xl">A</span>
//             </div>
//             <h1 className="text-2xl font-bold">AccessibilityCheck</h1>
//           </div>
          
//           <nav className="hidden md:flex ml-12 space-x-8">
//             <a href="#features" className="font-semibold hover:text-purple-200 transition py-2 border-b-2 border-transparent hover:border-white">Features</a>
//             <a href="#how-it-works" className="font-semibold hover:text-purple-200 transition py-2 border-b-2 border-transparent hover:border-white">How It Works</a>
//             <a href="#pricing" className="font-semibold hover:text-purple-200 transition py-2 border-b-2 border-transparent hover:border-white">Pricing</a>
//             <a href="#faq" className="font-semibold hover:text-purple-200 transition py-2 border-b-2 border-transparent hover:border-white">FAQ</a>
//           </nav>
//         </div>
        
//         <div className="hidden md:flex items-center space-x-4">
//           <button className="px-5 py-2.5 rounded-lg text-purple-700 bg-white font-semibold hover:bg-gray-100 transition shadow-md">
//             Login
//           </button>
//         </div>
        
//         {/* Mobile menu button */}
//         <button 
//           className="md:hidden text-white bg-purple-800 p-2 rounded-lg"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             {isMenuOpen ? (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </svg>
//         </button>
//       </div>
      
//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden mt-4 pb-4 bg-purple-800 rounded-lg">
//           <div className="flex flex-col space-y-3 px-4 py-3">
//             <a href="#features" className="block py-3 hover:bg-purple-700 px-4 rounded-lg font-medium">Features</a>
//             <a href="#how-it-works" className="block py-3 hover:bg-purple-700 px-4 rounded-lg font-medium">How It Works</a>
//             <a href="#pricing" className="block py-3 hover:bg-purple-700 px-4 rounded-lg font-medium">Pricing</a>
//             <a href="#faq" className="block py-3 hover:bg-purple-700 px-4 rounded-lg font-medium">FAQ</a>
//             <div className="pt-3 border-t border-purple-600">
//               <button className="w-full py-3 rounded-lg text-purple-700 bg-white font-semibold shadow-md">
//                 Login
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;


// import React, { useState } from "react";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-4 px-6">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
//             <span className="text-purple-700 font-bold text-xl">A</span>
//           </div>
//           <span className="text-xl font-bold">AccessibilityCheck</span>
//         </div>
        
//         <div className="hidden md:flex space-x-6">
//           <a href="#" className="hover:text-purple-200 transition">Features</a>
//           <a href="#" className="hover:text-purple-200 transition">Pricing</a>
//           <a href="#" className="hover:text-purple-200 transition">Contact</a>
//         </div>
        
//         <div className="flex space-x-4">
//           <button className="px-4 py-2 rounded-md text-purple-700 bg-white font-medium hover:bg-gray-50 transition">
//             Login
//           </button>
//           <button className="hidden md:block px-4 py-2 rounded-md bg-purple-800 text-white font-medium hover:bg-purple-700 transition">
//             Sign Up
//           </button>
//           <button 
//             className="md:hidden text-white"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden mt-4 bg-purple-800 rounded-lg p-4">
//           <div className="flex flex-col space-y-3">
//             <a href="#" className="hover:text-purple-200 transition">Features</a>
//             <a href="#" className="hover:text-purple-200 transition">Pricing</a>
//             <a href="#" className="hover:text-purple-200 transition">Contact</a>
//             <button className="px-4 py-2 rounded-md bg-purple-900 text-white font-medium mt-2">
//               Sign Up
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;