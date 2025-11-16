import React, { useState, useCallback, useEffect } from 'react';
import { QuestGeneratorForm } from './QuestGeneratorForm';
import { QuestBoard } from './QuestBoard';
import { Leaderboard } from './Leaderboard';
import { CommunityView } from './CommunityView';
import { LoadingSpinner } from './LoadingSpinner';
import { Header } from './Header';
import { WeeklyTracker } from './WeeklyTracker';
import { Settings } from './Settings';
import { NotificationPopup } from './NotificationPopup';
import { BadgeNotification } from './BadgeNotification';
import { HistoryView } from './HistoryView';
import { generateQuests } from '../services/geminiService';
import { completeQuest } from '../services/userService';
import { Quest, UserInput, User, Badge } from '../types';
import { SettingsIcon, UsersIcon, ClipboardListIcon } from './Icons';

type AppState = 'initial' | 'generating' | 'quests-ready' | 'error';
type View = 'quests' | 'leaderboard' | 'history' | 'community' | 'settings';

interface QuestViewProps {
    user: User;
    onLogout: () => void;
    onUpdateUser: (user: User) => void;
}

export const QuestView: React.FC<QuestViewProps> = ({ user, onLogout, onUpdateUser }) => {
  const [appState, setAppState] = useState<AppState>('initial');
  const [quests, setQuests] = useState<Quest[]>([]);
  const [dailyMessage, setDailyMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('quests');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationShownThisSession, setNotificationShownThisSession] = useState(false);
  const [unlockedBadgeQueue, setUnlockedBadgeQueue] = useState<Badge[]>([]);

  useEffect(() => {
    // Show notification only once per session if enabled and conditions are met.
    if (user && user.notificationsEnabled && !notificationShownThisSession) {
      const today = new Date().toISOString().split('T')[0];
      if (user.lastQuestDate !== today && appState === 'initial') {
        const timer = setTimeout(() => {
          setShowNotification(true);
          setNotificationShownThisSession(true); // Mark as shown for this session
        }, 3000); // Show after 3 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [user, appState, notificationShownThisSession]);

  const handleGenerateQuests = useCallback(async (userInput: UserInput) => {
    setAppState('generating');
    setError(null);
    try {
      const result = await generateQuests(userInput);
      if (result.quests && result.quests.length > 0) {
        setQuests(result.quests);
        setDailyMessage(result.daily_message);
        setAppState('quests-ready');
      } else {
        throw new Error("The AI didn't return any quests. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setAppState('error');
    }
  }, []);

  const handleReset = () => {
    setQuests([]);
    setDailyMessage('');
    setError(null);
    setAppState('initial');
  };
  
  const handleQuestComplete = (quest: Quest) => {
      const { updatedUser, newBadges } = completeQuest(quest);
      onUpdateUser(updatedUser);
      if (newBadges.length > 0) {
        setUnlockedBadgeQueue(prev => [...prev, ...newBadges]);
      }
  };
  
  const handleCloseBadgeNotification = () => {
    setUnlockedBadgeQueue(prev => prev.slice(1)); // Show next badge in queue
  };

  const renderContent = () => {
    if (view === 'leaderboard') {
        return <Leaderboard currentUserUsername={user.username} />;
    }
    if (view === 'settings') {
        return <Settings user={user} onUpdateUser={onUpdateUser} />;
    }
    if (view === 'community') {
        return <CommunityView />;
    }
    if (view === 'history') {
        return <HistoryView user={user} onNavigateToSettings={() => setView('settings')} />;
    }


    const questContent = () => {
        switch (appState) {
          case 'generating':
            return (
              <div className="text-center">
                <LoadingSpinner />
                <p className="mt-4 text-lg text-purple-300 animate-pulse">Brewing your adventure...</p>
              </div>
            );
          case 'quests-ready':
            return (
              <QuestBoard
                quests={quests}
                dailyMessage={dailyMessage}
                onGenerateNew={handleReset}
                onQuestComplete={handleQuestComplete}
              />
            );
          case 'error':
            return (
              <div className="text-center text-red-400 bg-red-900/50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
                <p className="mb-6">{error}</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all"
                >
                  Try Again
                </button>
              </div>
            );
          case 'initial':
          default:
            return <QuestGeneratorForm onGenerate={handleGenerateQuests} />;
        }
    }

    return (
        <div className="w-full flex flex-col items-center">
          {view === 'quests' && <WeeklyTracker progress={user.weeklyProgress} />}
          {questContent()}
        </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
        <Header 
            user={user} 
            onLogout={onLogout} 
            onNavigateToSettings={() => setView('settings')}
        />

        <div className="w-full max-w-4xl mx-auto mb-6">
            <div className="flex justify-center bg-gray-800/50 p-1 rounded-full border border-gray-700">
                <button 
                    onClick={() => setView('quests')}
                    className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition ${view === 'quests' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                >
                    My Quests
                </button>
                 <button 
                    onClick={() => setView('leaderboard')}
                    className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition ${view === 'leaderboard' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                >
                    Leaderboard
                </button>
                 <button 
                    onClick={() => setView('history')}
                    className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${view === 'history' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                >
                    <ClipboardListIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">History</span>
                </button>
                 <button 
                    onClick={() => setView('community')}
                    className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${view === 'community' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                >
                    <UsersIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">Community</span>
                </button>
                 <button 
                    onClick={() => setView('settings')}
                    className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${view === 'settings' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                >
                    <SettingsIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">Settings</span>
                </button>
            </div>
        </div>

        <main className="w-full max-w-4xl mx-auto flex-grow flex items-start justify-center">
            {renderContent()}
        </main>

        {showNotification && <NotificationPopup onClose={() => setShowNotification(false)} />}
        {unlockedBadgeQueue.length > 0 && (
            <BadgeNotification 
                badge={unlockedBadgeQueue[0]} 
                onClose={handleCloseBadgeNotification} 
            />
        )}
    </div>
  );
};