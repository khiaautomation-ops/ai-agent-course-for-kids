import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Trophy, Check } from 'lucide-react';

const agents = [
  { id: 1, name: 'Research Agent', emoji: '📚', skill: 'Finding information', color: 'from-blue-400 to-blue-600' },
  { id: 2, name: 'Writing Agent', emoji: '✍️', skill: 'Creating stories', color: 'from-green-400 to-green-600' },
  { id: 3, name: 'Creative Agent', emoji: '🎨', skill: 'Making designs', color: 'from-purple-400 to-purple-600' },
  { id: 4, name: 'Quality Agent', emoji: '✅', skill: 'Checking work', color: 'from-orange-400 to-orange-600' },
  { id: 5, name: 'Code Agent', emoji: '💻', skill: 'Writing programs', color: 'from-pink-400 to-pink-600' },
  { id: 6, name: 'Math Agent', emoji: '🧮', skill: 'Solving math', color: 'from-cyan-400 to-cyan-600' },
];

const scenarios = [
  {
    task: 'Create a Market Research Report',
    description: 'Research competitors and create a comprehensive analysis report',
    correctAgents: [1, 2, 3, 4], // Research, Writing, Creative, Quality
    explanation: 'You need Research to gather data, Writing for the report, Creative for charts/visuals, and Quality to review!',
  },
  {
    task: 'Build a Data Dashboard',
    description: 'Create an interactive dashboard for business metrics',
    correctAgents: [5, 6, 3, 4], // Code, Math, Creative, Quality
    explanation: 'You need Code to build it, Math for calculations, Creative for visualization design, and Quality to test!',
  },
];

export function TeamBuilder({ data, onComplete }: any) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  const scenario = scenarios[currentScenario];

  const toggleAgent = (agentId: number) => {
    if (showFeedback) return;
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter(id => id !== agentId));
    } else if (selectedAgents.length < 4) {
      setSelectedAgents([...selectedAgents, agentId]);
    }
  };

  const checkTeam = () => {
    setShowFeedback(true);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAgents([]);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const isCorrect = () => {
    return scenario.correctAgents.every(id => selectedAgents.includes(id)) &&
           selectedAgents.length === scenario.correctAgents.length;
  };

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
        <h3 className="text-white text-4xl mb-4">🎉 Team Leader!</h3>
        <p className="text-white/80 text-xl mb-8">
          You know how to build the perfect AI team!
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
          👥
        </motion.div>
        <h3 className="text-white text-3xl mb-2">Build Your Team!</h3>
        <p className="text-white/80">Scenario {currentScenario + 1} of {scenarios.length}</p>
      </div>

      {/* Scenario */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 mb-8">
        <h4 className="text-white text-2xl mb-2">{scenario.task}</h4>
        <p className="text-white/70 text-lg mb-6">{scenario.description}</p>
        <p className="text-white/90">Select 4 agents for your team:</p>
      </div>

      {/* Agents */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {agents.map((agent) => (
          <motion.button
            key={agent.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleAgent(agent.id)}
            className={`p-6 rounded-xl transition-all ${
              selectedAgents.includes(agent.id)
                ? showFeedback
                  ? scenario.correctAgents.includes(agent.id)
                    ? 'bg-gradient-to-br from-green-500 to-green-600'
                    : 'bg-gradient-to-br from-red-500 to-red-600'
                  : `bg-gradient-to-br ${agent.color}`
                : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            <div className="text-center">
              <div className="text-5xl mb-2">{agent.emoji}</div>
              <p className="text-white text-lg mb-1">{agent.name}</p>
              <p className="text-white/70 text-sm">{agent.skill}</p>
              {selectedAgents.includes(agent.id) && <Check className="w-6 h-6 text-white mx-auto mt-2" />}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl mb-6 ${
            isCorrect()
              ? 'bg-green-500/20 border-2 border-green-400'
              : 'bg-orange-500/20 border-2 border-orange-400'
          }`}
        >
          <p className="text-white text-xl text-center mb-2">
            {isCorrect() ? '🎉 Perfect Team!' : '💡 Not quite the best team!'}
          </p>
          <p className="text-white/90 text-center">{scenario.explanation}</p>
        </motion.div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        {!showFeedback ? (
          <>
            <Button
              onClick={() => setSelectedAgents([])}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3"
            >
              Clear Team
            </Button>
            <Button
              onClick={checkTeam}
              disabled={selectedAgents.length !== 4}
              className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 py-6 text-xl disabled:opacity-50 shadow-lg shadow-yellow-500/30"
            >
              Check Team
            </Button>
          </>
        ) : (
          <Button
            onClick={isCorrect() ? nextScenario : () => { setSelectedAgents([]); setShowFeedback(false); }}
            className={`text-white px-8 py-6 text-xl ${
              isCorrect()
                ? 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600'
                : 'bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600'
            }`}
          >
            {isCorrect() ? (currentScenario < scenarios.length - 1 ? 'Next Scenario →' : 'Complete! 🎉') : 'Try Again'}
          </Button>
        )}
      </div>
    </div>
  );
}