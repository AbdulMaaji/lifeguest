import React, { useState, useEffect } from 'react';
import { User } from './types';
import { getCurrentUser, logoutUser } from './services/userService';
import { Auth } from './components/Auth';
import { QuestView } from './components/QuestView';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user when the app loads
    const existingUser = getCurrentUser();
    if (existingUser) {
      setUser(existingUser);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };
  
  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  const renderApp = () => {
    if (isLoading) {
      return null; // Or a loading spinner for the whole app
    }

    if (user) {
      return <QuestView user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />;
    } else {
      return <Auth onLogin={handleLogin} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      {renderApp()}
    </div>
  );
};

export default App;
