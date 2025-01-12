import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FiTerminal, FiZap } from "react-icons/fi";
const CommunityPage = () => {
  const communityMembers = [
    {
      id: 1,
      name: "Ganesh Wadhe",
      role: "Full Stack Developer",
      contributions: 156,
      avatar: "👨‍💻",
      badges: ["Top Contributor", "President"],
    },
    {
      id: 2,
      name: "Meet Sonawane",
      role: "Backend Developer",
      contributions: 120,
      avatar: "👨‍💻",
      badges: ["Backend Developer"],
    },
    {
      id: 3,
      name: "Prathamesh Teli",
      role: "Frontend Developer",
      contributions: 58,
      avatar: "👨‍💻",
      badges: ["Technical Team", "Frontend Developer"],
    },
  ];

  const discussions = [
    // {
    //   id: 1,
    //   title: "Best practices for React hooks",
    //   author: "Alex Johnson",
    //   replies: 23,
    //   likes: 45,
    //   tags: ["React", "JavaScript"],
    // },
    // {
    //   id: 2,
    //   title: "Setting up a CI/CD pipeline",
    //   author: "Mike Peters",
    //   replies: 15,
    //   likes: 32,
    //   tags: ["DevOps", "GitHub Actions"],
    // },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"> */}

      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-5xl md:text-6xl sm:p-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 text-center animate-fade-in tracking-tight">
          Our Community
        </h1>
        {/* Join Community Button */}
        {/* <div className="flex justify-center mt-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-8">
            <Link to="/join-community">
              <button className="group relative inline-flex items-center justify-center px-3 py-2 sm:px-6 sm:py-3 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 pulse-border">
                <span className="absolute inset-0 w-full h-full rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg bg-gradient-to-br from-blue-600 to-purple-600"></span>
                <span className="relative z-10 flex items-center">
                  <FiTerminal className="mr-2" />
                  Join Community
                  <FiZap className="ml-2 animate-pulse" />
                </span>
              </button>
            </Link>
          </div>
        </div> */}
        <hr className="border-white/10 mb-4" />

        <p className="text-xs sm:text-xl text-white mb-8 text-center underline">
          Contribution Of Community
        </p>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-xl sm:text-3xl text-blue-400 mb-2">👥</div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">
              200+
            </div>
            <div className="text-xs sm:text-base text-gray-400">
              Active Members
            </div>
          </div>
          <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-xl sm:text-3xl text-blue-400 mb-2">💬</div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">
              5000+
            </div>
            <div className="text-xs sm:text-base text-gray-400">
              Discussions
            </div>
          </div>
          <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-xl sm:text-3xl text-blue-400 mb-2">🚀</div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">
              10+
            </div>
            <div className="text-xs sm:text-base text-gray-400">Projects</div>
          </div>
        </div>

        <hr className="border-white/10 mb-4" />

        {/* Top Contributors */}
        <h2 className="text-lg sm:text-2xl font-bold text-white mb-6 text-center">
          Top Contributors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {communityMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              <div className="text-lg sm:text-4xl mb-4">{member.avatar}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {member.name}
              </h3>
              <p className="text-xs sm:text-base text-gray-400 mb-3">
                {member.role}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {member.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <div className="text-xs sm:text-base text-gray-400">
                {member.contributions} contributions
              </div>
            </div>
          ))}
        </div>

        {/* Recent Discussions */}
        {/* <h2 className="text-2xl font-bold text-white mb-6">Recent Discussions</h2>
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors cursor-pointer">
                {discussion.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-4">
                <span>By {discussion.author}</span>
                <span>• {discussion.replies} replies</span>
                <span>• {discussion.likes} likes</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {discussion.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default CommunityPage;
