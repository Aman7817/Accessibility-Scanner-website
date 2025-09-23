// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Reports from "./pages/Reports";
// import Docs from "./pages/About";
// import API from "./pages/API";
// import Blog from "./pages/Blog";
// import Contact from "./pages/Contact";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import About from "./pages/About";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
//         <Navbar />

//         <main className="flex-grow container mx-auto px-4 py-8">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/report" element={<Reports />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/api" element={<API />} />
//             <Route path="/blog" element={<Blog />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/login" element={<Login/>} />
//             <Route path="/signup" element={<Signup/>} />
//           </Routes>
//         </main>

//         <Footer />
//       </div>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Reports from "./pages/Reports";

import API from "./pages/API";
import Blog from "./pages/Blog";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
          <Navbar />

          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Protected Routes - Only accessible when logged in */}
              <Route 
                path="/report" 
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Public Routes */}
              <Route path="/about" element={<About />} />
              <Route path="/api" element={<API />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
 


//import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import MainLayout from './layouts/MainLayout'
// import Home from './pages/Home'
// import Dashboard from './pages/Dashboard'
// import Report from './pages/Report'

// const App = () => {
//   return (
//     <Router>
//       <MainLayout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/report" element={<Report />} />
//         </Routes>
//       </MainLayout>
//     </Router>
//   )
// }

// // export default App

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Report from "./pages/Report";

// import Signup from "./pages/Signup";
// import Login from "./pages/Login";

// function App() {
//   return (
//     <Router>
      
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/report" element={<Report />} />
//         <Route path="/report/:id" element={<Report />} />
//         <Route path="contact" element={<Contact />}
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
// import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Report from "./pages/Reports";
// import Docs from "./pages/Docs";
// import API from "./pages/API";
// import Blog from "./pages/Blog";
// import Contact from "./pages/Contact";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";

// function App() {
//   return (
//     <Router>
//       <AuthProvider> {/* Wrap entire app with AuthProvider */}
        
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/report" element={<Report />} />
//           <Route path="/docs" element={<Docs />} />
//           <Route path="/api" element={<API />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
          
//           {/* Protected Routes - Only accessible when logged in */}
//           <Route 
//             path="/dashboard" 
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* Add more protected routes as needed */}
//           {/* <Route 
//             path="/profile" 
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             } 
//           /> */}
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Report from "./pages/Report";
// import Docs from "./pages/Docs";
// import API from "./pages/API";
// import Blog from "./pages/Blog";
// import Contact from "./pages/Contact";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/report" element={<Report />} />
//         <Route path="/docs" element={<Docs />} />
//         <Route path="/api" element={<API />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
