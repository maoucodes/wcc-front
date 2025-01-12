// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, get } from "firebase/database";
// import app from "../../firebase";
// import Navbar from "../../components/Navbar";
// import PointsManager from "../../components/PointsManager";
// import BadgeManager from "../../components/BadgeManager";

// const ManagePoints = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = async () => {
//     try {
//       const db = getDatabase(app);
//       const usersRef = ref(db, "users");
//       const snapshot = await get(usersRef);

//       if (snapshot.exists()) {
//         const usersData = snapshot.val();
//         const usersArray = Object.entries(usersData).map(([id, user]) => ({
//           id,
//           ...user
//         }));
//         setUsers(usersArray);
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <h1 className="text-3xl font-bold text-white mb-8">Manage Users</h1>

//         {/* User Selection */}
//         <div className="mb-8 bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
//           <h2 className="text-xl font-semibold text-white mb-4">Select User</h2>
//           {loading ? (
//             <div className="text-white">Loading users...</div>
//           ) : (
//             <select
//               value={selectedUser?.id || ""}
//               onChange={(e) => {
//                 const user = users.find(u => u.id === e.target.value);
//                 setSelectedUser(user);
//               }}
//               className="w-full px-4 py-2 bg-gray-800 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
//             >
//               <option value="">Select a user</option>
//               {users.map((user) => (
//                 <option key={user.id} value={user.id}>
//                   {user.name} ({user.email})
//                 </option>
//               ))}
//             </select>
//           )}
//         </div>

//         {/* User Management Sections */}
//         {selectedUser && (
//           <div className="space-y-8">
//             {/* User Info */}
//             <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
//               <h2 className="text-xl font-semibold text-white mb-4">Selected User</h2>
//               <div className="text-white">
//                 <p><span className="text-gray-400">Name:</span> {selectedUser.name}</p>
//                 <p><span className="text-gray-400">Email:</span> {selectedUser.email}</p>
//                 <p><span className="text-gray-400">Current Points:</span> {selectedUser.points || 0}</p>
//                 <p><span className="text-gray-400">Recent Points:</span> {selectedUser.recentPoints || "+0"}</p>
//               </div>
//             </div>

//             {/* Points Manager */}
//             <PointsManager userId={selectedUser.id} />

//             {/* Badge Manager */}
//             <BadgeManager 
//               userId={selectedUser.id}
//               currentBadges={selectedUser.badges || []}
//               onBadgeUpdate={fetchUsers}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManagePoints; 