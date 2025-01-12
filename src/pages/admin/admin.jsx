// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, get } from "firebase/database";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from 'react-router-dom';
// import app from "../../firebase";
// import Navbar from "../../components/Navbar";
// import ManagePoints from "../../components/ManagePoints";
// import BadgeManager from "../../components/BadgeManager";

// // define admin emails - replace with your admin emails
// const ADMIN_EMAILS = [
//   'ganeshxh@gmail.com',
//   // Add more admin emails here
// ];

// const AdminPage = () => {
//   const [activeTab, setActiveTab] = useState('users');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();
//   const auth = getAuth(app);

//   useEffect(() => {
//     const checkAdminStatus = async (user) => {
//       if (!user) {
//         console.log("No user found, redirecting to signin");
//         navigate('/signin');
//         return false;
//       }

//       try {
//         // Method 1: Check if user's email is in admin list
//         if (ADMIN_EMAILS.includes(user.email)) {
//           console.log("User is admin by email");
//           return true;
//         }

//         // Method 2: Check admin status in Firebase database
//         const db = getDatabase(app);
//         const userRef = ref(db, `users/${user.uid}`);
//         const snapshot = await get(userRef);

//         if (!snapshot.exists()) {
//           console.log("User data not found");
//           navigate('/');
//           return false;
//         }

//         const userData = snapshot.val();
        
//         // Check multiple conditions for admin status
//         const isAdminByRole = userData.role === 'admin';
//         const hasAdminBadge = Array.isArray(userData.badges) && userData.badges.includes('Admin');
//         const isAdminByFlag = userData.isAdmin === true;

//         const isUserAdmin = isAdminByRole || hasAdminBadge || isAdminByFlag;
        
//         console.log("Admin status check:", {
//           byRole: isAdminByRole,
//           byBadge: hasAdminBadge,
//           byFlag: isAdminByFlag,
//           final: isUserAdmin
//         });

//         if (!isUserAdmin) {
//           console.log("User is not an admin");
//           navigate('/');
//           return false;
//         }

//         return true;
//       } catch (error) {
//         console.error("Error checking admin status:", error);
//         navigate('/');
//         return false;
//       }
//     };

//     const setupAdminCheck = async () => {
//       setLoading(true);
//       const unsubscribe = onAuthStateChanged(auth, async (user) => {
//         const adminStatus = await checkAdminStatus(user);
//         setIsAdmin(adminStatus);
//         if (adminStatus) {
//           await fetchUsers();
//         }
//         setLoading(false);
//       });

//       return unsubscribe;
//     };

//     setupAdminCheck();
//   }, [auth, navigate]);

//   const fetchUsers = async () => {
//     try {
//       const db = getDatabase(app);
//       const usersRef = ref(db, "users");
//       const snapshot = await get(usersRef);

//       if (snapshot.exists()) {
//         const usersData = snapshot.val();
//         const usersArray = Object.entries(usersData).map(([id, user]) => ({
//           id,
//           ...user,
//           isAdmin: user.role === 'admin' || 
//                   (Array.isArray(user.badges) && user.badges.includes('Admin')) || 
//                   user.isAdmin === true
//         }));
//         setUsers(usersArray);
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setError("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const tabs = [
//     { id: 'users', name: 'Manage Users' },
//     { id: 'events', name: 'Manage Events' },
//     { id: 'content', name: 'Manage Content' },
//     { id: 'settings', name: 'Settings' }
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="text-center text-white">
//             <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
//             <p>You do not have administrator privileges.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

//         {/* Tabs */}
//         <div className="border-b border-white/10 mb-8">
//           <nav className="-mb-px flex space-x-8">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`
//                   py-4 px-1 border-b-2 font-medium text-sm
//                   ${activeTab === tab.id
//                     ? 'border-purple-500 text-purple-500'
//                     : 'border-transparent text-gray-400 hover:text-white hover:border-white/30'}
//                 `}
//               >
//                 {tab.name}
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Tab Content */}
//         <div className="space-y-8">
//           {activeTab === 'users' && (
//             <>
//               {/* User Selection */}
//               <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
//                 <h2 className="text-xl font-semibold text-white mb-4">Select User to Manage</h2>
//                 <select
//                   value={selectedUser?.id || ""}
//                   onChange={(e) => {
//                     const user = users.find(u => u.id === e.target.value);
//                     setSelectedUser(user);
//                   }}
//                   className="w-full px-4 py-2 bg-gray-800 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
//                 >
//                   <option value="">Select a user</option>
//                   {users.map((user) => (
//                     <option key={user.id} value={user.id}>
//                       {user.name} ({user.email})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* User Management */}
//               {selectedUser && (
//                 <div className="space-y-8">
//                   {/* User Info */}
//                   <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
//                     <h2 className="text-xl font-semibold text-white mb-4">Selected User</h2>
//                     <div className="text-white">
//                       <p><span className="text-gray-400">Name:</span> {selectedUser.name}</p>
//                       <p><span className="text-gray-400">Email:</span> {selectedUser.email}</p>
//                       <p><span className="text-gray-400">Current Points:</span> {selectedUser.points || 0}</p>
//                       <p><span className="text-gray-400">Recent Points:</span> {selectedUser.recentPoints || "+0"}</p>
//                       <div className="mt-4">
//                         <span className="text-gray-400">Current Badges:</span>
//                         <div className="flex flex-wrap gap-2 mt-2">
//                           {selectedUser.badges?.map((badge, index) => (
//                             <span
//                               key={index}
//                               className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
//                             >
//                               {badge}
//                             </span>
//                           )) || <span className="text-gray-400">No badges</span>}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Points Manager */}
//                   <ManagePoints userId={selectedUser.id} onPointsUpdate={fetchUsers} />

//                   {/* Badge Manager */}
//                   <BadgeManager 
//                     userId={selectedUser.id}
//                     currentBadges={selectedUser.badges || []}
//                     onBadgeUpdate={fetchUsers}
//                   />
//                 </div>
//               )}
//             </>
//           )}

//           {activeTab === 'events' && (
//             <div className="text-white">Events management coming soon...</div>
//           )}

//           {activeTab === 'content' && (
//             <div className="text-white">Content management coming soon...</div>
//           )}

//           {activeTab === 'settings' && (
//             <div className="text-white">Settings coming soon...</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
