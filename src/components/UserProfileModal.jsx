// import React from 'react';
// import { FiX, FiAward, FiGithub, FiLinkedin, FiStar } from 'react-icons/fi';

// const UserProfileModal = ({ user, onClose }) => {
//   if (!user) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
//         {/* Header */}
//         <div className="sticky top-0 bg-gradient-to-br from-slate-900 to-blue-900 p-4 border-b border-white/10 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-white">User Profile</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             <FiX size={24} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* Profile Header */}
//           <div className="text-center mb-6">
//             <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white mb-4">
//               {user.avatar}
//             </div>
//             <h3 className="text-2xl font-semibold text-white mb-2">{user.name}</h3>
//             <div className="text-sm text-gray-400 mb-4">
//               {user.branch && <span>{user.branch}</span>}
//               {user.branch && user.year && <span> • </span>}
//               {user.year && <span>{user.year}</span>}
//             </div>
//             <div className="flex justify-center space-x-4">
//               {user.github && (
//                 <a
//                   href={user.github}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   <FiGithub size={20} />
//                 </a>
//               )}
//               {user.linkedin && (
//                 <a
//                   href={user.linkedin}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   <FiLinkedin size={20} />
//                 </a>
//               )}
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <div className="bg-white/5 rounded-lg p-4 text-center">
//               <div className="text-2xl font-bold text-yellow-400 mb-1">{user.points}</div>
//               <div className="text-sm text-gray-400">Total Points</div>
//             </div>
//             <div className="bg-white/5 rounded-lg p-4 text-center">
//               <div className="text-2xl font-bold text-blue-400 mb-1">{user.contributions}</div>
//               <div className="text-sm text-gray-400">Contributions</div>
//             </div>
//           </div>

//           {/* Recent Points */}
//           <div className="bg-white/5 rounded-lg p-4 mb-6">
//             <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
//               <FiAward className="mr-2" />
//               Recent Activity
//             </h4>
//             <div className="text-green-400 font-semibold">{user.recentPoints}</div>
//           </div>

//           {/* Badges */}
//           {user.badges && user.badges.length > 0 && (
//             <div className="bg-white/5 rounded-lg p-4">
//               <h4 className="text-lg font-semibold text-white mb-2">Badges</h4>
//               <div className="flex flex-wrap gap-2">
//                 {user.badges.map((badge, index) => (
//                   <span
//                     key={index}
//                     className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs flex items-center"
//                   >
//                     <FiStar className="mr-1" />
//                     {badge}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Points History */}
//           {user.pointsHistory && user.pointsHistory.length > 0 && (
//             <div className="mt-6">
//               <h4 className="text-lg font-semibold text-white mb-4">Points History</h4>
//               <div className="space-y-3">
//                 {user.pointsHistory.map((record, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
//                   >
//                     <div>
//                       <p className="text-white">{record.reason}</p>
//                       <p className="text-sm text-gray-400">
//                         {new Date(record.timestamp).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div className={`font-semibold ${record.points >= 0 ? 'text-green-400' : 'text-red-400'}`}>
//                       {record.points >= 0 ? '+' : ''}{record.points}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfileModal; 