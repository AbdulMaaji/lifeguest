import React, { useState, useRef } from 'react';
import { Quest } from '../types';
import { 
  TrophyIcon, ClockIcon, BarChartIcon, DocumentTextIcon, CameraIcon, MicrophoneIcon, UploadIcon, CheckCircleIcon,
  ChevronDownIcon, ChevronUpIcon
} from './Icons';
import { generateQuestDetails } from '../services/geminiService';


interface QuestCardProps {
  quest: Quest;
  onComplete: () => void;
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

const difficultyColors: { [key: string]: string } = {
  Easy: 'text-green-400',
  Medium: 'text-yellow-400',
  Hard: 'text-red-400',
};

const getProofIcon = (proofType: string) => {
  switch(proofType) {
    case 'photo': return <CameraIcon className="h-5 w-5" />;
    case 'audio': return <MicrophoneIcon className="h-5 w-5" />;
    case 'text': return <DocumentTextIcon className="h-5 w-5" />;
    default: return null;
  }
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [detailsContent, setDetailsContent] = useState<string | null>(null);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  const startCompletion = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsCompleted(true);
      setIsUploading(false);
      onComplete();
    }, 1500);
  }

  const handleCompleteClick = () => {
    if (quest.proof === 'text') {
      setShowTextInput(true);
    } else {
      fileInputRef.current?.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (quest.proof === 'photo' && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProofPreview(reader.result as string);
          setShowConfirmation(true);
        }
        reader.readAsDataURL(file);
      } else {
        setShowConfirmation(true);
      }
    }
  };
  
  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const textProof = formData.get('proofText') as string;
    if(textProof.trim()) {
      setProofPreview(textProof);
      setShowConfirmation(true);
    }
  };
  
  const handleConfirmCompletion = () => {
    setShowConfirmation(false);
    if (quest.proof === 'text') {
        setShowTextInput(false);
    }
    startCompletion();
  };

  const handleCancelCompletion = () => {
      setShowConfirmation(false);
      setProofPreview(null);
      if (fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  };
  
  const handleToggleDetails = async () => {
    // If opening for the first time and content isn't fetched yet
    if (!isDetailsVisible && !detailsContent) {
      setIsDetailsVisible(true); // Open immediately to show loading state
      setIsFetchingDetails(true);
      try {
        const details = await generateQuestDetails(quest);
        setDetailsContent(details);
      } catch (error) {
        console.error("Failed to fetch quest details:", error);
        setDetailsContent("Sorry, could not load details at this time.");
      } finally {
        setIsFetchingDetails(false);
      }
    } else {
      // Just toggle visibility if content is already there
      setIsDetailsVisible(!isDetailsVisible);
    }
  };


  const ConfirmationDialog = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-gray-800 border border-purple-500/50 rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
        <h2 className="text-xl font-bold text-white mb-4">Are you sure you want to complete this quest?</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancelCompletion}
            className="w-full bg-gray-600 text-white font-bold py-2 px-6 rounded-full hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmCompletion}
            className="w-full bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition-all"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );


  return (
    <div className={`relative bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 transition-all duration-500 ${isCompleted ? 'opacity-50 saturate-50' : ''}`}>
      {showConfirmation && <ConfirmationDialog />}
      {isCompleted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
            <CheckCircleIcon className="h-24 w-24 text-green-400 opacity-80" />
            <p className="mt-2 text-lg font-bold text-white">Quest Complete!</p>
        </div>
      )}
      <div className={`relative ${isCompleted ? 'blur-sm' : ''}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white">{quest.title}</h3>
          <div className={`mt-2 sm:mt-0 px-3 py-1 text-sm font-semibold rounded-full border ${categoryColors[quest.category] || categoryColors.Random}`}>
            {quest.category}
          </div>
        </div>

        <p className="text-gray-300 mb-6">{quest.quest}</p>
        
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <BarChartIcon className="h-5 w-5" /> 
            <span className={difficultyColors[quest.difficulty]}>{quest.difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5" /> 
            <span>{quest.time_minutes} min</span>
          </div>
           <div className="flex items-center gap-2">
            {getProofIcon(quest.proof)}
            <span className="capitalize">Proof: {quest.proof}</span>
          </div>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-3">
              <TrophyIcon className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="font-bold text-yellow-300">+{quest.reward.xp} XP</p>
                <p className="text-sm text-gray-300">{quest.reward.badge}</p>
              </div>
            </div>
            {!isCompleted && !isUploading && !showTextInput && (
               <button onClick={handleCompleteClick} className="bg-purple-600 text-white font-bold py-2 px-5 rounded-full hover:bg-purple-700 transition-all flex items-center gap-2">
                 <UploadIcon className="h-5 w-5" /> Complete
               </button>
            )}
        </div>
        
        {showTextInput && !isCompleted && (
          <div className="mt-4 p-4 bg-gray-700/50 rounded-lg animate-fade-in">
              <form onSubmit={handleTextSubmit}>
                  <textarea 
                      name="proofText"
                      className="w-full bg-gray-700 p-2 rounded-lg text-white placeholder-gray-400 border-2 border-transparent focus:border-purple-500 focus:ring-0 transition" 
                      placeholder="Type your proof here..."
                      rows={3}
                      required
                      autoFocus
                  ></textarea>
                  <button type="submit" className="mt-2 w-full bg-green-600 text-white font-bold py-2 px-5 rounded-full hover:bg-green-700 transition-all">Submit Proof</button>
              </form>
          </div>
        )}

        {isUploading && !isCompleted && (
          <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
            <div className="text-center">
              {proofPreview && quest.proof === 'photo' && (
                  <img src={proofPreview} alt="Proof preview" className="max-h-40 mx-auto rounded-lg mb-4" />
              )}
               {proofPreview && quest.proof === 'text' && (
                  <p className="italic text-gray-300 bg-gray-800 p-2 rounded-md mb-4">"{proofPreview}"</p>
              )}
              <p className="animate-pulse text-lg">Submitting quest...</p>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <button onClick={handleToggleDetails} className="flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 font-semibold transition">
            {isDetailsVisible ? 'Hide Details' : 'Show Details'}
            {isDetailsVisible ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
          </button>
        </div>

        {isDetailsVisible && (
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg animate-fade-in">
            {isFetchingDetails ? (
              <p className="text-gray-400 animate-pulse text-sm">Uncovering secrets...</p>
            ) : (
              <p className="text-gray-300 text-sm whitespace-pre-wrap font-sans">{detailsContent}</p>
            )}
          </div>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange}
          accept={quest.proof === 'photo' ? 'image/*' : 'audio/*'} 
          className="hidden" 
        />
      </div>
    </div>
  );
};
