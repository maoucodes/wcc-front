import { getDatabase, ref, get, update } from "firebase/database";
import app from "../firebase";

const db = getDatabase(app);

/**
 * Add points to a user's account
 * @param {string} userId - The ID of the user
 * @param {number} points - The number of points to add
 * @param {string} reason - The reason for adding points
 * @returns {Promise<void>}
 */
export const addPoints = async (userId, points, reason) => {
  try {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      const currentPoints = userData.points || 0;
      const currentRecentPoints = parseInt(userData.recentPoints?.replace("+", "") || "0");
      
      // Update user data with new points
      await update(userRef, {
        points: currentPoints + points,
        recentPoints: `+${currentRecentPoints + points}`,
        pointsHistory: [
          ...(userData.pointsHistory || []),
          {
            points,
            reason,
            timestamp: new Date().toISOString()
          }
        ]
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error adding points:", error);
    throw error;
  }
};

/**
 * Get a user's points
 * @param {string} userId - The ID of the user
 * @returns {Promise<{points: number, recentPoints: string, pointsHistory: Array}>}
 */
export const getUserPoints = async (userId) => {
  try {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      return {
        points: userData.points || 0,
        recentPoints: userData.recentPoints || "+0",
        pointsHistory: userData.pointsHistory || []
      };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error getting user points:", error);
    throw error;
  }
}; 