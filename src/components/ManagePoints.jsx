// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { getDatabase, ref, get, update } from "firebase/database";
// import app from "../firebase";

// const ManagePoints = ({ userId, onPointsUpdate }) => {
//   const [customPoints, setCustomPoints] = useState('');
//   const [customReason, setCustomReason] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleAddPoints = async (points, reason) => {
//     if (!userId || !points || !reason) return;
    
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const db = getDatabase(app);
//       const userRef = ref(db, `users/${userId}`);
//       const snapshot = await get(userRef);

//       if (!snapshot.exists()) {
//         throw new Error("User not found");
//       }

//       const userData = snapshot.val();
//       const currentPoints = userData.points || 0;
//       const newPoints = currentPoints + parseInt(points);

//       // Update user's points and recent points
//       await update(userRef, {
//         points: newPoints,
//         recentPoints: `+${points}`,
//         lastPointsUpdate: {
//           amount: points,
//           reason: reason,
//           timestamp: Date.now()
//         }
//       });

//       setSuccess(`Successfully added ${points} points for ${reason}`);
//       if (onPointsUpdate) onPointsUpdate();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCustomPoints = async () => {
//     if (!customPoints || !customReason) return;
//     await handleAddPoints(parseInt(customPoints), customReason);
//     setCustomPoints('');
//     setCustomReason('');
//   };

//   return (
//     <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
//       <h2 className="text-xl font-semibold text-white mb-4">Manage Points</h2>
      
//       {/* Predefined Points Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <button
//           onClick={() => handleAddPoints(100, "Code contribution")}
//           disabled={loading}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
//         >
//           Add Code Contribution
//           <span className="block text-sm text-blue-200">+100 points</span>
//         </button>
        
//         <button
//           onClick={() => handleAddPoints(50, "Helping others")}
//           disabled={loading}
//           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
//         >
//           Add Help Contribution
//           <span className="block text-sm text-green-200">+50 points</span>
//         </button>
        
//         <button
//           onClick={() => handleAddPoints(30, "Event attendance")}
//           disabled={loading}
//           className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
//         >
//           Add Event Attendance
//           <span className="block text-sm text-purple-200">+30 points</span>
//         </button>
//       </div>

//       {/* Custom Points Form */}
//       <div className="space-y-4">
//         <h3 className="text-lg text-white">Add Custom Points</h3>
//         <div className="flex gap-4">
//           <input
//             type="number"
//             value={customPoints}
//             onChange={(e) => setCustomPoints(e.target.value)}
//             placeholder="Enter points"
//             disabled={loading}
//             className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
//           />
//           <input
//             type="text"
//             value={customReason}
//             onChange={(e) => setCustomReason(e.target.value)}
//             placeholder="Enter reason"
//             disabled={loading}
//             className="flex-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
//           />
//           <button
//             onClick={handleCustomPoints}
//             disabled={!customPoints || !customReason || loading}
//             className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
//           >
//             Add Points
//           </button>
//         </div>
//       </div>

//       {/* Status Messages */}
//       {error && (
//         <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
//           {error}
//         </div>
//       )}
//       {success && (
//         <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
//           {success}
//         </div>
//       )}

//       {/* Loading Indicator */}
//       {loading && (
//         <div className="mt-4 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// ManagePoints.propTypes = {
//   userId: PropTypes.string.isRequired,
//   onPointsUpdate: PropTypes.func
// };

// export default ManagePoints; 