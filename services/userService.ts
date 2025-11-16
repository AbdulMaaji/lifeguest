import { User, LeaderboardEntry, Quest, Badge, CompletedQuest } from '../types';
import { mockLeaderboard } from './mockData';
import { checkAndAwardBadges } from './badgeService';

const USERS_DB_KEY = 'lifequests_users_db';
const CURRENT_USER_EMAIL_KEY = 'lifequests_current_user_email';

// --- Helper Functions ---
const getUsers = (): { [email: string]: User } => {
    const usersJson = localStorage.getItem(USERS_DB_KEY);
    return usersJson ? JSON.parse(usersJson) : {};
};

const saveUsers = (users: { [email: string]: User }) => {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
};

const getWeekStartDate = (d: Date): string => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day;
    const weekStart = new Date(date.setDate(diff));
    return weekStart.toISOString().split('T')[0];
};

// --- User Management ---

export const isUsernameAvailable = (username: string, currentEmail?: string): boolean => {
    if (!username) return true;
    const users = getUsers();
    const normalizedUsername = username.toLowerCase();
    return !Object.values(users).some(user => 
        user.username.toLowerCase() === normalizedUsername && user.email !== currentEmail
    );
};

export const getCurrentUser = (): User | null => {
    const currentUserEmail = localStorage.getItem(CURRENT_USER_EMAIL_KEY);
    if (!currentUserEmail) return null;
    
    const users = getUsers();
    return users[currentUserEmail] || null;
};

export const signupUser = (email: string, username: string, profilePicture: string | null = null): User => {
    const users = getUsers();
    if (users[email]) {
        throw new Error("An account with this email already exists.");
    }

    if (!isUsernameAvailable(username)) {
        throw new Error("This username is already taken. Please choose another one.");
    }

    const newUser: User = {
        username,
        email,
        xp: 0,
        streak: 0,
        lastQuestDate: null,
        weeklyProgress: Array(7).fill(0),
        usernameLastChanged: new Date().toISOString(), // Set on creation
        notificationsEnabled: true,
        profilePicture,
        unlockedBadges: [],
        questStats: {
            totalQuests: 0,
            categories: {},
        },
        questHistory: [],
    };

    users[email] = newUser;
    saveUsers(users);
    localStorage.setItem(CURRENT_USER_EMAIL_KEY, email);
    
    return newUser;
};


export const loginUser = (email: string): User => {
    const users = getUsers();
    const user = users[email];

    if (!user) {
        throw new Error("No account found with this email. Please sign up.");
    }
    
    // Check if it's a new week and reset progress if needed
    const today = new Date();
    if (user.lastQuestDate) {
        const lastDate = new Date(user.lastQuestDate);
        if (getWeekStartDate(today) !== getWeekStartDate(lastDate)) {
            user.weeklyProgress = Array(7).fill(0);
        }
    }

    users[email] = user;
    saveUsers(users);
    localStorage.setItem(CURRENT_USER_EMAIL_KEY, email);
    return user;
};

export const doesUserExist = (email: string): boolean => {
    const users = getUsers();
    return !!users[email];
};

export const logoutUser = () => {
    localStorage.removeItem(CURRENT_USER_EMAIL_KEY);
};

export const updateUser = (user: User) => {
    const users = getUsers();
    if (users[user.email]) {
        users[user.email] = user;
        saveUsers(users);
    }
};

// --- Quest & Progress Management ---

export const completeQuest = (quest: Quest): { updatedUser: User, newBadges: Badge[] } => {
    const user = getCurrentUser();
    if (!user) throw new Error("No user logged in");

    // Ensure legacy users have the new fields
    if (!user.weeklyProgress) user.weeklyProgress = Array(7).fill(0);
    if (!user.questStats) user.questStats = { totalQuests: 0, categories: {} };
    if (!user.questStats.categories) user.questStats.categories = {};
    if (!user.unlockedBadges) user.unlockedBadges = [];
    if (!user.questHistory) user.questHistory = [];
    
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];
    const todayDate = new Date(todayISO);
    
    if (user.lastQuestDate) {
        const lastDate = new Date(user.lastQuestDate);
        if (getWeekStartDate(todayDate) !== getWeekStartDate(lastDate)) {
            user.weeklyProgress = Array(7).fill(0);
        }
    }
    const dayOfWeek = todayDate.getDay();
    user.weeklyProgress[dayOfWeek] = (user.weeklyProgress[dayOfWeek] || 0) + quest.reward.xp;

    if (user.lastQuestDate) {
        const lastDate = new Date(user.lastQuestDate);
        const diffTime = todayDate.getTime() - lastDate.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24);

        if (diffDays === 1) {
            user.streak += 1;
        } else if (diffDays > 1) {
            user.streak = 1;
        }
    } else {
        user.streak = 1;
    }
    
    user.xp += quest.reward.xp;
    user.lastQuestDate = todayISO;

    // --- Update Quest Stats ---
    user.questStats.totalQuests = (user.questStats.totalQuests || 0) + 1;
    user.questStats.categories[quest.category] = (user.questStats.categories[quest.category] || 0) + 1;

    // --- Add to History ---
    const completedQuestEntry: CompletedQuest = {
        title: quest.title,
        category: quest.category,
        completedAt: new Date().toISOString(),
    };
    user.questHistory.push(completedQuestEntry);

    // --- Check for Badges ---
    const { updatedUser, newBadges } = checkAndAwardBadges(user);
    
    updateUser(updatedUser);
    return { updatedUser, newBadges };
};


// --- Leaderboard Management ---

export const getLeaderboard = (): LeaderboardEntry[] => {
    const users = Object.values(getUsers());

    // If there are no registered users, return the mock data.
    if (users.length === 0) {
        return mockLeaderboard.sort((a, b) => b.xp - a.xp);
    }

    const leaderboard: LeaderboardEntry[] = users.map(user => ({
        username: user.username,
        xp: user.xp,
    }));

    // Sort by XP descending
    leaderboard.sort((a, b) => b.xp - a.xp);

    return leaderboard;
};


// --- Profile Management ---
export const updateUsername = (newUsername: string): User => {
    const user = getCurrentUser();
    if (!user) throw new Error("No user logged in");

    if (user.usernameLastChanged) {
        const lastChanged = new Date(user.usernameLastChanged);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        if (lastChanged > sevenDaysAgo) {
            const daysLeft = 7 - Math.ceil((new Date().getTime() - lastChanged.getTime()) / (1000 * 3600 * 24));
            throw new Error(`You can change your username again in ${daysLeft} day(s).`);
        }
    }
    
    if (!isUsernameAvailable(newUsername, user.email)) {
        throw new Error("This username is already taken.");
    }

    user.username = newUsername;
    user.usernameLastChanged = new Date().toISOString();
    
    updateUser(user);
    return user;
}


export const toggleNotifications = (enabled: boolean): User => {
    const user = getCurrentUser();
    if (!user) throw new Error("No user logged in");
    user.notificationsEnabled = enabled;
    updateUser(user);
    return user;
}

export const updateUserProfilePicture = (dataUrl: string): User => {
    const user = getCurrentUser();
    if (!user) throw new Error("No user logged in");
    user.profilePicture = dataUrl;
    updateUser(user);
    return user;
};