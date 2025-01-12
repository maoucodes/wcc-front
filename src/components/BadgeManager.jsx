// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { addBadge, removeBadge, BADGE_TYPES } from '../utils/badges';

// const BadgeManager = ({ userId, currentBadges = [], onBadgeUpdate }) => {
//   const [selectedBadge, setSelectedBadge] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleAddBadge = async () => {
//     if (!selectedBadge) return;
    
//     setLoading(true);
//     setError(null);
//     setSuccess(null);
    
//     try {
//       await addBadge(userId, selectedBadge);
//       setSuccess(`Successfully added ${selectedBadge} badge`);
//       setSelectedBadge('');
//       if (onBadgeUpdate) onBadgeUpdate();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveBadge = async (badge) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);
    
//     try {
//       await removeBadge(userId, badge);
//       setSuccess(`Successfully removed ${badge} badge`);
//       if (onBadgeUpdate) onBadgeUpdate();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
//       <h2 className="text-xl font-semibold text-white mb-4">Manage Badges</h2>
      
//       {/* Current Badges */}
//       <div className="mb-6">
//         <h3 className="text-lg text-white mb-2">Current Badges</h3>
//         <div className="flex flex-wrap gap-2">
//           {currentBadges.length === 0 ? (
//             <p className="text-gray-400">No badges assigned</p>
//           ) : (
//             currentBadges.map((badge) => (
//               <div
//                 key={badge}
//                 className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full"
//               >
//                 <span className="text-white">{badge}</span>
//                 <button
//                   onClick={() => handleRemoveBadge(badge)}
//                   disabled={loading}
//                   className="text-red-400 hover:text-red-300 disabled:opacity-50"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Add Badge Form */}
//       <div className="flex gap-4">
//         <select
//           value={selectedBadge}
//           onChange={(e) => setSelectedBadge(e.target.value)}
//           disabled={loading}
//           className="flex-1 px-4 py-2 bg-gray-800 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
//         >
//           <option value="">Select a badge</option>
//           {Object.values(BADGE_TYPES).map((badge) => (
//             <option key={badge} value={badge}>
//               {badge}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={handleAddBadge}
//           disabled={!selectedBadge || loading}
//           className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
//         >
//           Add Badge
//         </button>
//       </div>

//       {/* Status Messages */}
//       {error && (
//         <p className="mt-4 text-red-400">{error}</p>
//       )}
//       {success && (
//         <p className="mt-4 text-green-400">{success}</p>
//       )}
//     </div>
//   );
// };

// BadgeManager.propTypes = {
//   userId: PropTypes.string.isRequired,
//   currentBadges: PropTypes.arrayOf(PropTypes.string),
//   onBadgeUpdate: PropTypes.func
// };

// export default BadgeManager; 