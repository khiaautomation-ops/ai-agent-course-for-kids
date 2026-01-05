import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Star, CheckCircle, XCircle } from 'lucide-react';
import { LevelContent } from './LevelContent';
import { QuizChallenge } from './QuizChallenge';
import { Difficulty } from '../App';
import { motion } from 'motion/react';

interface LevelGameProps {
  level: number;
  difficulty: Difficulty;
  onComplete: (stars: number, badge?: string) => void;
  onBack: () => void;
}

type GamePhase = 'lesson' | 'challenge' | 'result';

export function LevelGame({ level, difficulty, onComplete, onBack }: LevelGameProps) {
  const [phase, setPhase] = useState<GamePhase>('lesson');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const handleStartChallenge = () => {
    setPhase('challenge');
  };

  const handleChallengeComplete = (correctAnswers: number, total: number) => {
    setScore(correctAnswers);
    setTotalQuestions(total);
    setPhase('result');
  };

  const handleFinishLevel = () => {
    const percentage = (score / totalQuestions) * 100;
    let stars = 1;
    let badge;

    // Adjust star thresholds based on difficulty
    let threshold2Star = 70;
    let threshold3Star = 90;
    
    if (difficulty === 'easy') {
      threshold2Star = 60;
      threshold3Star = 80;
    } else if (difficulty === 'hard') {
      threshold2Star = 75;
      threshold3Star = 95;
    }

    if (percentage >= threshold3Star) {
      stars = 3;
      badge = difficulty === 'hard' 
        ? `🔥 Level ${level} Legend` 
        : `🌟 Level ${level} Master`;
    } else if (percentage >= threshold2Star) {
      stars = 2;
    }
    
    // Bonus star for hard mode perfect score
    if (difficulty === 'hard' && percentage === 100) {
      stars = 4; // Bonus star!
    }

    onComplete(stars, badge);
  };

  const getStars = () => {
    const percentage = (score / totalQuestions) * 100;
    let threshold2Star = 70;
    let threshold3Star = 90;
    
    if (difficulty === 'easy') {
      threshold2Star = 60;
      threshold3Star = 80;
    } else if (difficulty === 'hard') {
      threshold2Star = 75;
      threshold3Star = 95;
    }
    
    if (difficulty === 'hard' && percentage === 100) return 4;
    if (percentage >= threshold3Star) return 3;
    if (percentage >= threshold2Star) return 2;
    return 1;
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <Button
            onClick={onBack}
            className="bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 border-2 border-gray-700 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Back to Map
          </Button>
        </div>

        {/* Content */}
        <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-700">
          {phase === 'lesson' && (
            <div>
              <LevelContent level={level} />
              <div className="mt-6 sm:mt-8 text-center">
                <Button
                  onClick={handleStartChallenge}
                  className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-6 sm:px-8 py-4 sm:py-6 text-lg sm:text-xl rounded-xl shadow-lg shadow-yellow-500/30 w-full sm:w-auto"
                >
                  🎯 Start Challenge!
                </Button>
              </div>
            </div>
          )}

          {phase === 'challenge' && (
            <QuizChallenge
              level={level}
              difficulty={difficulty}
              onComplete={handleChallengeComplete}
            />
          )}

          {phase === 'result' && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 text-3xl sm:text-4xl mb-4 sm:mb-6">🎉 Level Complete!</h2>
                
                <div className="mb-6 sm:mb-8">
                  <p className="text-gray-300 text-xl sm:text-2xl mb-3 sm:mb-4">
                    You got {score} out of {totalQuestions} correct!
                  </p>
                  <div className="flex justify-center gap-2 mb-3 sm:mb-4 flex-wrap">
                    {[1, 2, 3, 4].map((star) => (
                      <Star
                        key={star}
                        className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${
                          star <= getStars()
                            ? star === 4 
                              ? 'text-orange-400 fill-orange-400 animate-pulse'
                              : 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-600'
                        } ${star === 4 && getStars() < 4 ? 'hidden' : ''}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-lg sm:text-xl px-4">
                    {getStars() === 4 && "🔥 LEGENDARY! Perfect on Hard Mode!"} 
                    {getStars() === 3 && difficulty === 'hard' && "🌟 Amazing! You're a Hard Mode Master!"}
                    {getStars() === 3 && difficulty !== 'hard' && "🌟 Perfect! You're an AI Agent Master!"}
                    {getStars() === 2 && "⭐ Great job! You're learning fast!"}
                    {getStars() === 1 && "✨ Good start! Keep practicing!"}
                  </p>
                </div>

                {getStars() >= 3 && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg shadow-yellow-500/30"
                  >
                    <p className="text-lg sm:text-xl text-black">🏅 New Badge Unlocked!</p>
                    <p className="text-xl sm:text-2xl mt-2 text-black">
                      {difficulty === 'hard' ? `Level ${level} Legend` : `Level ${level} Master`}
                    </p>
                  </motion.div>
                )}

                <Button
                  onClick={handleFinishLevel}
                  className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-6 sm:px-8 py-4 sm:py-6 text-lg sm:text-xl rounded-xl shadow-lg shadow-yellow-500/30 w-full sm:w-auto"
                >
                  Continue Adventure! →
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}