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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti particles */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <ConfettiParticle key={i} delay={i * 0.1} />
          ))}
        </div>
      )}
      
      <div className="max-w-4xl w-full text-center relative z-10">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative">
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6 animate-bounce drop-shadow-2xl" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 text-6xl mb-4">
              🎉 Congratulations! 🎉
            </h1>
            <p className="text-gray-300 text-3xl mb-8">
              You've completed the AI Agent Academy!
            </p>
          </div>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border-2 border-gray-700 mb-8">
          {/* Difficulty Achievement Banner */}
          <div className={`bg-gradient-to-r ${diffTitle.color} rounded-xl p-6 mb-8 shadow-2xl shadow-yellow-500/30`}>
            <h2 className="text-black text-4xl mb-2">{diffTitle.icon} {diffTitle.title} {diffTitle.icon}</h2>
            <p className="text-black/80 text-xl">
              Completed all 8 levels on {playerProgress.difficulty.charAt(0).toUpperCase() + playerProgress.difficulty.slice(1)} Mode!
            </p>
          </div>

          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 text-3xl mb-6">🏆 Your Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl p-6 shadow-lg shadow-yellow-500/30">
              <Star className="w-12 h-12 mx-auto mb-3 fill-black text-black" />
              <p className="text-3xl text-black mb-2">{playerProgress.totalStars}</p>
              <p className="text-sm text-black/80">Total Stars</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 shadow-lg shadow-amber-500/30">
              <Award className="w-12 h-12 mx-auto mb-3 text-black" />
              <p className="text-3xl text-black mb-2">{playerProgress.badges.length}</p>
              <p className="text-sm text-black/80">Badges Earned</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl p-6 shadow-lg shadow-yellow-500/30">
              <Sparkles className="w-12 h-12 mx-auto mb-3 text-black" />
              <p className="text-3xl text-black mb-2">{playerProgress.completedLevels.size}/8</p>
              <p className="text-sm text-black/80">Levels Complete</p>
            </div>
          </div>

          {playerProgress.badges.length > 0 && (
            <div className="mb-8">
              <h3 className="text-yellow-400 text-2xl mb-4">🏅 Your Badge Collection</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {playerProgress.badges.map((badge, index) => (
                  <div key={index} className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-xl px-6 py-3 shadow-lg shadow-yellow-500/30">
                    <span className="text-black">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gray-800/80 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-yellow-400 text-2xl mb-4">🎓 You've Mastered:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300 text-left">
              <div className="flex items-center gap-2">
                <span className="text-2xl text-yellow-400">✓</span>
                <span>What AI Agents are</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-yellow-400">✓</span>
                <span>Tools & Actions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-yellow-400">✓</span>
                <span>Memory & Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-yellow-400">✓</span>
                <span>Prompt Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-yellow-400">✓</span>
                <span>Agent Planning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-yellow-400">✓</span>
                <span>Multi-Agent Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-yellow-400">✓</span>
                <span>Testing Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-yellow-400">✓</span>
                <span>Building Complete Agents</span>
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-r ${diffTitle.color} rounded-xl p-6 mb-6 shadow-lg shadow-yellow-500/30`}>
            <h3 className="text-black text-2xl mb-3">🌟 Official Certificate</h3>
            <p className="text-black/90 text-xl mb-2">AI Agent Builder - {diffTitle.title}</p>
            <p className="text-black/80">You are now certified to build amazing AI Agents!</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-300 text-xl">
            You're now ready to build real AI Agents! 🚀
          </p>
          <p className="text-gray-400 text-lg mb-6">
            Keep learning, keep building, and keep creating amazing things!
          </p>
          
          <Button
            onClick={onRestart}
            className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-12 py-8 text-2xl rounded-2xl shadow-2xl shadow-yellow-500/50 transform hover:scale-110 transition-all duration-300"
          >
            🔄 Play Again
          </Button>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          <p>Want to learn more? Check out the full AI Agent Builder Course!</p>
        </div>
      </div>
    </div>
  );
}