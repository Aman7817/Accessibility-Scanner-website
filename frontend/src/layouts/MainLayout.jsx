import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AIChatbot from "../components/AIChatbot"; // ✅ Chatbot import karein

const MainLayout = ({ children }) => {
  const location = useLocation();
  
  // Navbar: Hide only on profile page
  const hideNavbarPages = ['/profile'];
  const showNavbar = !hideNavbarPages.includes(location.pathname);
  
  // Footer: Hide on profile and dashboard pages
  const hideFooterPages = ['/profile', '/dashboard'];
  const showFooter = !hideFooterPages.includes(location.pathname);

  // Chatbot: Hide on specific pages if needed (e.g., profile page)
  const hideChatbotPages = []; // Add pages where chatbot should be hidden
  const showChatbot = !hideChatbotPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {showNavbar && <Navbar />}

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {showFooter && <Footer />}

      
      {showChatbot && <AIChatbot />}
    </div>
  );
};

export default MainLayout;