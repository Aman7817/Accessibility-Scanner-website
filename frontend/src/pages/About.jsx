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
              Founded in 2025, WebLoom began as a passion project between two developers who saw how many websites failed basic accessibility standards.
            </p>
            <p className="text-gray-600 mb-4">
              After working with organizations that serve people with disabilities, we realized the profound impact that inaccessible websites have on real people's lives.
            </p>
            <p className="text-gray-600">
              We set out to create a tool that would make accessibility testing easy, comprehensive, and integrated into the development workflow.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 w-full max-w-md">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-100">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg w-full h-64 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-16 w-16 text-blue-600 mx-auto mb-4" 
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
                    <p className="text-blue-800 font-semibold">Building Accessible Web Together</p>
                  </div>
                </div>
                <p className="text-gray-600 text-center text-sm">Our team at the 2025 Web Accessibility Conference</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Mission & Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 text-center border border-blue-100 hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-white" 
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
            <h4 className="text-xl font-semibold mb-3 text-gray-800">Inclusion First</h4>
            <p className="text-gray-600">We believe the web should be accessible to everyone, regardless of abilities or disabilities.</p>
          </div>
          <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg p-6 text-center border border-green-100 hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-white" 
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
            <h4 className="text-xl font-semibold mb-3 text-gray-800">Education Focused</h4>
            <p className="text-gray-600">We don't just identify problems - we provide resources and guidance to help developers learn.</p>
          </div>
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-6 text-center border border-purple-100 hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-white" 
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
            <h4 className="text-xl font-semibold mb-3 text-gray-800">User Centered</h4>
            <p className="text-gray-600">Our tools are designed with real users in mind, based on feedback from people with diverse abilities.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Journey</h3>
        <div className="max-w-3xl mx-auto">
          <div className="border-l-4 border-gradient-to-b from-blue-400 to-blue-600 pl-6 space-y-10">
            {[
              { year: "2025", title: "Foundation", desc: "WebLoom was founded with a mission to improve web accessibility for everyone." },
              { year: "2025", title: "First Prototype", desc: "Developed our first working prototype and began initial testing with developers." },
              { year: "2026", title: "Beta Launch", desc: "Launched our beta version to selected developers and organizations for feedback." },
              { year: "2026", title: "Version 1.0", desc: "Officially launched WebLoom with comprehensive accessibility checking capabilities." }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-9 mt-1.5">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
                <div className="bg-gradient-to-r from-white to-blue-50 rounded-lg p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h4 className="text-xl font-semibold text-gray-800">{item.year} - {item.title}</h4>
                  <p className="text-gray-600 mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Meet Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Aman", role: "Founder & CEO", desc: "Web accessibility specialist with passion for inclusive design.", bg: "from-blue-500 to-blue-700" },
            { name: "Aman", role: "Lead Developer", desc: "Full-stack developer passionate about creating accessible web experiences.", bg: "from-green-500 to-green-700" },
            { name: "Nitin", role: "UI Designer", desc: "Creates intuitive and accessible user interfaces for all users.", bg: "from-purple-500 to-purple-700" },
            { name: "MOHD. Munazir", role: "Accessibility Advocate", desc: "Works directly with communities to understand accessibility needs.", bg: "from-orange-500 to-orange-700" }
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className={`w-full h-48 bg-gradient-to-br ${member.bg} flex items-center justify-center`}>
                <div className="text-6xl font-bold text-white">{member.name.charAt(0)}</div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action - Improved Design */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl shadow-2xl p-12 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 2%, transparent 2%), radial-gradient(circle at 75% 75%, #ffffff 2%, transparent 2%)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Join the Accessibility Revolution
            </h3>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Be part of the movement to create a web that's truly inclusive for everyone. 
              Start your accessibility journey today and make a lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a

              href="/signup"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Start free trial — Sign up"
            >
              Start Free Trial
            </a>
              
            </div>
            <p className="text-blue-200 text-sm mt-6">No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;