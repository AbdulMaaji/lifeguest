import { User, Badge } from '../types';

// The master list of all badges in the game.
export const allBadges: Badge[] = [
  // Easy Badges
  { id: 'first_quest', name: 'First Step', description: 'Complete your very first quest.', difficulty: 'Easy' },
  { id: 'fitness_1', name: 'Fitness Novice', description: 'Complete 1 Fitness quest.', difficulty: 'Easy' },
  { id: 'learning_1', name: 'Learning Novice', description: 'Complete 1 Learning quest.', difficulty: 'Easy' },
  { id: 'social_1', name: 'Social Novice', description: 'Complete 1 Social quest.', difficulty: 'Easy' },
  { id: 'streak_3', name: 'On a Roll', description: 'Achieve a 3-day streak.', difficulty: 'Easy' },
  
  // Medium Badges
  { id: 'total_10', name: 'Quest Apprentice', description: 'Complete 10 total quests.', difficulty: 'Medium' },
  { id: 'fitness_5', name: 'Fitness Adept', description: 'Complete 5 Fitness quests.', difficulty: 'Medium' },
  { id: 'learning_5', name: 'Learning Adept', description: 'Complete 5 Learning quests.', difficulty: 'Medium' },
  { id: 'wellness_5', name: 'Wellness Adept', description: 'Complete 5 Wellness quests.', difficulty: 'Medium' },
  { id: 'streak_7', name: 'Week-Long Warrior', description: 'Achieve a 7-day streak.', difficulty: 'Medium' },
  
  // Hard Badges
  { id: 'total_25', name: 'Quest Master', description: 'Complete 25 total quests.', difficulty: 'Hard' },
  { id: 'all_categories_1', name: 'Jack of All Trades', description: 'Complete at least one quest in 5 different categories.', difficulty: 'Hard' },
  { id: 'streak_14', name: 'Unstoppable Force', description: 'Achieve a 14-day streak.', difficulty: 'Hard' },
];

type CriteriaChecker = (user: User) => boolean;

// A map of badge IDs to their unlock criteria functions.
const badgeCriteria: Record<string, CriteriaChecker> = {
  first_quest: (user) => user.questStats.totalQuests >= 1,
  fitness_1: (user) => (user.questStats.categories['Fitness'] || 0) >= 1,
  learning_1: (user) => (user.questStats.categories['Learning'] || 0) >= 1,
  social_1: (user) => (user.questStats.categories['Social'] || 0) >= 1,
  streak_3: (user) => user.streak >= 3,
  
  total_10: (user) => user.questStats.totalQuests >= 10,
  fitness_5: (user) => (user.questStats.categories['Fitness'] || 0) >= 5,
  learning_5: (user) => (user.questStats.categories['Learning'] || 0) >= 5,
  wellness_5: (user) => (user.questStats.categories['Wellness'] || 0) >= 5,
  streak_7: (user) => user.streak >= 7,
  
  total_25: (user) => user.questStats.totalQuests >= 25,
  all_categories_1: (user) => Object.keys(user.questStats.categories).length >= 5,
  streak_14: (user) => user.streak >= 14,
};


/**
 * Checks the user's stats against all badges and awards new ones if criteria are met.
 * @param user The user object to check.
 * @returns An object containing the updated user and an array of newly awarded badges.
 */
export const checkAndAwardBadges = (user: User): { updatedUser: User, newBadges: Badge[] } => {
  const newBadges: Badge[] = [];
  
  for (const badge of allBadges) {
    // Check if user already has this badge
    if (!user.unlockedBadges.includes(badge.id)) {
      const criteriaMet = badgeCriteria[badge.id]?.(user) ?? false;
      
      if (criteriaMet) {
        user.unlockedBadges.push(badge.id);
        newBadges.push(badge);
      }
    }
  }
  
  return { updatedUser: user, newBadges };
};