import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Trophy, AlertCircle, CheckCircle } from 'lucide-react';

const testCases = [
  {
    question: 'What is 2 + 2?',
    agentResponse: 'The answer is 4.',
    isCorrect: true,
    issue: null,
  },
  {
    question: 'Send an email to my teacher',
    agentResponse: 'I used the Calculator to compute your request.',
    isCorrect: false,
    issue: 'Wrong Tool - Should use Email Tool, not Calculator!',
  },
  {
    question: 'What did I tell you my name was?',
    agentResponse: 'I don\'t remember. Can you tell me again?',
    isCorrect: false,
    issue: 'Memory Problem - Should remember from previous conversation!',
  },
  {
    question: 'Find fun science experiments',
    agentResponse: 'I found 10 exciting science experiments for kids!',
    isCorrect: true,
    issue: null,
  },
  {
    question: 'What is the weather like?',
    agentResponse: 'Banana pancakes are delicious!',
    isCorrect: false,
    issue: 'Wrong Answer - Didn\'t answer the question at all!',
  },
];

export function TestLab({ data, onComplete }: any) {
  const [currentTest, setCurrentTest] = useState(0);
  const [selectedIssue, setSelectedIssue] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const testCase = testCases[currentTest];

  const handleCheck = (hasIssue: boolean) => {
    setSelectedIssue(hasIssue);
    setShowFeedback(true);
    
    if ((hasIssue && !testCase.isCorrect) || (!hasIssue && testCase.isCorrect)) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentTest < testCases.length - 1) {
      setCurrentTest(currentTest + 1);
      setSelectedIssue(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
        <h3 className="text-white text-4xl mb-4">🎉 Testing Expert!</h3>
        <p className="text-white/80 text-xl mb-8">
          You found {score} out of {testCases.length} issues correctly!
        </p>
        <Button
          onClick={onComplete}
          className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 py-6 text-xl shadow-lg shadow-yellow-500/30"
        >
          Continue Learning! →
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🧪
        </motion.div>
        <h3 className="text-white text-3xl mb-2">Test the AI Agent!</h3>
        <p className="text-white/80">Test {currentTest + 1} of {testCases.length}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 mb-8">
        {/* User Question */}
        <div className="mb-6">
          <p className="text-white/70 mb-2">User asks:</p>
          <div className="bg-blue-500/20 rounded-xl p-4">
            <p className="text-white text-lg">"{testCase.question}"</p>
          </div>
        </div>

        {/* Agent Response */}
        <div className="mb-6">
          <p className="text-white/70 mb-2">AI Agent responds:</p>
          <div className="bg-purple-500/20 rounded-xl p-4">
            <p className="text-white text-lg">"{testCase.agentResponse}"</p>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-6">
          <p className="text-white text-xl">Is there a problem with this response?</p>
        </div>

        {/* Buttons */}
        {!showFeedback ? (
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => handleCheck(false)}
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-8 py-6 text-xl"
            >
              ✅ No Issues
            </Button>
            <Button
              onClick={() => handleCheck(true)}
              className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white px-8 py-6 text-xl"
            >
              ❌ Found an Issue
            </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`p-6 rounded-xl mb-6 ${
              (selectedIssue && !testCase.isCorrect) || (!selectedIssue && testCase.isCorrect)
                ? 'bg-green-500/20 border-2 border-green-400'
                : 'bg-orange-500/20 border-2 border-orange-400'
            }`}>
              {(selectedIssue && !testCase.isCorrect) || (!selectedIssue && testCase.isCorrect) ? (
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-8 h-8 text-green-300 flex-shrink-0" />
                  <div>
                    <p className="text-white text-xl mb-2">🎉 Correct!</p>
                    {testCase.issue && <p className="text-white/90">Issue: {testCase.issue}</p>}
                    {!testCase.issue && <p className="text-white/90">This response is good!</p>}
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-8 h-8 text-orange-300 flex-shrink-0" />
                  <div>
                    <p className="text-white text-xl mb-2">💡 Not quite!</p>
                    {testCase.isCorrect ? (
                      <p className="text-white/90">This response is actually correct!</p>
                    ) : (
                      <p className="text-white/90">There is an issue: {testCase.issue}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 py-6 text-xl shadow-lg shadow-yellow-500/30"
              >
                {currentTest < testCases.length - 1 ? 'Next Test →' : 'See Results! 🎉'}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}