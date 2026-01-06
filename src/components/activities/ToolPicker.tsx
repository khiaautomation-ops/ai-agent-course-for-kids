import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Check, X, Trophy } from 'lucide-react';

const scenarios = [
  { task: "Calculate the quarterly ROI percentage", correctTool: '🧮', toolName: 'Calculator', explanation: 'Math and calculations need the Calculator!' },
  { task: "Send status update to the project team", correctTool: '📧', toolName: 'Email', explanation: 'Sending messages uses the Email Tool!' },
  { task: "Find current market trends in AI technology", correctTool: '🔍', toolName: 'Search', explanation: 'Finding information online needs the Web Search Tool!' },
  { task: "When is the quarterly review meeting?", correctTool: '📅', toolName: 'Calendar', explanation: 'Checking schedules uses the Calendar!' },
  { task: "Research best practices for remote team management", correctTool: '🔍', toolName: 'Search', explanation: 'Finding guides and articles needs the Web Search Tool!' },
  { task: "If revenue is $150k and costs are $92k, what's the profit margin?", correctTool: '🧮', toolName: 'Calculator', explanation: 'Financial calculations need the Calculator!' },
];

const tools = [
  { icon: '🔍', name: 'Search', color: 'from-blue-400 to-blue-600' },
  { icon: '📧', name: 'Email', color: 'from-green-400 to-green-600' },
  { icon: '🧮', name: 'Calculator', color: 'from-purple-400 to-purple-600' },
  { icon: '📅', name: 'Calendar', color: 'from-orange-400 to-orange-600' },
];

export function ToolPicker({ data, onComplete }: any) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleToolSelect = (toolIcon: string) => {
    setSelectedTool(toolIcon);
    setShowFeedback(true);
    
    if (toolIcon === scenario.correctTool) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedTool(null);
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
        <h3 className="text-white text-4xl mb-4">🎉 Tool Master!</h3>
        <p className="text-white/80 text-xl mb-8">
          You got {score} out of {scenarios.length} correct!
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
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🔧
        </motion.div>
        <h3 className="text-white text-3xl mb-2">Pick the Right Tool!</h3>
        <p className="text-white/80">Scenario {currentScenario + 1} of {scenarios.length}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 mb-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🤖</div>
          <div className="bg-white/20 rounded-xl p-6 inline-block">
            <p className="text-white text-2xl">"{scenario.task}"</p>
          </div>
        </div>

        <p className="text-white text-xl text-center mb-6">Which tool should the AI Agent use?</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {tools.map((tool) => (
            <motion.button
              key={tool.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !showFeedback && handleToolSelect(tool.icon)}
              disabled={showFeedback}
              className={`p-8 rounded-xl transition-all ${
                showFeedback
                  ? selectedTool === tool.icon
                    ? tool.icon === scenario.correctTool
                      ? 'bg-gradient-to-br from-green-500 to-green-600'
                      : 'bg-gradient-to-br from-red-500 to-red-600'
                    : tool.icon === scenario.correctTool
                    ? 'bg-gradient-to-br from-green-500 to-green-600'
                    : 'bg-white/20'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <div className="text-6xl mb-3">{tool.icon}</div>
              <p className="text-white text-xl">{tool.name}</p>
              {showFeedback && tool.icon === scenario.correctTool && (
                <Check className="w-8 h-8 text-white mx-auto mt-3" />
              )}
              {showFeedback && selectedTool === tool.icon && tool.icon !== scenario.correctTool && (
                <X className="w-8 h-8 text-white mx-auto mt-3" />
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-xl ${
                selectedTool === scenario.correctTool
                  ? 'bg-green-500/20 border-2 border-green-400'
                  : 'bg-orange-500/20 border-2 border-orange-400'
              }`}
            >
              <p className="text-white text-xl text-center">
                {selectedTool === scenario.correctTool ? '🎉 Correct!' : '💡 Not quite!'} {scenario.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showFeedback && (
        <div className="text-center">
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 py-6 text-xl shadow-lg shadow-yellow-500/30"
          >
            {currentScenario < scenarios.length - 1 ? 'Next Scenario →' : 'See Results! 🎉'}
          </Button>
        </div>
      )}
    </div>
  );
}