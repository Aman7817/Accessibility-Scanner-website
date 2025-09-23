
import React, { useState } from "react";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "10 Common Accessibility Mistakes and How to Fix Them",
      excerpt: "Learn about the most frequent accessibility issues found on websites and practical solutions to address them.",
      category: "educational",
      date: "2023-10-15",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Introducing Automated Fixes in DeepSeek v2.3",
      excerpt: "Our latest update includes intelligent automated fixes for common accessibility issues, saving developers hours of work.",
      category: "updates",
      date: "2023-10-10",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Understanding WCAG 2.2: What's New and Important",
      excerpt: "The Web Content Accessibility Guidelines have been updated. Here's what you need to know about the new success criteria.",
      category: "insights",
      date: "2023-10-05",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Creating Accessible React Components: A Complete Guide",
      excerpt: "Learn how to build fully accessible React components with proper focus management and keyboard navigation.",
      category: "tutorial",
      date: "2023-09-28",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Why Accessibility Matters: Beyond Legal Compliance",
      excerpt: "Exploring the business case, ethical considerations, and user experience benefits of web accessibility.",
      category: "insights",
      date: "2023-09-20",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "How We Reduced False Positives in Our Scanner by 40%",
      excerpt: "A technical deep dive into the machine learning approaches we used to improve our accessibility scanning accuracy.",
      category: "updates",
      date: "2023-09-15",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "educational", name: "Educational" },
    { id: "updates", name: "Product Updates" },
    { id: "insights", name: "Industry Insights" },
    { id: "tutorial", name: "Tutorials" }
  ];

  const filteredPosts = activeCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Accessibility Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Insights, updates, and best practices for creating inclusive web experiences.
        </p>
      </section>

      {/* Category Filters */}
      <section className="mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      <section className="mb-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <img
                className="h-64 w-full object-cover md:h-full"
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
                alt="Featured blog post"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold mb-1">
                Featured Article
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                The Future of Automated Accessibility Testing
              </h2>
              <p className="text-gray-600 mb-6">
                Exploring how AI and machine learning are revolutionizing the way we identify and fix accessibility issues, 
                making the web more inclusive for everyone.
              </p>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm">October 20, 2023</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-500 text-sm">8 min read</span>
              </div>
              <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Read Article
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                  <span className="text-gray-500 text-sm">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{post.date}</span>
                  <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-center text-white mt-16">
        <h2 className="text-2xl font-bold mb-4">Stay Updated on Accessibility</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Get the latest articles, product updates, and accessibility tips delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="px-4 py-3 rounded-lg text-gray-800 flex-grow"
          />
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            Subscribe
          </button>
        </div>
        <p className="text-blue-100 text-sm mt-4">
          No spam. Unsubscribe at any time.
        </p>
      </section>
    </div>
  );
};

export default Blog;