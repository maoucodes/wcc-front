import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  FaCode,
  FaCamera,
  FaPen,
  FaCalendarAlt,
  FaBullhorn,
} from "react-icons/fa";
import { FiTerminal, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";

const roleIcons = {
  "Technical Team": <FaCode className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400" />,
  Photography: <FaCamera className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" />,
  "Content Creation": (
    <FaPen className="w-4 h-4 sm:w-6 sm:h-6 text-green-400" />
  ),
  "Event Management": (
    <FaCalendarAlt className="w-4 h-4 sm:w-6 sm:h-6 text-orange-400" />
  ),
  Marketing: <FaBullhorn className="w-4 h-4 sm:w-6 sm:h-6 text-red-400" />,
};

const JoinCommunity = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 1,
      name: "Technical Team",
      description: "Work on software development and technical projects.",
    },
    {
      id: 2,
      name: "Photography",
      description: "Capture moments and create visual content.",
    },
    {
      id: 3,
      name: "Content Creation",
      description: "Develop engaging content for our community.",
    },
    {
      id: 4,
      name: "Event Management",
      description: "Organize and manage community events.",
    },
    {
      id: 5,
      name: "Marketing",
      description: "Promote our community and its activities.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-5xl md:text-6xl sm:p-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 text-center animate-fade-in tracking-tight">
          Join Our Community
        </h1>

        <hr className="border-white/10 mb-4" />

        <p className="text-xs sm:text-xl text-white text-center mb-8 underline">
          Choose a role and become a part of our community! <br /> Visit profile
          section and click on Forms.
        </p>

        <p className="text-xs sm:text-xl text-white text-center mb-4 underline">
          The roles are as below.
        </p>

        {/* ------------------------------ */}

        {/* <div className="flex justify-center mt-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-8">
            <Link to="/forms">
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

        {/* ------------------------------ */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto p-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-white/10 p-4 rounded-xl backdrop-blur-sm shadow-lg"
            >
              <div className="flex items-center mb-4">
                {roleIcons[role.name]}
                <h2 className="text-xs sm:text-xl text-blue-400 font-semibold ml-2">
                  {role.name}
                </h2>
              </div>
              <p className="text-xs sm:text-base text-gray-300 mt-2">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinCommunity;
