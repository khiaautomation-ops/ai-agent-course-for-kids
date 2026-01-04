import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Trophy } from 'lucide-react';

const cards = [
  { id: 1, emoji: '🤖', pair: 1 },
  { id: 2, emoji: '🤖', pair: 1 },
  { id: 3, emoji: '🔧', pair: 2 },
  { id: 4, emoji: '🔧', pair: 2 },
  { id: 5, emoji: '🧠', pair: 3 },
  { id: 6, emoji: '🧠', pair: 3 },
  { id: 7, emoji: '💬', pair: 4 },
  { id: 8, emoji: '💬', pair: 4 },
];

export function MemoryGame({ data, onComplete }: any) {
  const [gameCards, setGameCards] = useState(shuffleCards(cards));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      const firstCard = gameCards.find(c => c.id === first);
      const secondCard = gameCards.find(c => c.id === second);

      if (firstCard?.pair === secondCard?.pair) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
      setMoves(moves + 1);
    }
  }, [flipped]);

  useEffect(() => {
    if (matched.length === cards.length) {
      setCompleted(true);
    }
  }, [matched]);

  const handleCardClick = (cardId: number) => {
    if (flipped.length < 2 && !flipped.includes(cardId) && !matched.includes(cardId)) {
      setFlipped([...flipped, cardId]);
    }
  };

  const handleReset = () => {
    setGameCards(shuffleCards(cards));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
        <h3 className="text-white text-4xl mb-4">🎉 Memory Master!</h3>
        <p className="text-white/80 text-xl mb-8">
          You completed the game in {moves} moves!
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
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🧠
        </motion.div>
        <h3 className="text-white text-3xl mb-2">Memory Challenge!</h3>
        <p className="text-white/80">Find all the matching pairs!</p>
        <div className="text-white/70 mt-2">Moves: {moves}</div>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-6">
        {gameCards.map((card) => (
          <MemoryCard
            key={card.id}
            card={card}
            isFlipped={flipped.includes(card.id) || matched.includes(card.id)}
            isMatched={matched.includes(card.id)}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      <div className="text-center">
        <Button
          onClick={handleReset}
          className="bg-white/20 hover:bg-white/30 text-white px-6 py-3"
        >
          Reset Game
        </Button>
      </div>
    </div>
  );
}

function MemoryCard({ card, isFlipped, isMatched, onClick }: any) {
  return (
    <motion.button
      whileHover={{ scale: isFlipped ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="aspect-square rounded-xl relative"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Back of card */}
        <div
          className={`absolute inset-0 rounded-xl flex items-center justify-center ${
            isMatched ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-yellow-400 to-amber-600'
          }`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-6xl">{card.emoji}</span>
        </div>
        
        {/* Front of card */}
        <div
          className="absolute inset-0 bg-white/20 rounded-xl flex items-center justify-center border-2 border-white/40"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-4xl">?</span>
        </div>
      </motion.div>
    </motion.button>
  );
}

function shuffleCards(cards: any[]) {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}