// import { Client, Databases, Storage, Account } from 'appwrite';

// const client = new Client()
//     .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
//     .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// const databases = new Databases(client);
// const storage = new Storage(client);
// const account = new Account(client);

// // Create a guest session
// const createGuestSession = async () => {
//     try {
//         // Try to get current session
//         try {
//             await account.get();
//             // If we get here, we already have a valid session
//             return;
//         } catch (error) {
//             // No active session, create a new one
//             await account.createAnonymousSession();
//         }
//     } catch (error) {
//         console.error('Error managing guest session:', error);
//         throw error; // Propagate the error to handle it in the form submission
//     }
// };

// const WCC_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const WCC_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
// const WCC_STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// export { 
//     client, 
//     databases, 
//     storage, 
//     account,
//     createGuestSession,
//     WCC_DATABASE_ID, 
//     WCC_COLLECTION_ID, 
//     WCC_STORAGE_BUCKET_ID 
// }; 