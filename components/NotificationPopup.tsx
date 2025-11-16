import React from 'react';
import { FireIcon } from './Icons';

interface NotificationPopupProps {
  onClose: () => void;
}

export const NotificationPopup: React.FC<NotificationPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-gray-800 border border-purple-500/50 rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
        <div className="flex justify-center mb-4">
            <FireIcon className="h-16 w-16 text-orange-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Keep your streak alive!</h2>
        <p className="text-gray-300 mb-6">A new day brings a new adventure. Complete a quest to extend your streak.</p>
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-purple-600 to-sky-600 text-white font-bold py-3 px-6 rounded-full text-lg hover:from-purple-700 hover:to-sky-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Let's Go!
        </button>
      </div>
    </div>
  );
};