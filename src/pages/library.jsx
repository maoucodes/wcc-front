import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaInfoCircle } from "react-icons/fa";
const LibraryPage = () => {
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

  const categories = [
    // { id: 1, name: "Frontend Development", icon: <FaCode className="w-6 h-6" /> },
    // { id: 2, name: "Backend Development", icon: <FaDatabase className="w-6 h-6" /> },
    // { id: 3, name: "Mobile Development", icon: <FaBookOpen className="w-6 h-6" /> },
    // { id: 4, name: "DevOps & Cloud", icon: <FaCloud className="w-6 h-6" /> },
    // { id: 5, name: "Data Science", icon: <FaRobot className="w-6 h-6" /> },
    // { id: 6, name: "Machine Learning", icon: <FaRobot className="w-6 h-6" /> },
    { id: 1, name: "Frontend Development", icon: "💻" },
    { id: 2, name: "Backend Development", icon: "⚙️" },
    { id: 3, name: "Mobile Development", icon: "📱" },
    { id: 4, name: "DevOps & Cloud", icon: "☁️" },
    { id: 5, name: "Data Science", icon: "📊" },
    { id: 6, name: "Machine Learning", icon: "🤖" },
  ];

  const resources = [
    {
      id: 1,
      title: "Complete React Guide",
      description:
        "Master React.js with practical examples and real-world applications.",
      type: "Course",
      level: "Intermediate",
      duration: "10 hours",
      rating: 4.8,
      reviews: 245,
      tags: ["React", "JavaScript", "Web Development"],
      author: "Alex Johnson",
    },
    {
      id: 2,
      title: "Python Data Structures",
      description: "Deep dive into Python data structures and algorithms.",
      type: "Tutorial Series",
      level: "Advanced",
      duration: "8 hours",
      rating: 4.9,
      reviews: 189,
      tags: ["Python", "DSA", "Programming"],
      author: "Sarah Chen",
    },
    {
      id: 3,
      title: "Cloud Architecture Patterns",
      description: "Learn best practices for cloud-native applications.",
      type: "Workshop",
      level: "Advanced",
      duration: "6 hours",
      rating: 4.7,
      reviews: 156,
      tags: ["AWS", "Cloud", "Architecture"],
      author: "Mike Peters",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-5xl md:text-6xl sm:p-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 text-center animate-fade-in tracking-tight">
          Learning Library
        </h1>
        <hr className="border-white/10 mb-4" />

        <p className="text-xs sm:text-xl text-white mb-8 text-center underline">
          Explore our collection of resources!
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white/10 p-6 rounded-xl backdrop-blur-sm transition-transform transform hover:scale-105 shadow-lg flex flex-col items-center"
            >
              <div className="text-xl sm:text-3xl mb-2 text-blue-400">
                {category.icon}
              </div>
              <h3 className="text-white text-xs sm:text-base font-medium text-center">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="group bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm sm:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {resource.title}
                </h3>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs sm:text-sm">
                  {resource.type}
                </span>
              </div>
              <p className="text-xs sm:text-base text-gray-300 mb-4">
                {resource.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs sm:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm mb-4">
                <div className="flex items-center">
                  <FaInfoCircle className="w-4 h-4 mr-1 text-yellow-500" />
                  <span>
                    {resource.rating} ({resource.reviews} reviews)
                  </span>
                </div>
                <span>{resource.duration}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs sm:text-sm text-gray-400">
                  By {resource.author}
                </div>
                <button className="text-xs sm:text-base px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg">
                  Start Learning →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Circles */}
      <div className="fixed w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow -top-48 -left-48"></div>
      <div className="fixed w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow -bottom-48 -right-48"></div>
    </div>
  );
};

export default LibraryPage;
