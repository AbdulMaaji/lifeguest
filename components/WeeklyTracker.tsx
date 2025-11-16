import React from 'react';

interface WeeklyTrackerProps {
  progress: number[]; // [Sun, Mon, ..., Sat]
}

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const WeeklyTracker: React.FC<WeeklyTrackerProps> = ({ progress = [] }) => {
  const todayIndex = new Date().getDay();
  const totalWeeklyXp = progress.reduce((acc, val) => acc + (val || 0), 0);

  // Ensure progress is always an array of 7 numbers
  const safeProgress = [...(progress || Array(7).fill(0))];
  while(safeProgress.length < 7) {
    safeProgress.push(0);
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-800/50 p-4 rounded-2xl border border-gray-700 mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-purple-300">This Week's Progress</h3>
        <p className="font-bold text-yellow-300">{totalWeeklyXp} XP Total</p>
      </div>
      <div className="flex justify-around items-end gap-2">
        {days.map((day, index) => {
          const xp = safeProgress[index] || 0;
          // Use max XP in the week or a baseline of 50 for height scaling
          const maxXPForScale = Math.max(...safeProgress, 50); 
          const height = xp > 0 ? Math.max(15, (xp / maxXPForScale) * 100) : 5;
          const isToday = index === todayIndex;
          const hasXp = xp > 0;

          return (
            <div key={index} className="flex flex-col items-center gap-2 w-10 text-center">
              <div className="relative w-full h-28 flex items-end justify-center group">
                 <div
                   className={`w-4 rounded-full transition-all duration-500 ${hasXp ? 'bg-gradient-to-t from-sky-600 to-sky-400' : 'bg-gray-700'}`}
                   style={{ height: `${height}%` }}
                   title={`${day}: ${xp} XP`}
                 ></div>
                 {hasXp && (
                    <div className="absolute -top-6 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 pointer-events-none">
                        {xp} XP
                    </div>
                 )}
              </div>
              <span className={`font-bold text-sm ${isToday ? 'text-purple-400' : 'text-gray-400'}`}>
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
