import React from 'react';
import { UsersIcon } from './Icons';

export const CommunityView: React.FC = () => {
    return (
        <div className="w-full max-w-2xl mx-auto bg-gray-800/50 p-8 rounded-2xl border border-gray-700 animate-fade-in text-center">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-purple-500/20 rounded-full">
                    <UsersIcon className="h-16 w-16 text-purple-300" />
                </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-purple-300">The Community Hub is Coming!</h2>
            <p className="text-lg text-gray-300 mb-2">
                Great things are on the horizon. This is where your solo adventures will become shared journeys.
            </p>
            <p className="text-gray-400">
                Soon, you'll be able to connect with friends, form groups for "fun fair" challenges, and tackle collaborative quests together. Stay tuned!
            </p>
        </div>
    );
};