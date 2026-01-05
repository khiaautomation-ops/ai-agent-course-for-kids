import { Button } from './ui/button';
import { Trophy, Star, Award, Sparkles, Target, Flame } from 'lucide-react';
import { PlayerProgress } from '../App';
import { useEffect, useState } from 'react';

interface VictoryScreenProps {
  playerProgress: PlayerProgress;
  onRestart: () => void;
}

// Confetti particle component for celebration
function ConfettiParticle({ delay }: { delay: number }) {
  const colors = ['bg-yellow-400', 'bg-amber-500', 'bg-orange-400', 'bg-red-500', 'bg-pink-500'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const startX = Math.random() * 100;
  const endX = startX + (Math.random() - 0.5) * 40;
  
  return (
    <div
      className={`absolute w-3 h-3 ${color} rounded-full animate-fall`}
      style={{
        left: `${startX}%`,
        top: '-20px',
        animation: `fall ${2 + Math.random()}s ease-in ${delay}s`,
        animationFillMode: 'forwards',
        '--end-x': `${endX}%`,
      } as any}
    />
  );
}

export function VictoryScreen({ playerProgress, onRestart }: VictoryScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const getDifficultyTitle = () => {
    if (playerProgress.difficulty === 'easy') {
      return { title: 'Easy Explorer Champion', icon: '⭐', color: 'from-amber-400 to-yellow-600' };
    } else if (playerProgress.difficulty === 'hard') {
      return { title: 'Master Coder Legend', icon: '🔥', color: 'from-amber-500 to-orange-600' };
    }
    return { title: 'Smart Builder Expert', icon: '🎯', color: 'from-yellow-400 to-amber-600' };
  };

  const diffTitle = getDifficultyTitle();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Confetti particles */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <ConfettiParticle key={i} delay={i * 0.1} />
          ))}
        </div>
      )}
      
      <div className="max-w-4xl w-full text-center relative z-10">
        <div className="mb-6 sm:mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative">
            <Trophy className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-yellow-400 mx-auto mb-4 sm:mb-6 animate-bounce drop-shadow-2xl" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
              🎉 Congratulations! 🎉
            </h1>
            <p className="text-gray-300 text-2xl sm:text-3xl mb-6 sm:mb-8 px-4">
              You've completed the AI Agent Academy!
            </p>
          </div>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-700 mb-6 sm:mb-8">
          {/* Difficulty Achievement Banner */}
          <div className={`bg-gradient-to-r ${diffTitle.color} rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-2xl shadow-yellow-500/30`}>
            <h2 className="text-black text-2xl sm:text-3xl md:text-4xl mb-2">{diffTitle.icon} {diffTitle.title} {diffTitle.icon}</h2>
            <p className="text-black/80 text-base sm:text-lg md:text-xl">
              Completed all 8 levels on {playerProgress.difficulty.charAt(0).toUpperCase() + playerProgress.difficulty.slice(1)} Mode!
            </p>
          </div>

          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 text-2xl sm:text-3xl mb-4 sm:mb-6">🏆 Your Achievements</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl p-4 sm:p-6 shadow-lg shadow-yellow-500/30">
              <Star className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 fill-black text-black" />
              <p className="text-2xl sm:text-3xl text-black mb-1 sm:mb-2">{playerProgress.totalStars}</p>
              <p className="text-xs sm:text-sm text-black/80">Total Stars</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-4 sm:p-6 shadow-lg shadow-amber-500/30">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-black" />
              <p className="text-2xl sm:text-3xl text-black mb-1 sm:mb-2">{playerProgress.badges.length}</p>
              <p className="text-xs sm:text-sm text-black/80">Badges Earned</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl p-4 sm:p-6 shadow-lg shadow-yellow-500/30 sm:col-span-1">
              <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-black" />
              <p className="text-2xl sm:text-3xl text-black mb-1 sm:mb-2">{playerProgress.completedLevels.size}/8</p>
              <p className="text-xs sm:text-sm text-black/80">Levels Complete</p>
            </div>
          </div>

          {playerProgress.badges.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h3 className="text-yellow-400 text-xl sm:text-2xl mb-3 sm:mb-4">🏅 Your Badge Collection</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {playerProgress.badges.map((badge, index) => (
                  <div key={index} className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-xl px-4 py-2 sm:px-6 sm:py-3 shadow-lg shadow-yellow-500/30">
                    <span className="text-black text-sm sm:text-base">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gray-800/80 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-700">
            <h3 className="text-yellow-400 text-xl sm:text-2xl mb-3 sm:mb-4">🎓 You've Mastered:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-gray-300 text-left">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl text-yellow-400">✓</span>
                <span className="text-sm sm:text-base">What AI Agents are</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl text-yellow-400">✓</span>
                <span className="text-sm sm:text-base">Tools & Actions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl text-yellow-400">✓</span>
                <span className="text-sm sm:text-base">Memory & Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl text-yellow-400">✓</span>
                <span className="text-sm sm:text-base">Prompt Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl text-yellow-400">✓</span>
                <span className="text-sm sm:text-base">Agent Planning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl text-yellow-400">✓</span>
                <span className="text-sm sm:text-base">Multi-Agent Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl text-yellow-400">✓</span>
                <span className="text-sm sm:text-base">Testing Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl text-yellow-400">✓</span>
                <span className="text-sm sm:text-base">Building Complete Agents</span>
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-r ${diffTitle.color} rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg shadow-yellow-500/30`}>
            <h3 className="text-black text-xl sm:text-2xl mb-2 sm:mb-3">🌟 Official Certificate</h3>
            <p className="text-black/90 text-lg sm:text-xl mb-1 sm:mb-2">AI Agent Builder - {diffTitle.title}</p>
            <p className="text-black/80 text-sm sm:text-base">You are now certified to build amazing AI Agents!</p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 px-4">
          <p className="text-gray-300 text-lg sm:text-xl">
            You're now ready to build real AI Agents! 🚀
          </p>
          <p className="text-gray-400 text-base sm:text-lg mb-4 sm:mb-6">
            Keep learning, keep building, and keep creating amazing things!
          </p>
          
          <Button
            onClick={onRestart}
            className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 sm:px-12 py-6 sm:py-8 text-xl sm:text-2xl rounded-2xl shadow-2xl shadow-yellow-500/50 transform hover:scale-110 transition-all duration-300 w-full sm:w-auto"
          >
            🔄 Play Again
          </Button>
        </div>

        <div className="mt-6 sm:mt-8 text-gray-500 text-xs sm:text-sm px-4">
          <p>Want to learn more? Check out the full AI Agent Builder Course!</p>
        </div>
      </div>
    </div>
  );
}