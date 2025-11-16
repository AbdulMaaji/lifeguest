import React from 'react';
import { Badge } from '../types';
import { BadgeIcon } from './Icons';

interface BadgeNotificationProps {
  badge: Badge;
  onClose: () => void;
}

const badgeColors = {
    Easy: 'text-green-400',
    Medium: 'text-yellow-400',
    Hard: 'text-red-400',
};

export const BadgeNotification: React.FC<BadgeNotificationProps> = ({ badge, onClose }) => {
  const colorClass = badgeColors[badge.difficulty] || 'text-gray-400';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-gray-800 border border-purple-500/50 rounded-2xl shadow-xl max-w-sm w-full p-6 text-center transform transition-all scale-100 opacity-100">
        <div className="flex justify-center mb-4">
            <div className="relative">
                <BadgeIcon className={`h-24 w-24 ${colorClass}`} />
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-2xl animate-ping">✨</span>
                <span className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 text-xl animate-ping delay-500">🏆</span>
            </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Achievement Unlocked!</h2>
        <p className={`text-xl font-bold mb-2 ${colorClass}`}>{badge.name}</p>
        <p className="text-gray-300 mb-6">{badge.description}</p>
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-purple-600 to-sky-600 text-white font-bold py-3 px-6 rounded-full text-lg hover:from-purple-700 hover:to-sky-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};
