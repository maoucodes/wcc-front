import { getDatabase, ref, get, update } from "firebase/database";
import app from "../firebase";

export const BADGE_TYPES = {
  ADMIN: "Admin",
  MEMBER: "Member",
  CONTRIBUTOR: "Contributor",
  MODERATOR: "Moderator",
  HELPER: "Helper",
  EXPERT: "Expert",
  MENTOR: "Mentor",
  CHAMPION: "Champion",
  HEAD: "Community Head"
};

export const addBadge = async (userId, badge) => {
  if (!userId || !badge) {
    throw new Error("User ID and badge are required");
  }

  const db = getDatabase(app);
  const userRef = ref(db, `users/${userId}`);

  try {
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      throw new Error("User not found");
    }

    const userData = snapshot.val();
    const currentBadges = userData.badges || [];

    // Check if user already has this badge
    if (currentBadges.includes(badge)) {
      throw new Error("User already has this badge");
    }

    // Add the new badge
    const updatedBadges = [...currentBadges, badge];

    // Update the user's badges in the database
    await update(userRef, {
      badges: updatedBadges
    });

  } catch (error) {
    console.error("Error adding badge:", error);
    throw error;
  }
};

export const removeBadge = async (userId, badge) => {
  if (!userId || !badge) {
    throw new Error("User ID and badge are required");
  }

  const db = getDatabase(app);
  const userRef = ref(db, `users/${userId}`);

  try {
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      throw new Error("User not found");
    }

    const userData = snapshot.val();
    const currentBadges = userData.badges || [];

    // Check if user has this badge
    if (!currentBadges.includes(badge)) {
      throw new Error("User does not have this badge");
    }

    // Remove the badge
    const updatedBadges = currentBadges.filter(b => b !== badge);

    // Update the user's badges in the database
    await update(userRef, {
      badges: updatedBadges
    });

  } catch (error) {
    console.error("Error removing badge:", error);
    throw error;
  }
}; 