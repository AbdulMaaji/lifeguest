import React, { useState, useRef } from 'react';
import { User, Badge } from '../types';
import { toggleNotifications, updateUsername, updateUserProfilePicture } from '../services/userService';
import { allBadges } from '../services/badgeService';
import { UserCircleIcon, LockIcon, BadgeIcon } from './Icons';

interface SettingsProps {
    user: User;
    onUpdateUser: (user: User) => void;
}

export const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
    const [username, setUsername] = useState(user.username);
    const [notifications, setNotifications] = useState(user.notificationsEnabled);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(user.profilePicture);

    const handleUsernameChange = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (username.trim() === user.username) return;

        try {
            const updatedUser = updateUsername(username.trim());
            onUpdateUser(updatedUser);
            setMessage({ type: 'success', text: 'Username updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: error instanceof Error ? error.message : 'An unknown error occurred.' });
        }
    };

    const handleNotificationToggle = () => {
        const newSetting = !notifications;
        setNotifications(newSetting);
        try {
            const updatedUser = toggleNotifications(newSetting);
            onUpdateUser(updatedUser);
        } catch (error) {
             setMessage({ type: 'error', text: 'Failed to update notification settings.' });
             setNotifications(!newSetting); // revert on error
        }
    };
    
    const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result as string;
            setPreview(dataUrl);
            try {
                const updatedUser = updateUserProfilePicture(dataUrl);
                onUpdateUser(updatedUser);
                setMessage({ type: 'success', text: 'Profile picture updated!' });
            } catch (err) {
                 setMessage({ type: 'error', text: 'Failed to save profile picture.' });
            }
        };
        reader.readAsDataURL(file);
    };

    const getUsernameCooldown = () => {
        if (!user.usernameLastChanged) return null;
        const lastChanged = new Date(user.usernameLastChanged);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        if (lastChanged > sevenDaysAgo) {
            const daysLeft = 7 - Math.ceil((new Date().getTime() - lastChanged.getTime()) / (1000 * 3600 * 24));
            return `You can change your username again in ${daysLeft} day(s).`;
        }
        return null;
    }

    const usernameCooldownMessage = getUsernameCooldown();

    const badgeColors = {
        Easy: 'border-green-500/50 text-green-300',
        Medium: 'border-yellow-500/50 text-yellow-300',
        Hard: 'border-red-500/50 text-red-300',
    };
    
    const unlockedBadgeIds = new Set(user.unlockedBadges || []);

    const badgesByDifficulty = {
        Easy: allBadges.filter(b => b.difficulty === 'Easy'),
        Medium: allBadges.filter(b => b.difficulty === 'Medium'),
        Hard: allBadges.filter(b => b.difficulty === 'Hard'),
    };


    return (
        <div className="w-full max-w-2xl mx-auto bg-gray-800/50 p-8 rounded-2xl border border-gray-700 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8 text-purple-300">Settings</h2>
            
            {message && (
                <div className={`p-4 mb-6 rounded-lg text-center font-semibold ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {message.text}
                </div>
            )}
            
            <div className="space-y-12">
                 {/* Profile Picture Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-200">Profile Picture</h3>
                    <div className="flex items-center gap-6">
                        {preview ? (
                            <img src={preview} alt="Profile Preview" className="h-24 w-24 rounded-full object-cover border-2 border-purple-500" />
                        ) : (
                            <UserCircleIcon className="h-24 w-24 text-gray-500" />
                        )}
                        <div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-5 py-2 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 transition"
                            >
                                Upload Image
                            </button>
                            <p className="text-xs text-gray-400 mt-2">Recommended: Square image (e.g., 200x200px)</p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handlePictureUpload}
                                accept="image/png, image/jpeg, image/webp"
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>


                {/* Username Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-200">Manage Profile</h3>
                    <form onSubmit={handleUsernameChange} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-400">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="mt-1 w-full bg-gray-700 text-white placeholder-gray-500 p-3 rounded-lg border-2 border-transparent focus:border-purple-500 focus:ring-0 transition"
                                disabled={!!usernameCooldownMessage}
                            />
                            {usernameCooldownMessage && <p className="text-sm text-yellow-500 mt-2">{usernameCooldownMessage}</p>}
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
                            disabled={!!usernameCooldownMessage || username.trim() === '' || username.trim() === user.username}
                        >
                            Save Username
                        </button>
                    </form>
                </div>

                {/* Notifications Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-200">Notifications</h3>
                    <div className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg">
                        <div>
                            <p className="font-semibold text-gray-300">Streak Reminders</p>
                            <p className="text-sm text-gray-400">Get a pop-up reminder to keep your {user.streak}-day streak going.</p>
                        </div>
                        <button
                            onClick={handleNotificationToggle}
                            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${notifications ? 'bg-purple-600' : 'bg-gray-600'}`}
                        >
                            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>

                {/* Trophy Case Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-200">Trophy Case</h3>
                    <div className="space-y-6">
                        {(['Easy', 'Medium', 'Hard'] as const).map(difficulty => (
                            <div key={difficulty}>
                                <h4 className={`text-lg font-bold mb-3 ${badgeColors[difficulty]}`}>{difficulty} Achievements</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {badgesByDifficulty[difficulty].map(badge => {
                                        const isUnlocked = unlockedBadgeIds.has(badge.id);
                                        return (
                                            <div 
                                                key={badge.id} 
                                                className={`relative group p-4 rounded-lg flex flex-col items-center justify-center text-center aspect-square transition-all duration-300 ${
                                                    isUnlocked 
                                                        ? `bg-gray-700/80 border-2 ${badgeColors[badge.difficulty]}` 
                                                        : 'bg-gray-900/50 border border-gray-700'
                                                }`}
                                            >
                                                {isUnlocked ? (
                                                    <BadgeIcon className={`h-12 w-12 mb-2 ${badgeColors[badge.difficulty].replace('border-', 'text-')}`} />
                                                ) : (
                                                    <LockIcon className="h-12 w-12 mb-2 text-gray-500" />
                                                )}
                                                <p className={`font-bold text-sm ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                                                    {isUnlocked ? badge.name : 'Locked'}
                                                </p>
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full mb-2 w-48 p-3 bg-gray-900 border border-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 shadow-lg">
                                                    <p className="font-bold text-base mb-1">{badge.name}</p>
                                                    <p className="text-gray-300">{badge.description}</p>
                                                    {!isUnlocked && <span className="text-red-400 block mt-1">(Not yet achieved)</span>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};