import { useState } from 'react';
import { Button } from './ui/button';
import { Sparkles, Bot, Zap, Trophy, Target, Flame } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Difficulty } from '../App';

interface GameStartProps {
  onStart: (difficulty: Difficulty) => void;
}

export function GameStart({ onStart }: GameStartProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');

  const difficulties = [
    {
      id: 'easy' as Difficulty,
      name: 'Easy Explorer',
      icon: Target,
      color: 'from-amber-400 to-yellow-500',
      description: 'Perfect for beginners! Fewer questions, helpful hints, and relaxed learning.',
      features: ['2-3 questions per level', 'Extra hints', 'More forgiving scoring']
    },
    {
      id: 'medium' as Difficulty,
      name: 'Smart Builder',
      icon: Bot,
      color: 'from-yellow-500 to-amber-600',
      description: 'Balanced challenge for confident learners. Standard difficulty.',
      features: ['3-4 questions per level', 'Standard hints', 'Fair scoring']
    },
    {
      id: 'hard' as Difficulty,
      name: 'Master Coder',
      icon: Flame,
      color: 'from-amber-500 to-orange-600',
      description: 'For AI experts! More questions, time challenges, and bonus rewards.',
      features: ['4-5 questions per level', 'Time challenges', 'Bonus badges & stars']
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl w-full text-center">
        <div className="mb-6 sm:mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full border-4 border-yellow-500/50 mb-4 sm:mb-6 animate-bounce shadow-2xl shadow-yellow-500/50">
              <Bot className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-black" />
            </div>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 mb-4">
              <span className="block text-3xl sm:text-5xl md:text-6xl mb-2">🤖 AI Agent Academy 🚀</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Learn to build AI Agents through fun games and challenges! Like leveling up in your favorite game, but you're learning real AI skills!
            </p>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 text-2xl sm:text-3xl mb-4 sm:mb-6 px-4">Choose Your Difficulty</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 px-4">
            {difficulties.map((diff) => {
              const Icon = diff.icon;
              const isSelected = selectedDifficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border-4 transition-all duration-300 text-left ${
                    isSelected 
                      ? 'border-yellow-500 scale-105 shadow-2xl shadow-yellow-500/50' 
                      : 'border-gray-700 hover:border-yellow-600/50 hover:scale-102'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${diff.color} rounded-full mb-3 sm:mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                  </div>
                  <h3 className="text-yellow-400 text-xl sm:text-2xl mb-2">{diff.name}</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">{diff.description}</p>
                  <ul className="space-y-2">
                    {diff.features.map((feature, i) => (
                      <li key={i} className="text-gray-400 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 px-4">
          <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-4 sm:p-6 border-2 border-gray-700">
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-2 sm:mb-3" />
            <p className="text-gray-300 text-sm sm:text-base">8 Exciting Levels</p>
          </div>
          <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-4 sm:p-6 border-2 border-gray-700">
            <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 mx-auto mb-2 sm:mb-3" />
            <p className="text-gray-300 text-sm sm:text-base">Build Your Own AI Agents</p>
          </div>
          <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-4 sm:p-6 border-2 border-gray-700 sm:col-span-2 lg:col-span-1">
            <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-2 sm:mb-3" />
            <p className="text-gray-300 text-sm sm:text-base">Earn Badges & Stars</p>
          </div>
        </div>

        <Button
          onClick={() => onStart(selectedDifficulty)}
          className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 sm:px-12 py-6 sm:py-8 text-xl sm:text-2xl md:text-3xl rounded-2xl shadow-2xl shadow-yellow-500/50 transform hover:scale-110 transition-all duration-300"
        >
          🎮 Start Adventure!
        </Button>

        <div className="mt-6 sm:mt-8 text-gray-400 text-xs sm:text-sm">
          <p>Perfect for ages 9-13 • Learn by Playing!</p>
        </div>
      </div>
    </div>
  );
}