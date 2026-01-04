import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter, useDraggable, useDroppable } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Trophy, GripVertical } from 'lucide-react';

const steps = [
  { id: 1, order: 1, text: 'Understand the goal', emoji: '🎯', description: 'What do I need to do?' },
  { id: 2, order: 2, text: 'Break into steps', emoji: '📝', description: 'What order should I do things?' },
  { id: 3, order: 3, text: 'Choose tools', emoji: '🔧', description: 'What will help me?' },
  { id: 4, order: 4, text: 'Execute!', emoji: '🚀', description: 'Let\'s do it!' },
  { id: 5, order: 5, text: 'Check if it worked', emoji: '✅', description: 'Did I complete the goal?' },
];

export function PlanningSequence({ data, onComplete }: any) {
  const [currentSteps, setCurrentSteps] = useState(
    [...steps].sort(() => Math.random() - 0.5)
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  const checkOrder = () => {
    const isCorrect = currentSteps.every((step, index) => step.order === index + 1);
    setShowFeedback(true);
    if (isCorrect) {
      setTimeout(() => setCompleted(true), 2000);
    }
  };

  const resetOrder = () => {
    setCurrentSteps([...steps].sort(() => Math.random() - 0.5));
    setShowFeedback(false);
  };

  const moveStep = (fromIndex: number, toIndex: number) => {
    if (showFeedback) return;
    setCurrentSteps(arrayMove(currentSteps, fromIndex, toIndex));
  };

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
        <h3 className="text-white text-4xl mb-4">🎉 Planning Pro!</h3>
        <p className="text-white/80 text-xl mb-8">
          Perfect! You know how AI Agents plan!
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
          📋
        </motion.div>
        <h3 className="text-white text-3xl mb-2">Put Steps in Order!</h3>
        <p className="text-white/80">Arrange the planning steps correctly</p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="space-y-3">
          {currentSteps.map((step, index) => (
            <motion.div
              key={step.id}
              layout
              className={`bg-white/20 rounded-xl p-6 border-2 ${
                showFeedback
                  ? step.order === index + 1
                    ? 'border-green-400 bg-green-500/20'
                    : 'border-red-400 bg-red-500/20'
                  : 'border-white/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-4xl">{step.emoji}</span>
                  <div>
                    <p className="text-white text-xl">{step.text}</p>
                    <p className="text-white/70">{step.description}</p>
                  </div>
                </div>
                {!showFeedback && (
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => moveStep(index, Math.max(0, index - 1))}
                      disabled={index === 0}
                      className="bg-white/20 hover:bg-white/30 px-3 py-1 text-white"
                    >
                      ↑
                    </Button>
                    <Button
                      onClick={() => moveStep(index, Math.min(currentSteps.length - 1, index + 1))}
                      disabled={index === currentSteps.length - 1}
                      className="bg-white/20 hover:bg-white/30 px-3 py-1 text-white"
                    >
                      ↓
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center mb-6 p-4 rounded-xl ${
            currentSteps.every((step, index) => step.order === index + 1)
              ? 'bg-green-500/20 text-green-300'
              : 'bg-orange-500/20 text-orange-300'
          }`}
        >
          <p className="text-xl">
            {currentSteps.every((step, index) => step.order === index + 1)
              ? '✓ Perfect! That\'s the correct planning order!'
              : '✗ Not quite! Try rearranging the steps.'}
          </p>
        </motion.div>
      )}

      <div className="flex gap-4 justify-center">
        {!showFeedback ? (
          <>
            <Button
              onClick={resetOrder}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3"
            >
              Shuffle
            </Button>
            <Button
              onClick={checkOrder}
              className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 py-6 text-xl shadow-lg shadow-yellow-500/30"
            >
              Check Order
            </Button>
          </>
        ) : (
          !completed && (
            <Button
              onClick={resetOrder}
              className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white px-8 py-6 text-xl"
            >
              Try Again
            </Button>
          )
        )}
      </div>
    </div>
  );
}