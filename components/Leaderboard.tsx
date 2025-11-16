import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';
import { getLeaderboard } from '../services/userService';
import { TrophyIcon } from './Icons';

interface LeaderboardProps {
    currentUserUsername: string;
}

const rankColors = [
    'text-yellow-400', // 1st
    'text-gray-300',   // 2nd
    'text-yellow-600', // 3rd
];

export const Leaderboard: React.FC<LeaderboardProps> = ({ currentUserUsername }) => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        setLeaderboard(getLeaderboard());
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto bg-gray-800/50 p-6 rounded-2xl border border-gray-700 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-6 text-purple-300 flex items-center justify-center gap-3">
                <TrophyIcon className="h-8 w-8 text-yellow-400" />
                Leaderboard
            </h2>
            <ul className="space-y-3">
                {leaderboard.map((entry, index) => (
                    <li key={entry.username} className={`flex items-center justify-between p-4 rounded-lg ${entry.username === currentUserUsername ? 'bg-purple-600/30 border-2 border-purple-500' : 'bg-gray-700/50'}`}>
                        <div className="flex items-center gap-4">
                            <span className={`text-xl font-bold w-8 text-center ${rankColors[index] || 'text-gray-400'}`}>
                                {index + 1}
                            </span>
                            <span className="font-semibold text-lg">{entry.username}</span>
                        </div>
                        <span className="font-bold text-lg text-yellow-300">{entry.xp} XP</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
