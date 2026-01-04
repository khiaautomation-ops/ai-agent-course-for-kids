import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Trophy, Check } from 'lucide-react';

const challenges = [
  {
    question: 'Your AI Agent needs to help you with homework about planets. What should it do FIRST?',
    options: [
      'Search random websites',
      'Understand the goal - help with planet homework',
      'Start writing random facts',
      'Use calculator for no reason',
    ],
    correct: 1,
    explanation: 'Always start by understanding what you need - that\'s the goal!',
  },
  {
    question: 'A user asks "What\'s 6 × 8 and is it more than 45?" Which tools does the agent need?',
    options: [
      'Only Messaging',
      'Calculator to do math, then thinking to compare the answer',
      'Only Search',
      'Calendar',
    ],
    correct: 1,
    explanation: 'Calculator for 6×8=48, then compare 48 to 45. Yes, it\'s more!',
  },
  {
    question: 'To help you make a YouTube gaming video, what team of agents would work best?',
    options: [
      'Just one agent doing everything',
      'Script Writer, Video Editor, Thumbnail Designer, and Quality Checker',
      'Agents that compete against each other',
      'No agents needed',
    ],
    correct: 1,
    explanation: 'Teams of specialized agents work best - each does what they\'re good at!',
  },
  {
    question: 'Which prompt would get you better help from an AI?',
    options: [
      'Help with stuff',
      'Explain fractions using pizza slices for a 5th grader',
      'Things about math',
      'Whatever',
    ],
    correct: 1,
    explanation: 'Clear, specific prompts work best! Say exactly what you need!',
  },
  {
    question: 'If your AI Agent gives wrong answers when you test it, what should you do?',
    options: [
      'Give up and delete it',
      'Write down what went wrong and fix it to make it better',
      'Ignore the problems',
      'Stop testing',
    ],
    correct: 1,
    explanation: 'Testing helps find bugs so you can fix them - that\'s how games and AI get better!',
  },
];

export function FinalChallenge({ data, onComplete }: any) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = challenges[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < challenges.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    const percentage = (score / challenges.length) * 100;
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6 animate-bounce" />
        <h3 className="text-white text-5xl mb-4">
          {percentage === 100 ? '🎉 PERFECT SCORE! 🎉' : percentage >= 80 ? '🌟 Amazing! 🌟' : '✨ Great Effort! ✨'}
        </h3>
        <p className="text-white/80 text-2xl mb-8">
          You scored {score} out of {challenges.length}!
        </p>
        
        <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
          <h4 className="text-black text-2xl mb-4">🎓 You're an AI Agent Builder!</h4>
          <p className="text-black/90 text-lg">
            You've learned how to understand AI Agents, use tools, work with memory, write great prompts, 
            plan solutions, build teams, and test your work!
          </p>
        </div>

        <Button
          onClick={onComplete}
          className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-12 py-8 text-2xl rounded-2xl transform hover:scale-110 transition-all shadow-2xl shadow-yellow-500/50"
        >
          Complete Course! 🚀
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🏆
        </motion.div>
        <h3 className="text-white text-3xl mb-2">Final Challenge!</h3>
        <p className="text-white/80">Question {currentQuestion + 1} of {challenges.length}</p>
        <div className="text-white/70 mt-2">Score: {score}/{challenges.length}</div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 mb-6">
        <h4 className="text-white text-2xl mb-6 text-center">{question.question}</h4>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: showFeedback ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(index)}
              disabled={showFeedback}
              className={`w-full p-6 rounded-xl text-left transition-all ${
                showFeedback
                  ? index === question.correct
                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                    : selectedAnswer === index
                    ? 'bg-gradient-to-r from-red-500 to-red-600'
                    : 'bg-white/20'
                  : 'bg-white/30 hover:bg-white/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white text-lg">{option}</span>
                {showFeedback && index === question.correct && (
                  <Check className="w-6 h-6 text-white" />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-6 rounded-xl ${
              selectedAnswer === question.correct
                ? 'bg-green-500/20 border-2 border-green-400'
                : 'bg-orange-500/20 border-2 border-orange-400'
            }`}
          >
            <p className="text-white text-xl text-center">
              {selectedAnswer === question.correct ? '🎉 Correct!' : '💡 Not quite!'} {question.explanation}
            </p>
          </motion.div>
        )}
      </div>

      {showFeedback && (
        <div className="text-center">
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 py-6 text-xl shadow-lg shadow-yellow-500/30"
          >
            {currentQuestion < challenges.length - 1 ? 'Next Question →' : 'See Final Score! 🎉'}
          </Button>
        </div>
      )}
    </div>
  );
}