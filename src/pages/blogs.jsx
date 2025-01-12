import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FiBookOpen, FiCalendar, FiClock, FiTag, FiArrowRight, FiUser } from "react-icons/fi";
import { DiReact, DiJavascript1, DiPython, DiCss3 } from "react-icons/di";

const BlogsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-white mt-4">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Web Development: What's Next in 2025",
      excerpt:
        "Explore the upcoming trends and technologies that will shape the future of web development...",
      author: "Emma Wilson",
      date: "Dec 24, 2024",
      readTime: "8 min read",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
      tags: ["Web Dev", "Future Tech", "Trends"],
      icon: <DiReact className="w-8 h-8" />,
    },
    {
      id: 2,
      title: "Mastering TypeScript: Advanced Tips and Tricks",
      excerpt:
        "Learn advanced TypeScript techniques that will take your development skills to the next level...",
      author: "David Chen",
      date: "Dec 23, 2024",
      readTime: "12 min read",
      category: "TypeScript",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop",
      tags: ["TypeScript", "Programming", "Advanced"],
      icon: <DiJavascript1 className="w-8 h-8" />,
    },
  ];

  const recentPosts = [
    {
      id: 3,
      title: "Building Scalable APIs with GraphQL",
      excerpt:
        "A comprehensive guide to building efficient and scalable APIs using GraphQL...",
      author: "Sarah Johnson",
      date: "Dec 22, 2024",
      readTime: "10 min read",
      category: "Backend",
      tags: ["GraphQL", "API", "Backend"],
      icon: <DiPython className="w-8 h-8" />,
    },
    {
      id: 4,
      title: "React Performance Optimization Techniques",
      excerpt:
        "Essential techniques to optimize your React applications for better performance...",
      author: "Michael Brown",
      date: "Dec 21, 2024",
      readTime: "15 min read",
      category: "React",
      tags: ["React", "Performance", "Frontend"],
      icon: <DiReact className="w-8 h-8" />,
    },
    {
      id: 5,
      title: "Introduction to Web Assembly",
      excerpt:
        "Get started with Web Assembly and learn how it's revolutionizing web performance...",
      author: "Lisa Chen",
      date: "Dec 20, 2024",
      readTime: "7 min read",
      category: "Web Assembly",
      tags: ["WASM", "Performance", "Low-level"],
      icon: <DiCss3 className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <Navbar />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Blobs */}
        <div className="fixed w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow -top-48 -left-48"></div>
        <div className="fixed w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow -bottom-48 -right-48"></div>

        {/* Floating Icons */}
        {/* <div className="fixed inset-0">
          <div
            className="floating-icon absolute top-20 left-[15%] text-blue-400/30"
            style={{ animationDelay: "0s" }}
          >
            <DiHtml5 size={40} />
          </div>
          <div
            className="floating-icon absolute top-40 right-[15%] text-purple-400/30"
            style={{ animationDelay: "1s" }}
          >
            <DiCss3 size={40} />
          </div>
          <div
            className="floating-icon absolute bottom-40 left-[10%] text-blue-400/30"
            style={{ animationDelay: "1.5s" }}
          >
            <DiJavascript1 size={40} />
          </div>
          <div
            className="floating-icon absolute top-60 right-[15%] text-purple-400/30"
            style={{ animationDelay: "0.5s" }}
          >
            <DiReact size={40} />
          </div>
          <div
            className="floating-icon absolute bottom-60 left-[10%] text-blue-400/30"
            style={{ animationDelay: "2s" }}
          >
            <DiGit size={40} />
          </div>
        </div> */}

        {/* Code Rain Effect */}
        {/* <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="code-rain">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="code-line"
                style={{
                  left: `${i * 5}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {"{}"} &lt;/&gt; $_
              </div>
            ))}
          </div>
        </div> */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-5xl md:text-6xl sm:p-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 text-center animate-fade-in tracking-tight">
            Tech Blogs
          </h1>
          <hr className="border-white/10 mb-4" />

          <p className="text-xs sm:text-xl text-white text-center max-w-2xl mx-auto underline">
            Explore the latest insights, tutorials, and trends in technology
          </p>

          {/* Search and Filter */}
          {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
            <div className="relative w-full sm:w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:bg-white/20" // Improved hover effect
                aria-label="Search articles" // Added accessibility label
              />
            </div>
            <div className="relative w-full sm:w-auto">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-48 pl-10 pr-4 py-2 bg-white/10 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white appearance-none cursor-pointer transition-all"
              >
                <option value="All">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>
          </div> */}
        </div>

        {/* Featured Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              className="group relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-48 rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                    {post.icon}
                    <span className="ml-2">{post.category}</span>
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="flex items-center text-gray-400 text-xs">
                    <FiClock className="mr-1" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white text-sm">{post.author}</div>
                      <div className="text-gray-400 text-xs flex items-center">
                        <FiCalendar className="mr-1" />
                        {post.date}
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                    Read More
                    <FiArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
            <FiBookOpen className="mr-2" />
            Recent Posts
          </h2>
          <div className="space-y-8">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="group bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <span className="flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                    {post.icon}
                    <span className="ml-2">{post.category}</span>
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="flex items-center text-gray-400 text-xs">
                    <FiClock className="mr-1" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs"
                    >
                      <FiTag className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white text-sm flex items-center">
                        <FiUser className="mr-1" />
                        {post.author}
                      </div>
                      <div className="text-gray-400 text-xs flex items-center">
                        <FiCalendar className="mr-1" />
                        {post.date}
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                    Read More
                    <FiArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
