// import React, { useState } from 'react';
// import { addPoints } from '../utils/points';

// const PointsManager = ({ userId }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   // Example function to add points for code contribution
//   const handleCodeContribution = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       await addPoints(userId, 100, "Code contribution");
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Example function to add points for helping others
//   const handleHelpingOthers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       await addPoints(userId, 50, "Helping community members");
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Example function to add points for event attendance
//   const handleEventAttendance = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       await addPoints(userId, 300, "Event attendance");
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Example function to add custom points
//   const handleCustomPoints = async (points, reason) => {
//     try {
//       setLoading(true);
//       setError(null);
//       await addPoints(userId, points, reason);
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
//       <h2 className="text-xl font-semibold text-white mb-6">Add Points</h2>
      
//       {/* Predefined point actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <button
//           onClick={handleCodeContribution}
//           disabled={loading}
//           className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
//         >
//           Add Code Contribution (+100)
//         </button>
        
//         <button
//           onClick={handleHelpingOthers}
//           disabled={loading}
//           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
//         >
//           Add Helping Others (+50)
//         </button>
        
//         <button
//           onClick={handleEventAttendance}
//           disabled={loading}
//           className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
//         >
//           Add Event Attendance (+300)
//         </button>
//       </div>

//       {/* Custom points form */}
//       <div className="mt-6">
//         <h3 className="text-lg font-medium text-white mb-4">Add Custom Points</h3>
//         <form onSubmit={(e) => {
//           e.preventDefault();
//           const points = parseInt(e.target.points.value);
//           const reason = e.target.reason.value;
//           handleCustomPoints(points, reason);
//           e.target.reset();
//         }}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="number"
//               name="points"
//               placeholder="Points"
//               required
//               className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
//             />
//             <input
//               type="text"
//               name="reason"
//               placeholder="Reason"
//               required
//               className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50"
//           >
//             Add Custom Points
//           </button>
//         </form>
//       </div>

//       {/* Status messages */}
//       {loading && (
//         <div className="mt-4 text-blue-400">
//           Adding points...
//         </div>
//       )}
//       {error && (
//         <div className="mt-4 text-red-400">
//           Error: {error}
//         </div>
//       )}
//       {success && (
//         <div className="mt-4 text-green-400">
//           Points added successfully!
//         </div>
//       )}
//     </div>
//   );
// };

// export default PointsManager; 