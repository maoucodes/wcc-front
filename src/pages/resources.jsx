import React from 'react';

const ResourcesPage = () => {
  const resources = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "A comprehensive guide to HTML, CSS, and JavaScript basics.",
      level: "Beginner",
      duration: "4 weeks",
      topics: ["HTML5", "CSS3", "JavaScript"],
      type: "Course",
    },
    {
      id: 2,
      title: "React Advanced Patterns",
      description: "Learn advanced React concepts and design patterns.",
      level: "Advanced",
      duration: "3 weeks",
      topics: ["React", "Hooks", "State Management"],
      type: "Workshop",
    },
    {
      id: 3,
      title: "Building APIs with Node.js",
      description: "Create robust and scalable APIs using Node.js and Express.",
      level: "Intermediate",
      duration: "2 weeks",
      topics: ["Node.js", "Express", "REST APIs"],
      type: "Course",
    },
  ];

  const tutorials = [
    {
      id: 1,
      title: "Getting Started with Git",
      author: "Alex Johnson",
      duration: "15 min",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "CSS Grid Mastery",
      author: "Sarah Chen",
      duration: "20 min",
      difficulty: "Intermediate",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Learning Resources</h1>

        {/* Resource Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <button className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
            All Resources
          </button>
          <button className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
            Courses
          </button>
          <button className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
            Workshops
          </button>
          <button className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
            Tutorials
          </button>
        </div>

        {/* Featured Courses */}
        <h2 className="text-2xl font-bold text-white mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resources.map((resource) => (
            <div key={resource.id} className="group bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                  {resource.type}
                </span>
                <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                  {resource.level}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {resource.title}
              </h3>
              <p className="text-gray-300 mb-4">{resource.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.topics.map((topic, index) => (
                  <span key={index} className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                    {topic}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-gray-400 text-sm mb-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {resource.duration}
              </div>
              <button className="w-full px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all">
                Start Learning →
              </button>
            </div>
          ))}
        </div>

        {/* Quick Tutorials */}
        <h2 className="text-2xl font-bold text-white mb-6">Quick Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="group bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {tutorial.title}
              </h3>
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <span>By {tutorial.author}</span>
                <span>• {tutorial.duration}</span>
                <span>• {tutorial.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
