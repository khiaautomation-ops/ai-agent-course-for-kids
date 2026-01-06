import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Trophy, Check } from 'lucide-react';

const challenges = [
  {
    question: 'Your AI Agent needs to create a quarterly business report. What should it do FIRST?',
    options: [
      'Start writing random data',
      'Understand the goal - what metrics and insights are needed for the report',
      'Search for unrelated information',
      'Send emails immediately',
    ],
    correct: 1,
    explanation: 'Always start by understanding the objective and requirements clearly!',
  },
  {
    question: 'A user asks "Calculate our profit margin and compare it to last quarter." Which tools does the agent need?',
    options: [
      'Only Email',
      'Calculator for math operations, Database for historical data, then comparison logic',
      'Only Web Search',
      'Calendar',
    ],
    correct: 1,
    explanation: 'Need Calculator for profit calculations, Database to retrieve last quarter\'s data, then analysis to compare!',
  },
  {
    question: 'To create a comprehensive market analysis presentation, what team of agents would work best?',
    options: [
      'Just one generalist agent',
      'Research Agent (data), Analysis Agent (insights), Writing Agent (content), Design Agent (visuals), QA Agent (review)',
      'Agents that work independently without coordination',
      'No specialized agents needed',
    ],
    correct: 1,
    explanation: 'Specialized agent teams produce higher quality - each focusing on their expertise area!',
  },
  {
    question: 'Which prompt would get you better results from an AI?',
    options: [
      'Help with marketing',
      'Create a 3-page competitive analysis of the top 5 SaaS companies in project management, focusing on pricing and features',
      'Some business stuff',
      'Information',
    ],
    correct: 1,
    explanation: 'Specific prompts with clear scope, deliverable, and context always produce better results!',
  },
  {
    question: 'If your AI Agent produces inaccurate data during testing, what should you do?',
    options: [
      'Deploy it anyway',
      'Document the error, identify root cause, refine data sources or logic, and retest',
      'Ignore the issue',
      'Stop testing completely',
    ],
    correct: 1,
    explanation: 'Testing reveals issues so you can iterate and improve - that\'s how quality AI systems are built!',
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