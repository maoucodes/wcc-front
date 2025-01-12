// import { Client, Account, Databases, ID } from 'appwrite';

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('67694238003d3153dae2');

// export const account = new Account(client);
// export const databases = new Databases(client);

// // Database Collections
// export const USERS_DATABASE_ID = '676bc5ee0014963e41b8';
// export const USERS_COLLECTION_ID = '676bc60000216b4224cb';

// // Auth Helper Functions
// export const createAccount = async (email, password, username, studyYear, branch, classValue) => {
//     const maxRetries = 3;
//     let attempt = 0;

//     while (attempt < maxRetries) {
//         try {
//             // Create account in Appwrite Authentication
//             const accountResponse = await account.create(
//                 ID.unique(),
//                 email,
//                 password,
//                 username
//             );

//             // After successful account creation, create user document
//             if (accountResponse) {
//                 await createUserDocument(accountResponse.$id, {
//                     username: username,
//                     email: email,
//                     branch: branch,
//                     studyYear: studyYear,
//                     class: classValue
//                 });
//             }

//             return accountResponse;
//         } catch (error) {
//             if (error.code === 429) { // Rate limit error
//                 attempt++;
//                 const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
//                 console.log(`Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`);
//                 await new Promise(resolve => setTimeout(resolve, waitTime));
//             } else {
//                 console.error('Error creating account:', error);
//                 throw new Error(error.message || 'Failed to create account. Please try again.');
//             }
//         }
//     }

//     throw new Error('Max retries reached. Please try again later.');
// };

// export const login = async (email, password) => {
//     try {
//         // Create a session with the provided email and password
//         const session = await account.createEmailSession(email, password);

//         // Fetch user data
//         const user = await account.get(); // This retrieves the current user's data

//         return { session, user }; // Return session and user data
//     } catch (error) {
//         console.error("Login error:", error);
//         throw error; // Rethrow the error for handling in the component
//     }
// };

// export const getCurrentUser = async () => {
//     try {
//         const user = await account.get();
//         if (user) {
//             try {
//                 // Get additional user data from database
//                 const userData = await getUserDocument(user.$id);
//                 return { ...user, ...userData };
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//                 return user;
//             }
//         }
//         return null;
//     } catch (error) {
//         console.error('Error getting current user:', error);
//         return null;
//     }
// };

// export const logout = async () => {
//     try {
//         await account.deleteSession('current');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('isLoggedIn');
//         localStorage.removeItem('userData');
//     } catch (error) {
//         console.error('Error during logout:', error);
//         throw new Error('Failed to logout. Please try again.');
//     }
// };

// // Database Helper Functions
// export const createUserDocument = async (userId, userData) => {
//     try {
//         const response = await databases.createDocument(
//             USERS_DATABASE_ID,
//             USERS_COLLECTION_ID,
//             userId,
//             userData
//         );
//         return response;
//     } catch (error) {
//         console.error('Error creating user document:', error);
//         throw error;
//     }
// };

// export const getUserDocument = async (userId) => {
//     try {
//         const response = await databases.getDocument(
//             USERS_DATABASE_ID,
//             USERS_COLLECTION_ID,
//             userId
//         );
//         return response;
//     } catch (error) {
//         console.error('Error getting user document:', error);
//         if (error.code === 404) {
//             throw new Error('User profile not found.');
//         }
//         throw error;
//     }
// };

// export const updateUserDocument = async (userId, userData) => {
//     try {
//         const response = await databases.updateDocument(
//             USERS_DATABASE_ID,
//             USERS_COLLECTION_ID,
//             userId,
//             {
//                 ...userData,
//                 updated_at: new Date().toISOString()
//             }
//         );
//         return response;
//     } catch (error) {
//         console.error('Error updating user document:', error);
//         throw error;
//     }
// };

// export { client, ID };
