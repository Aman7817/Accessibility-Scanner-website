// // // import React from 'react'
// // // import Navbar from '../components/Navbar'
// // // import Footer from '../components/Footer'

// // // const MainLayout = ({ children }) => {
// // //   return (
// // //     <div className="min-h-screen flex flex-col">
// // //       <Navbar />
// // //       <main className="flex-1 p-4 sm:p-8">{children}</main>
// // //       <Footer />
// // //     </div>
// // //   )
// // // }

// // // export default MainLayout

// // import React from "react";
// // import { useLocation } from "react-router-dom";
// // const MainLayout = ({ children }) => {
// //   const location = useLocation();
  
// //   // Pages where footer should be hidden
// //   const hideFooterPages = ['/profile', '/dashboard']; // Add more pages as needed
  
// //   const showFooter = !hideFooterPages.includes(location.pathname);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
// //       {showFooter && <Navbar />}

// //       <main className="flex-grow container mx-auto px-4 py-8">
// //         {children}
// //       </main>

// //       {showFooter && <Footer />}
// //     </div>
// //   );
// // };

// // export default MainLayout;

// import React from "react";
// import { useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const MainLayout = ({ children }) => {
//   const location = useLocation();
//   // Navbar: Hide only on profile page
//   const hideNavbarPages = ['/profile'];
//   const showNavbar = !hideNavbarPages.includes(location.pathname);
//   // Pages where footer should be hidden
//   const hideFooterPages = ['/profile', '/dashboard'];
//   const showFooter = !hideFooterPages.includes(location.pathname);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
//       {showFooter && <Navbar />}

//       <main className="flex-grow container mx-auto px-4 py-8">
//         {children}
//       </main>

//       {showFooter && <Footer />}
//     </div>
//   );
// };

// export default MainLayout;

import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  const location = useLocation();
  
  // Navbar: Hide only on profile page
  const hideNavbarPages = ['/profile'];
  const showNavbar = !hideNavbarPages.includes(location.pathname);
  
  // Footer: Hide on profile and dashboard pages
  const hideFooterPages = ['/profile', '/dashboard'];
  const showFooter = !hideFooterPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {showNavbar && <Navbar />}

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;