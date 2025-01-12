// import { useState, useEffect } from "react";
// import {
//   databases,
//   storage,
//   createGuestSession,
//   WCC_DATABASE_ID,
//   WCC_COLLECTION_ID,
//   WCC_STORAGE_BUCKET_ID,
// } from "../../config/appwrite";
// import { ID } from "appwrite";
// // import ConformationMessage from "../ConformationMessage";
// import { getDatabase, ref, get, set } from "firebase/database";
// import app from "../../firebase";

// const Form = () => {
//   const [formData, setFormData] = useState({
//     studentName: "",
//     rollNo: "",
//     contactNumber: "",
//     email: "",
//     class: "",
//     branch: "",
//     year: "",
//     joinReason: "",
//     role: "",
//     roleReason: "",
//     roleContribution: "",
//     roleExperience: "",
//     otherInformation: "",
//     userPhoto: null,
//     workProofImages: [],

//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const [hasSubmitted, setHasSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkFormSubmission = async () => {
//       const userId = localStorage.getItem("userId");
//       if (!userId) {
//         setError("Please log in to submit the form");
//         setIsLoading(false);
//         return;
//       }

//       const db = getDatabase(app);
//       const userRef = ref(db, `users/${userId}`);

//       try {
//         const snapshot = await get(userRef);
//         if (snapshot.exists() && snapshot.val().hasSubmittedForm) {
//           setHasSubmitted(true);
//         }
//       } catch (error) {
//         console.error("Error checking form submission:", error);
//         setError("Error checking form submission status");
//       }
//       setIsLoading(false);
//     };

//     checkFormSubmission();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 5) {
//       setError("You can only upload up to 5 images");
//       return;
//     }

//     // Check file types and sizes
//     for (const file of files) {
//       if (!file.type.startsWith('image/')) {
//         setError("Please upload only image files");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         setError("Each image must be less than 5MB");
//         return;
//       }
//     }

//     setFormData({
//       ...formData,
//       workProofImages: files
//     });
//   };

//   const handleUserPhotoChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         setError("Please upload only image files");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         setError("The profile photo must be less than 5MB");
//         return;
//       }
//       setFormData({
//         ...formData,
//         userPhoto: file
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess(false);
//     setLoading(true);

//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       setError("Please log in to submit the form");
//       setLoading(false);
//       return;
//     }

//     try {
//       if (
//         !formData.studentName ||
//         !formData.rollNo ||
//         !formData.contactNumber ||
//         !formData.email ||
//         !formData.class ||
//         !formData.branch ||
//         !formData.year ||
//         !formData.role ||
//         !formData.roleReason ||
//         !formData.roleContribution ||
//         !formData.roleExperience ||
//         !formData.otherInformation ||
//         !formData.userPhoto
//       ) {
//         setError("Please fill in all required fields.");
//         return;
//       }

//       await createGuestSession();

//       // Upload user photo first
//       let userPhotoId = null;
//       if (formData.userPhoto) {
//         const fileId = ID.unique();
//         try {
//           await storage.createFile(
//             WCC_STORAGE_BUCKET_ID,
//             fileId,
//             formData.userPhoto
//           );
//           userPhotoId = fileId;
//         } catch (error) {
//           console.error("Error uploading user photo:", error);
//           setError("Failed to upload profile photo");
//           return;
//         }
//       }

//       // Upload work proof images if any
//       const uploadedImageIds = [];
//       if (formData.workProofImages.length > 0) {
//         for (let i = 0; i < formData.workProofImages.length; i++) {
//           const file = formData.workProofImages[i];
//           const fileId = ID.unique();

//           try {
//             await storage.createFile(
//               WCC_STORAGE_BUCKET_ID,
//               fileId,
//               file
//             );
//             uploadedImageIds.push(fileId);

//             setUploadProgress(prev => ({
//               ...prev,
//               [i]: 100
//             }));
//           } catch (error) {
//             console.error(`Error uploading image ${i + 1}:`, error);
//             setError(`Failed to upload image ${i + 1}`);
//             return;
//           }
//         }
//       }

