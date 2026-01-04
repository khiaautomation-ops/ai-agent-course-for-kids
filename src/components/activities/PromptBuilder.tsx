import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Trophy, Check, X } from 'lucide-react';

const promptPieces = {
  good: [
    { id: 1, text: 'Explain', type: 'action', correct: true },
    { id: 2, text: 'how to build a treehouse in Minecraft', type: 'topic', correct: true },
    { id: 3, text: 'with easy steps', type: 'style', correct: true },
    { id: 4, text: 'for beginners', type: 'audience', correct: true },
  ],
  bad: [
    { id: 5, text: 'Tell me', type: 'action', correct: false },
    { id: 6, text: 'random stuff', type: 'topic', correct: false },
    { id: 7, text: 'I guess', type: 'style', correct: false },
  ],
};

export function PromptBuilder({ data, onComplete }: any) {
  const [selectedPieces, setSelectedPieces] = useState<any[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  const allPieces = [...promptPieces.good, ...promptPieces.bad].sort(() => Math.random() - 0.5);

  const handlePieceClick = (piece: any) => {
    if (selectedPieces.find(p => p.id === piece.id)) {
      setSelectedPieces(selectedPieces.filter(p => p.id !== piece.id));
    } else if (selectedPieces.length < 4) {
      setSelectedPieces([...selectedPieces, piece]);
    }
  };

  const checkPrompt = () => {
    setShowFeedback(true);
    const allCorrect = selectedPieces.every(p => p.correct) && selectedPieces.length === 4;
    if (allCorrect) {
      setTimeout(() => setCompleted(true), 2000);
    }
  };

  const resetPrompt = () => {
    setSelectedPieces([]);
    setShowFeedback(false);
  };

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
        <h3 className="text-white text-4xl mb-4">🎉 Prompt Master!</h3>
        <p className="text-white/80 text-xl mb-4">Perfect! You built an amazing prompt!</p>
        <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-xl p-6 max-w-2xl mx-auto mb-8">
          <p className="text-black text-2xl">
            "{selectedPieces.map(p => p.text).join(' ')}"
          </p>
        </div>
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
          💬
        </motion.div>
        <h3 className="text-white text-3xl mb-2">Build a Great Prompt!</h3>
        <p className="text-white/80">Click the pieces to build your prompt (choose 4)</p>
      </div>

      {/* Selected Prompt Display */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 mb-8 min-h-32">
        <h4 className="text-white text-xl mb-4 text-center">Your Prompt:</h4>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {selectedPieces.length === 0 ? (
            <p className="text-white/50 text-center">Click pieces below to build your prompt...</p>
          ) : (
            selectedPieces.map((piece) => (
              <motion.div
                key={piece.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`px-4 py-2 rounded-lg ${
                  showFeedback
                    ? piece.correct
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : 'bg-gradient-to-r from-yellow-400 to-amber-500'
                }`}
              >
                <span className="text-white text-lg">{piece.text}</span>
                {showFeedback && (
                  piece.correct ? <Check className="inline w-5 h-5 ml-2" /> : <X className="inline w-5 h-5 ml-2" />
                )}
              </motion.div>
            ))
          )}
        </div>
        {showFeedback && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center text-lg ${
              selectedPieces.every(p => p.correct) && selectedPieces.length === 4
                ? 'text-green-300'
                : 'text-orange-300'
            }`}
          >
            {selectedPieces.every(p => p.correct) && selectedPieces.length === 4
              ? '✓ Perfect! This is a clear, specific prompt!'
              : '✗ Try again! Choose pieces that are clear and specific!'}
          </motion.p>
        )}
      </div>

      {/* Available Pieces */}
      <div className="mb-8">
        <h4 className="text-white text-xl mb-4 text-center">Available Pieces:</h4>
        <div className="flex flex-wrap gap-3 justify-center">
          {allPieces.map((piece) => (
            <motion.button
              key={piece.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => !showFeedback && handlePieceClick(piece)}
              disabled={showFeedback}
              className={`px-6 py-3 rounded-lg transition-all ${
                selectedPieces.find(p => p.id === piece.id)
                  ? 'bg-white/10 opacity-50'
                  : 'bg-white/30 hover:bg-white/40'
              }`}
            >
              <span className="text-white text-lg">{piece.text}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        {!showFeedback ? (
          <>
            <Button
              onClick={resetPrompt}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3"
            >
              Clear
            </Button>
            <Button
              onClick={checkPrompt}
              disabled={selectedPieces.length !== 4}
              className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 py-6 text-xl disabled:opacity-50 shadow-lg shadow-yellow-500/30"
            >
              Check Prompt
            </Button>
          </>
        ) : (
          <Button
            onClick={resetPrompt}
            className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white px-8 py-6 text-xl"
          >
            Try Again
          </Button>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-white/60 text-sm">
          Hint: Good prompts are clear, specific, and polite!
        </p>
      </div>
    </div>
  );
}