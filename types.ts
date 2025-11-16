export interface Reward {
  xp: number;
  badge: string;
}

export interface Quest {
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time_minutes: number;
  quest: string;
  proof: 'photo' | 'audio' | 'text';
  reward: Reward;
}

export interface CompletedQuest {
  title: string;
  category: string;
  completedAt: string; // ISO date string
}

export interface QuestApiResponse {
  quests: Quest[];
  daily_message: string;
}

export interface UserInput {
  goals: string[];
  energy: 'Low' | 'Medium' | 'High';
  mood: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface User {
  username: string;
  email: string;
  xp: number;
  streak: number;
  lastQuestDate: string | null; // ISO date string
  weeklyProgress: number[]; // XP for [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
  usernameLastChanged: string | null;
  notificationsEnabled: boolean;
  profilePicture: string | null;
  unlockedBadges: string[]; // Array of badge IDs
  questStats: {
    totalQuests: number;
    categories: { [category: string]: number };
  };
  questHistory: CompletedQuest[];
}

export interface LeaderboardEntry {
    username: string;
    xp: number;
}