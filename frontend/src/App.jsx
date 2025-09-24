// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Home from "./pages/Home";
// import Reports from "./pages/Reports";
// import API from "./pages/API";
// import Blog from "./pages/Blog";
// import Profile from "./pages/Profile";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import About from "./pages/About";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   const location = useLocation();

//   return (
//     <Router>
//       {/* Show Navbar only if NOT on /profile */}
//       {location.pathname !== "/profile" && <Navbar />}
//       <AuthProvider>
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
//           <Navbar />

//           <main className="flex-grow container mx-auto px-4 py-8">
//             <Routes>
//               <Route path="/" element={<Home />} />

//               {/* Protected Routes - Only accessible when logged in */}
//               <Route
//                 path="/report"
//                 element={
//                   <ProtectedRoute>
//                     <Reports />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/dashboard"
//                 element={
//                   <ProtectedRoute>
//                     <Dashboard />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Profile (protected) */}
//               <Route
//                 path="/profile"
//                 element={
//                   <ProtectedRoute>
//                     <Profile />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Public Routes */}
//               <Route path="/about" element={<About />} />
//               <Route path="/api" element={<API />} />
//               <Route path="/blog" element={<Blog />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//             </Routes>
//           </main>

//           <Footer />
//         </div>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Reports from "./pages/Reports";
import API from "./pages/API";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

// Create a Layout wrapper to handle Navbar visibility
const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar hidden on /profile */}
      {location.pathname !== "/profile" && <Navbar />}

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Protected Routes */}
            <Route path="/report" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Public Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/api" element={<API />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
