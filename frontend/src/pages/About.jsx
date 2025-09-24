import React from "react";
import MainLayout from "../layouts/MainLayout";
const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Making the Web Accessible for Everyone
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our mission is to help developers create inclusive web experiences that can be used by people of all abilities.
        </p>
      </section>

      {/* Our Story */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h3>
            <p className="text-gray-600 mb-4">
              Founded in 2020, DeepSeek began as a passion project between two developers who saw how many websites failed basic accessibility standards.
            </p>
            <p className="text-gray-600 mb-4">
              After working with organizations that serve people with disabilities, we realized the profound impact that inaccessible websites have on real people's lives.
            </p>
            <p className="text-gray-600">
              We set out to create a tool that would make accessibility testing easy, comprehensive, and integrated into the development workflow.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-blue-100 rounded-xl p-6 w-full max-w-md">
              <div className="bg-white rounded-lg shadow-md p-6">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                  alt="Our team working together" 
                  className="rounded-lg mb-4"
                />
                <p className="text-gray-600 text-center">Our team at the 2023 Web Accessibility Conference</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Mission & Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-3">Inclusion First</h4>
            <p className="text-gray-600">We believe the web should be accessible to everyone, regardless of abilities or disabilities.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-3">Education Focused</h4>
            <p className="text-gray-600">We don't just identify problems - we provide resources and guidance to help developers learn.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-3">User Centered</h4>
            <p className="text-gray-600">Our tools are designed with real users in mind, based on feedback from people with diverse abilities.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Journey</h3>
        <div className="max-w-3xl mx-auto">
          <div className="border-l-4 border-blue-500 pl-6 space-y-10">
            <div className="relative">
              <div className="absolute -left-9 mt-1.5">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
              <h4 className="text-xl font-semibold">2020 - Foundation</h4>
              <p className="text-gray-600">DeepSeek was founded with a mission to improve web accessibility.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-9 mt-1.5">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
              <h4 className="text-xl font-semibold">2021 - Beta Launch</h4>
              <p className="text-gray-600">Launched our beta scanner to selected developers and organizations.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-9 mt-1.5">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
              <h4 className="text-xl font-semibold">2022 - Version 1.0</h4>
              <p className="text-gray-600">Officially launched with comprehensive accessibility checking capabilities.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-9 mt-1.5">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
              <h4 className="text-xl font-semibold">2023 - Expanded Features</h4>
              <p className="text-gray-600">Added automated fixes, educational resources, and team collaboration tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Meet Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
              alt="Team member" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold">Sarah Johnson</h4>
              <p className="text-blue-600 mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">Web accessibility specialist with 10+ years of experience.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
              alt="Team member" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold">Michael Chen</h4>
              <p className="text-blue-600 mb-2">Lead Developer</p>
              <p className="text-gray-600 text-sm">Full-stack developer passionate about inclusive design.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
            <img 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
              alt="Team member" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold">Emily Rodriguez</h4>
              <p className="text-blue-600 mb-2">UX Designer</p>
              <p className="text-gray-600 text-sm">Creates intuitive experiences for all users.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
              alt="Team member" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold">David Kim</h4>
              <p className="text-blue-600 mb-2">Accessibility Advocate</p>
              <p className="text-gray-600 text-sm">Works directly with disability communities to understand needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-center text-white max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-4">Join Us in Making the Web More Accessible</h3>
        <p className="text-xl mb-6">Start scanning your website today and make a difference for users of all abilities.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors">
            Get Started
          </button>
          <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors">
            Contact Us
          </button>
        </div>
      </section>
      
    </div>
    
  );
};

export default About;