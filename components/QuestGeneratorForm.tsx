import React, { useState } from 'react';
import { UserInput } from '../types';
import { CheckIcon, SparklesIcon, WandIcon } from './Icons';

interface QuestGeneratorFormProps {
  onGenerate: (userInput: UserInput) => void;
}

const goalsOptions = [
  "Fitness", "Learning", "Social", "Kindness", 
  "Productivity", "Wellness", "Creativity"
];

const energyLevels: Array<'Low' | 'Medium' | 'High'> = ['Low', 'Medium', 'High'];

const surpriseMoods = [
  "Adventurous", "Mysterious", "Playful", "Curious", "Chill", 
  "Energetic", "Creative", "Spontaneous", "Heroic", "Whimsical"
];

export const QuestGeneratorForm: React.FC<QuestGeneratorFormProps> = ({ onGenerate }) => {
  const [goals, setGoals] = useState<string[]>([]);
  const [energy, setEnergy] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [mood, setMood] = useState('');

  const handleGoalToggle = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mood.trim() === '') {
        alert('Please tell us your mood first!');
        return;
    }
    onGenerate({ goals, energy, mood });
  };

  const handleSurpriseMe = () => {
      const randomMood = surpriseMoods[Math.floor(Math.random() * surpriseMoods.length)];
      const randomEnergy = energyLevels[Math.floor(Math.random() * energyLevels.length)];
      onGenerate({ goals: [], energy: randomEnergy, mood: randomMood });
  }

  return (
    <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-700 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-2 text-purple-300">Daily Check-in</h2>
      <p className="text-center text-gray-400 mb-8">How are you feeling today? Let's find your adventure.</p>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
           <label htmlFor="mood" className="block text-lg font-semibold mb-3 text-gray-300">
            In one word, what's your mood?
          </label>
          <input
            id="mood"
            type="text"
            value={mood}
            onChange={e => setMood(e.target.value)}
            placeholder="e.g., Hopeful, Tired, Curious"
            className="w-full bg-gray-700 text-white placeholder-gray-500 p-3 rounded-lg border-2 border-transparent focus:border-purple-500 focus:ring-0 transition"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-3 text-gray-300">What are your goals for today? (Optional)</label>
          <div className="flex flex-wrap gap-3">
            {goalsOptions.map(goal => (
              <button
                type="button"
                key={goal}
                onClick={() => handleGoalToggle(goal)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  goals.includes(goal)
                    ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {goals.includes(goal) && <CheckIcon className="h-4 w-4" />}
                {goal}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-3 text-gray-300">Energy Level</label>
          <div className="grid grid-cols-3 gap-4">
            {energyLevels.map(level => (
              <button
                type="button"
                key={level}
                onClick={() => setEnergy(level)}
                className={`p-4 rounded-lg text-center font-bold transition-all duration-200 ${
                  energy === level
                    ? 'bg-sky-600 text-white ring-2 ring-sky-400'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="w-full sm:w-1/2 flex items-center justify-center gap-3 bg-gray-700 text-sky-300 font-bold py-4 px-6 rounded-full text-lg hover:bg-gray-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              <WandIcon className="h-6 w-6" />
              Surprise Me
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-sky-600 text-white font-bold py-4 px-6 rounded-full text-lg hover:from-purple-700 hover:to-sky-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <SparklesIcon className="h-6 w-6" />
              Generate Quests
            </button>
        </div>
      </form>
    </div>
  );
};