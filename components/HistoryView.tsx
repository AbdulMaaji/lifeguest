import React from 'react';
import { User } from '../types';
import { TrophyIcon, ClipboardListIcon } from './Icons';

interface HistoryViewProps {
    user: User;
    onNavigateToSettings: () => void;
}

const categoryColors: { [key: string]: string } = {
  Fitness: 'bg-red-500/20 text-red-300 border-red-500/30',
  Learning: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Social: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Kindness: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  Productivity: 'bg-green-500/20 text-green-300 border-green-500/30',
  Wellness: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  Creativity: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Random: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};


export const HistoryView: React.FC<HistoryViewProps> = ({ user, onNavigateToSettings }) => {
    const history = user.questHistory ? [...user.questHistory].reverse() : [];
    
    return (
        <div className="w-full max-w-2xl mx-auto bg-gray-800/50 p-6 rounded-2xl border border-gray-700 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-6 text-purple-300 flex items-center justify-center gap-3">
                <ClipboardListIcon className="h-8 w-8" />
                My Adventures
            </h2>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-white">{user.questStats.totalQuests || 0}</p>
                    <p className="text-gray-400">Total Quests Completed</p>
                </div>
                <button 
                    onClick={onNavigateToSettings}
                    className="bg-gray-700/50 p-4 rounded-lg text-center group hover:bg-gray-700 transition"
                >
                    <p className="text-3xl font-bold text-yellow-300 group-hover:text-yellow-200 transition">{user.unlockedBadges.length || 0}</p>
                    <p className="text-gray-400 group-hover:text-gray-300 transition flex items-center justify-center gap-2">
                        Achievements Unlocked <TrophyIcon className="h-5 w-5" />
                    </p>
                </button>
            </div>
            
            {/* History List */}
            <h3 className="text-xl font-bold mb-4 text-gray-200">Quest Log</h3>
            {history.length > 0 ? (
                <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {history.map((quest, index) => (
                        <li key={`${quest.completedAt}-${index}`} className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50">
                            <div>
                                <p className="font-semibold text-lg text-white">{quest.title}</p>
                                <p className="text-sm text-gray-400">{new Date(quest.completedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                             <div className={`px-3 py-1 text-xs font-semibold rounded-full border ${categoryColors[quest.category] || categoryColors.Random}`}>
                                {quest.category}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-8 bg-gray-700/30 rounded-lg">
                    <p className="text-gray-400">Your adventure log is empty.</p>
                    <p className="text-gray-500">Complete your first quest to start your history!</p>
                </div>
            )}
        </div>
    );
};