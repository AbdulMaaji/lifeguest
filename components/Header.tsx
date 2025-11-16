import React from 'react';
import { User } from '../types';
import { LogoIcon, FireIcon, StarIcon, LogoutIcon, UserCircleIcon } from './Icons';

interface HeaderProps {
    user: User;
    onLogout: () => void;
    onNavigateToSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigateToSettings }) => {
    return (
        <header className="w-full max-w-4xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3">
                    <LogoIcon className="h-10 w-10 text-purple-400" />
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-sky-500">
                        LifeQuests
                    </h1>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-2" title="Total XP">
                        <StarIcon className="h-6 w-6 text-yellow-400" />
                        <span className="font-bold text-lg">{user.xp} XP</span>
                    </div>
                     <div className="flex items-center gap-2" title="Daily Streak">
                        <FireIcon className="h-6 w-6 text-orange-400" />
                        <span className="font-bold text-lg">{user.streak}</span>
                    </div>
                    <span className="hidden sm:block text-gray-500">|</span>
                     <div className="flex items-center gap-3">
                        {user.profilePicture ? (
                            <img src={user.profilePicture} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                        ) : (
                            <UserCircleIcon className="h-8 w-8 text-gray-400" />
                        )}
                        <button onClick={onNavigateToSettings} className="font-semibold text-gray-300 hover:text-purple-300 transition rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 px-1">
                            {user.username}
                        </button>
                        <button onClick={onLogout} title="Logout" className="p-2 rounded-full hover:bg-gray-700 transition">
                            <LogoutIcon className="h-6 w-6 text-red-400" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};