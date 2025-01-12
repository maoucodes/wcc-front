import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiAward, FiStar, FiTrendingUp, FiCode, FiGithub, FiLinkedin } from "react-icons/fi";
import { IoRocketOutline } from "react-icons/io5";
import Navbar from "../components/Navbar";
import { getDatabase, ref, get } from "firebase/database";
import app from "../firebase";
import UserProfileModal from '../components/UserProfileModal';

const LeaderBoard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const db = getDatabase(app);
        const usersRef = ref(db, "users");
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const usersArray = Object.entries(usersData).map(([id, user]) => ({
            id,
            ...user,
            points: user.points || 0,
            contributions: user.contributions || 0,
            badges: user.badges || [],
            avatar: user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U',
            recentPoints: user.recentPoints || "+0",
          }));

          const sortedUsers = usersArray.sort((a, b) => b.points - a.points);
          const rankedUsers = sortedUsers.map((user, index) => ({
            ...user,
            rank: index + 1
          }));

          setAllUsers(rankedUsers);
        } else {
          setAllUsers([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // Use top 3 performers from allUsers
  const topPerformers = allUsers.slice(0, 3);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-red-500">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 mb-4"
          >
            Community Leaderboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-lg"
          >
            Recognizing our top contributors and active community members
          </motion.p>
        </div>

        {allUsers.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No users found. Be the first to join!
          </div>
        ) : (
          <>
            {/* Top 3 Performers */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {topPerformers.map((performer, index) => (
                <motion.div
                  key={performer.id}
                  variants={fadeInUp}
                  className="relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => handleUserClick(performer)}
                >
                  {/* Rank Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                        ? "bg-gray-400"
                        : "bg-orange-600"
                    }`}>
                      <FiAward className="text-white" />
                    </div>
                  </div>

                  {/* Profile Section */}
                  <div className="text-center mt-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white mb-4">
                      {performer.avatar}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{performer.name}</h3>
                    <div className="text-sm text-gray-400 mb-2">
                      {performer.branch && <span>{performer.branch}</span>}
                      {performer.branch && performer.year && <span> • </span>}
                      {performer.year && <span>{performer.year}</span>}
                    </div>
                    <div className="flex justify-center space-x-4 mb-4">
                      {performer.github && (
                        <a
                          href={performer.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <FiGithub size={20} />
                        </a>
                      )}
                      {performer.linkedin && (
                        <a
                          href={performer.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <FiLinkedin size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Points</span>
                      <span className="text-yellow-400 font-semibold">{performer.points}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Contributions</span>
                      <span className="text-blue-400 font-semibold">{performer.contributions}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {performer.badges && performer.badges.map((badge, badgeIndex) => (
                        <span
                          key={badgeIndex}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs flex items-center"
                        >
                          <FiStar className="mr-1" />
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* All Users Rankings */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
             >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <FiTrendingUp className="mr-2" />
                  All Rankings
                </h2>
                <div className="space-y-4">
                  {allUsers.slice(3).map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5 hover:border-purple-500/30 cursor-pointer"
                      onClick={() => handleUserClick(user)}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-400 font-mono w-6">{user.rank}</span>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {user.avatar}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{user.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            {user.branch && <span>{user.branch}</span>}
                            {user.branch && user.year && <span>•</span>}
                            {user.year && <span>{user.year}</span>}
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <p className="text-sm text-gray-400">{user.points} points</p>
                            <p className="text-sm text-gray-400">{user.contributions} contributions</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                          {user.github && (
                            <a
                              href={user.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <FiGithub size={16} />
                            </a>
                          )}
                          {user.linkedin && (
                            <a
                              href={user.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <FiLinkedin size={16} />
                            </a>
                          )}
                        </div>
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                          {user.recentPoints}
                        </span>
                        <IoRocketOutline className="text-purple-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* How to Earn Points Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <FiCode className="mr-2" />
            How to Earn Points
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Code Contributions",
                description: "Submit pull requests and contribute to projects",
                points: "+100 points",
              },
              {
                title: "Help Others",
                description: "Answer questions and help community members",
                points: "+50 points",
              },
              {
                title: "Attend Events",
                description: "Participate in community events and workshops",
                points: "+300 points",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                <span className="text-green-400 font-semibold">{item.points}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default LeaderBoard; 