//       const documentData = {
//         userId,
//         studentName: formData.studentName,
//         rollNo: formData.rollNo,
//         contactNumber: formData.contactNumber,
//         email: formData.email,
//         class: formData.class,
//         branch: formData.branch,
//         year: formData.year,
//         role: formData.role,
//         roleReason: formData.roleReason,
//         roleContribution: formData.roleContribution,
//         roleExperience: formData.roleExperience,
//         otherInformation: formData.otherInformation,
//         userPhotoId: userPhotoId,
//         workProofImageIds: uploadedImageIds.join(','),
//         submittedAt: new Date().toISOString(),
//       };

//       console.log("Document data to be sent:", documentData);

//       const response = await databases.createDocument(
//         WCC_DATABASE_ID,
//         WCC_COLLECTION_ID,
//         ID.unique(),
//         documentData
//       );

//       // Update user's data in Firebase to include form submission
//       const db = getDatabase(app);
//       const userRef = ref(db, `users/${userId}`);
//       const userSnapshot = await get(userRef);

//       if (userSnapshot.exists()) {
//         const userData = userSnapshot.val();
//         await set(userRef, {
//           ...userData,
//           hasSubmittedForm: true,
//           formSubmission: {
//             submittedAt: new Date().toISOString(),
//             formData: documentData
//           }
//         });
//       }

//       console.log("Document created successfully:", response);

//       setFormData({
//         studentName: "",
//         rollNo: "",
//         contactNumber: "",
//         email: "",
//         class: "",
//         branch: "",
//         year: "",
//         joinReason: "",
//         role: "",
//         roleReason: "",
//         roleContribution: "",
//         roleExperience: "",
//         otherInformation: "",
//         userPhoto: null,
//         workProofImages: [],
//       });
//       setUploadProgress({});
//       setSuccess(true);
//       setHasSubmitted(true);
//       setTimeout(() => setSuccess(false), 200000);
//     } catch (error) {
//       console.error("Submission error:", error);
//       setError(`Submission failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   if (hasSubmitted) {
//     return (
//       <div className="min-h-fit mt-2">
//         <div className="max-w-4xl mx-auto px-4 py-8">
//           <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-purple-500/20">
//             <div className="text-center">
//               <div className="mb-4">
//                 <svg className="mx-auto h-12 w-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h2 className="text-2xl font-bold text-white mb-4">Form Submitted</h2>
//               <p className="text-gray-300 mb-6">You have already submitted your application form. You can only submit one application.</p>
//               <p className="text-gray-400">If you need to make any changes or have questions, please contact the administrator at <a href="mailto:ganeshxh@gmail.com" className="text-indigo-400 hover:text-indigo-300">ganeshxh@gmail.com</a></p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen mt-2 animate-gradient-x">
//       <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
//         <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl shadow-2xl p-4 sm:p-8 border border-purple-500/20">
//           {error && (
//             <div className="bg-red-500/10 border-l-4 border-red-500 p-4 mb-6 rounded-xl">
//               <p className="text-red-400 text-sm">{error}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Personal Information Section */}
//             <div className="space-y-6">
//               <div className="flex items-center space-x-2 pb-2 border-b border-purple-500/30">
//                 <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-200">
//                   Personal Information
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="group">
//                   <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
//                     Name <span className="text-red-400">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="studentName"
//                     value={formData.studentName}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-800/50 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                     required
//                   />
//                 </div>

//                 <div className="group">
//                   <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
//                     Roll No <span className="text-red-400">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="rollNo"
//                     value={formData.rollNo}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-800/50 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                     required
//                   />
//                 </div>

//                 <div className="group">
//                   <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
//                     Contact Number <span className="text-red-400">*</span>
//                   </label>
//                   <div className="flex">
//                     <span className="inline-flex items-center px-3 py-2 text-xs sm:text-sm bg-gray-800/50 text-gray-300 border border-r-0 border-gray-700 rounded-l-lg">
//                       +91
//                     </span>
//                     <input
//                       type="tel"
//                       name="contactNumber"
//                       value={formData.contactNumber}
//                       onChange={(e) => {
//                         const value = e.target.value.replace(/\D/g, "");
//                         if (value.length <= 10) {
//                           setFormData({
//                             ...formData,
//                             contactNumber: value,
//                           });
//                         }
//                       }}
//                       className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-800/50 text-gray-200 border border-gray-700 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                       required
//                       pattern="[0-9]{10}"
//                       maxLength="10"
//                     />
//                   </div>
//                 </div>

