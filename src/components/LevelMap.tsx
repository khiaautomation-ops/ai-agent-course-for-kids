import { Button } from './ui/button';
import { Star, Lock, CheckCircle, Award, Target, Flame } from 'lucide-react';
import { PlayerProgress } from '../App';

interface LevelMapProps {
  playerProgress: PlayerProgress;
  onSelectLevel: (level: number) => void;
}

const levels = [
  { id: 1, title: "What is an AI Agent?", icon: "🤖", color: "from-yellow-400 to-amber-500" },
  { id: 2, title: "Tools & Actions", icon: "🔧", color: "from-amber-400 to-yellow-600" },
  { id: 3, title: "Memory & Learning", icon: "🧠", color: "from-yellow-500 to-amber-600" },
  { id: 4, title: "Prompt Engineering", icon: "💬", color: "from-amber-500 to-orange-500" },
  { id: 5, title: "Agent Planning", icon: "📋", color: "from-yellow-400 to-amber-600" },
  { id: 6, title: "Multi-Agent Systems", icon: "👥", color: "from-amber-400 to-yellow-500" },
  { id: 7, title: "Testing Your Agent", icon: "🧪", color: "from-yellow-500 to-orange-500" },
  { id: 8, title: "Final Challenge", icon: "🏆", color: "from-amber-500 to-yellow-600" }
];

export function LevelMap({ playerProgress, onSelectLevel }: LevelMapProps) {
  const getDifficultyBadge = () => {
    if (playerProgress.difficulty === 'easy') {
      return { icon: Target, text: 'Easy Explorer', color: 'bg-amber-500' };
    } else if (playerProgress.difficulty === 'hard') {
      return { icon: Flame, text: 'Master Coder', color: 'bg-orange-600' };
    }
    return { icon: Star, text: 'Smart Builder', color: 'bg-yellow-600' };
  };

  const diffBadge = getDifficultyBadge();
  const DiffIcon = diffBadge.icon;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 mb-8 border-2 border-gray-700">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 text-3xl mb-2">🗺️ AI Agent Adventure Map</h2>
              <p className="text-gray-300">Choose your next challenge!</p>
            </div>
            <div className="flex items-center gap-6">
              <div className={`${diffBadge.color} rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg`}>
                <DiffIcon className="w-5 h-5 text-white" />
                <span className="text-white">{diffBadge.text}</span>
              </div>
              <div className="bg-gray-800/80 rounded-xl px-6 py-3 flex items-center gap-2 border border-gray-700">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 text-xl">{playerProgress.totalStars}</span>
              </div>
              <div className="bg-gray-800/80 rounded-xl px-6 py-3 flex items-center gap-2 border border-gray-700">
                <Award className="w-6 h-6 text-amber-400" />
                <span className="text-amber-400 text-xl">{playerProgress.badges.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Display */}
        {playerProgress.badges.length > 0 && (
          <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 mb-8 border-2 border-gray-700">
            <h3 className="text-yellow-400 text-xl mb-4">🏅 Your Badges</h3>
            <div className="flex flex-wrap gap-3">
              {playerProgress.badges.map((badge, index) => (
                <div key={index} className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-xl px-6 py-3 shadow-lg shadow-yellow-500/30">
                  <span className="text-black">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Level Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level) => {
            const isUnlocked = level.id <= playerProgress.level;
            const isCompleted = playerProgress.completedLevels.has(level.id);

            return (
              <div key={level.id} className="relative">
                <Button
                  onClick={() => isUnlocked && onSelectLevel(level.id)}
                  disabled={!isUnlocked}
                  className={`w-full h-full p-0 overflow-hidden ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className={`w-full bg-gradient-to-br ${level.color} p-6 h-full flex flex-col items-center justify-center gap-3 relative hover:scale-105 transition-transform duration-300`}>
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <Lock className="w-12 h-12 text-white" />
                      </div>
                    )}
                    
                    <div className="text-6xl mb-2">{level.icon}</div>
                    <p className="text-white text-center">{level.title}</p>
                    <div className="text-sm text-white/80">Level {level.id}</div>
                    
                    {isCompleted && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-8 h-8 text-green-300 fill-green-300" />
                      </div>
                    )}
                  </div>
                </Button>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 border-2 border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-300">Overall Progress</p>
            <p className="text-yellow-400">{playerProgress.completedLevels.size} / {levels.length}</p>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-gray-700">
            <div
              className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 h-full rounded-full transition-all duration-500 shadow-lg shadow-yellow-500/50"
              style={{ width: `${(playerProgress.completedLevels.size / levels.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}