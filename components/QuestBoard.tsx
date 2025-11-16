import React from 'react';
import { Quest } from '../types';
import { QuestCard } from './QuestCard';
import { RefreshIcon } from './Icons';

interface QuestBoardProps {
  quests: Quest[];
  dailyMessage: string;
  onGenerateNew: () => void;
  onQuestComplete: (quest: Quest) => void;
}

export const QuestBoard: React.FC<QuestBoardProps> = ({ quests, dailyMessage, onGenerateNew, onQuestComplete }) => {
  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-8 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <p className="text-xl italic text-purple-300">"{dailyMessage}"</p>
      </div>
      <div className="space-y-6">
        {quests.map((quest, index) => (
          <QuestCard 
            key={`${quest.title}-${index}`} 
            quest={quest} 
            onComplete={() => onQuestComplete(quest)} 
          />
        ))}
      </div>
      <div className="text-center mt-10">
        <button
          onClick={onGenerateNew}
          className="px-6 py-3 bg-gray-700 text-purple-300 font-semibold rounded-full hover:bg-gray-600 hover:text-white transition-all flex items-center gap-2 mx-auto"
        >
          <RefreshIcon className="h-5 w-5" />
          Generate New Quests
        </button>
      </div>
    </div>
  );
};