//                 <div className="group">
//                   <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
//                     Email <span className="text-red-400">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-800/50 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                     required
//                   />
//                 </div>

//                 <div className="group">
//                   <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
//                     Class <span className="text-red-400">*</span>
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="class"
//                       value={formData.class}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-800/50 text-gray-200 border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                       required
//                     >
//                       <option value="" className="bg-gray-800">Select Class</option>
//                       {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((cls) => (
//                         <option key={cls} value={cls} className="bg-gray-800">
//                           {cls}
//                         </option>
//                       ))}
//                     </select>
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//                       <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                         <path d="M19 9l-7 7-7-7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="group">
//                   <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
//                     Branch <span className="text-red-400">*</span>
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="branch"
//                       value={formData.branch}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-800/50 text-gray-200 border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                       required
//                     >
//                       <option value="" className="bg-gray-800">Select Branch</option>
//                       <option value="EXTC" className="bg-gray-800">Electronics & Telecommunication</option>
//                       <option value="ME" className="bg-gray-800">Mechanical Engineering</option>
//                       <option value="CSE" className="bg-gray-800">Computer Engineering</option>
//                       <option value="IT" className="bg-gray-800">Information Technology</option>
//                       <option value="IE" className="bg-gray-800">Instrumentation Engineering</option>
//                       <option value="CE" className="bg-gray-800">Chemical Engineering</option>
//                     </select>
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//                       <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                         <path d="M19 9l-7 7-7-7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="group">
//                   <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
//                     Year <span className="text-red-400">*</span>
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="year"
//                       value={formData.year}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-800/50 text-gray-200 border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                       required
//                     >
//                       <option value="" className="bg-gray-800">Select Current Year</option>
//                       {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((year) => (
//                         <option key={year} value={year} className="bg-gray-800">
//                           {year.replace("Year", "").trim()} Year
//                         </option>
//                       ))}
//                     </select>
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//                       <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                         <path d="M19 9l-7 7-7-7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Role Information Section */}
//             <div className="space-y-6">
//               <div className="flex items-center space-x-2 pb-2 border-b border-purple-500/30">
//                 <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-200">
//                   Role Information
//                 </h2>
//               </div>

//               <div className="space-y-6">
//                 <div className="group">
//                   <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
//                     Role <span className="text-red-400">*</span>
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="role"
//                       value={formData.role}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-800/50 text-gray-200 border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                       required
//                     >
//                       <option value="" className="bg-gray-800">Select Role</option>
//                       {[
//                         "Technical Team",
//                         "Photography",
//                         "Content Creation",
//                         "Event Management",
//                         "Marketing",
//                         "Content Writing",
//                         "Web Development",
//                         "App Development",
//                         "UI/UX Design",
//                         "Graphic Design",
//                         "Video Editing",
//                         "Audio Editing",
//                         "Social Media Management",
//                         "Community Management",
//                       ].map((role) => (
//                         <option key={role} value={role} className="bg-gray-800">
//                           {role}
//                         </option>
//                       ))}
//                     </select>
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//                       <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                         <path d="M19 9l-7 7-7-7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {["roleReason", "roleContribution", "roleExperience", "joinReason", "otherInformation"].map((field) => (
//                   <div key={field} className="group">
//                     <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
//                       {field === "roleReason" && "Why do you want to join this role?"}
//                       {field === "roleContribution" && "How can you contribute to this role?"}
//                       {field === "roleExperience" && "Any previous experience in this role?"}
//                       {field === "joinReason" && "Why do you want to join this community?"}
//                       {field === "otherInformation" && "Any other information you want to share?"}
//                       <span className="text-red-400">*</span>
//                     </label>
//                     <textarea
//                       name={field}
//                       value={formData[field]}
//                       onChange={handleChange}
//                       rows="4"
//                       className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-800/50 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                       placeholder="Share your thoughts here..."
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* New User Photo Section */}
//             <div className="group">
//               <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
//                 Profile Photo <span className="text-red-400">*</span>
//               </label>
//               <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
//                    To post on website with your name and role, It will be deleted after application review.
//               </label>
//               <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg hover:border-indigo-500 transition-colors duration-200">
//                 <div className="space-y-1 text-center">
//                   {formData.userPhoto ? (
//                     <div className="relative group">
//                       <img
//                         src={URL.createObjectURL(formData.userPhoto)}
//                         alt="Profile Preview"
//                         className="mx-auto h-32 w-32 object-cover rounded-full border-2 border-indigo-500"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setFormData(prev => ({
//                             ...prev,
//                             userPhoto: null
//                           }));
//                         }}
//                         className="absolute top-0 right-0 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
//                         <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                       <label htmlFor="user-photo-upload" className="relative cursor-pointer rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none">
//                         <span>Upload Profile Photo</span>
//                         <input
//                           id="user-photo-upload"
//                           name="userPhoto"
//                           type="file"
//                           accept="image/*"
//                           onChange={handleUserPhotoChange}
//                           className="sr-only"
//                           required
//                         />
//                       </label>
//                     </>
//                   )}
//                   <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
//                 </div>
//               </div>
//             </div>

//             {/* Work Proof Images Section */}
//             <div className="space-y-6">
//               <div className="flex items-center space-x-2 pb-2 border-b border-gray-700">
//                 <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-200">
//                   Work Proof Images
//                 </h2>
//               </div>

//               <div className="space-y-4">
//                 <div className="group">
//                   <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
//                     Upload images of your previous work (Max 5 images)
//                   </label>
//                   <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg hover:border-indigo-500 transition-colors duration-200">
//                     <div className="space-y-1 text-center">
//                       <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
//                         <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                       <div className="flex text-sm text-gray-400">
//                         <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none">
//                           <span>Upload files</span>
//                           <input
//                             id="file-upload"
//                             name="workProofImages"
//                             type="file"
//                             multiple
//                             accept="image/*"
//                             onChange={handleFileChange}
//                             className="sr-only"
//                           />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                       </div>
//                       <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB each</p>
//                     </div>
//                   </div>
//                   {formData.workProofImages.length > 0 && (
//                     <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
//                       {Array.from(formData.workProofImages).map((file, index) => (
//                         <div key={index} className="relative group">
//                           <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-800/50">
//                             <img
//                               src={URL.createObjectURL(file)}
//                               alt={`Preview ${index + 1}`}
//                               className="object-cover w-full h-full"
//                             />
//                             {uploadProgress[index] !== undefined && (
//                               <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                                 <div className="h-1 w-3/4 bg-gray-700 rounded-full overflow-hidden">
//                                   <div
//                                     className="h-full bg-indigo-500 transition-all duration-300"
//                                     style={{ width: `${uploadProgress[index]}%` }}
//                                   />
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newImages = Array.from(formData.workProofImages);
//                               newImages.splice(index, 1);
//                               setFormData(prev => ({
//                                 ...prev,
//                                 workProofImages: newImages
//                               }));
//                             }}
//                             className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Terms and Submit Section */}
//             <div className="space-y-6">
//               <div className="group">
//                 <label className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
//                   <input
//                     type="checkbox"
//                     name="termsAndConditions"
//                     required
//                     className="w-4 h-4 text-indigo-500 border-gray-700 rounded focus:ring-indigo-500 focus:ring-offset-gray-900"
//                   />
//                   <span className="flex-1">
//                     By submitting this form, I agree to responsibly manage the assigned role and perform all tasks efficiently and diligently if selected. I also acknowledge and consent to pay an entry fee of ₹50 towards the community formation, applicable only upon selection. This amount is refundable and may be returned at a later stage.
//                   </span>
//                 </label>
//               </div>

//               <div>
//                 <button
//                   type={loading ? "button" : "submit"}
//                   disabled={loading}
//                   className={`w-full py-3 px-4 text-sm sm:text-base font-medium rounded-lg shadow-lg transition-all duration-200 ${loading
//                       ? "bg-gray-600 text-gray-300 cursor-not-allowed"
//                       : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl"
//                     }`}
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center space-x-2">
//                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       <span>Submitting...</span>
//                     </div>
//                   ) : (
//                     "Submit Application"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//             {/* {success && <ConformationMessage />} */}
//       </div>
//     </div>
//   );
// };

// export default Form;