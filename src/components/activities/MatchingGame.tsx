import { useState } from 'react';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Check, Trophy } from 'lucide-react';

interface MatchingGameProps {
  data: any;
  onComplete: () => void;
}

export function MatchingGame({ data, onComplete }: MatchingGameProps) {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over) {
      const item = data.items.find((i: any) => i.id === active.id);
      setMatches({ ...matches, [active.id]: over.id });
      
      // Check if correct
      if (item.matchId === over.id) {
        setScore(score + 1);
      }
    }
  };

  const checkComplete = () => {
    let correct = 0;
    data.items.forEach((item: any) => {
      if (matches[item.id] === item.matchId) {
        correct++;
      }
    });
    
    if (correct === data.items.length) {
      setIsComplete(true);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🎯
        </motion.div>
        <h3 className="text-white text-3xl mb-2">{data.title}</h3>
        <p className="text-white/80 text-xl">{data.description}</p>
      </div>

      {!isComplete ? (
        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Draggable Items */}
            <div className="space-y-4">
              <h4 className="text-white text-xl mb-4">Tasks:</h4>
              {data.items.map((item: any) => (
                <DraggableItem
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  isMatched={matches[item.id] === item.matchId}
                />
              ))}
            </div>

            {/* Drop Targets */}
            <div className="space-y-4">
              <h4 className="text-white text-xl mb-4">Abilities:</h4>
              {data.targets.map((target: any) => (
                <DroppableTarget
                  key={target.id}
                  id={target.id}
                  label={target.label}
                  color={target.color}
                  itemCount={Object.values(matches).filter(m => m === target.id).length}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={checkComplete}
              className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 py-6 text-xl shadow-lg shadow-yellow-500/30"
            >
              Check My Answers!
            </Button>
          </div>
        </DndContext>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
          <h3 className="text-white text-4xl mb-4">🎉 Perfect Match!</h3>
          <p className="text-white/80 text-xl mb-8">
            You got all {data.items.length} correct! Great job!
          </p>
          <Button
            onClick={onComplete}
            className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 py-6 text-xl shadow-lg shadow-yellow-500/30"
          >
            Continue Learning! →
          </Button>
        </motion.div>
      )}
    </div>
  );
}

function DraggableItem({ id, text, isMatched }: { id: number; text: string; isMatched: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-xl cursor-grab active:cursor-grabbing ${
        isDragging
          ? 'bg-white/40 opacity-50'
          : isMatched
          ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
          : 'bg-white/20 text-white hover:bg-white/30'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg">{text}</span>
        {isMatched && <Check className="w-6 h-6" />}
      </div>
    </motion.div>
  );
}

function DroppableTarget({ id, label, color, itemCount }: any) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-6 rounded-xl border-4 border-dashed transition-all ${
        isOver
          ? 'border-yellow-400 bg-yellow-400/20 scale-105'
          : 'border-white/40 bg-white/10'
      }`}
    >
      <div className="text-center">
        <div className={`inline-block bg-gradient-to-r ${color} px-4 py-2 rounded-lg mb-2`}>
          <p className="text-white text-xl">{label}</p>
        </div>
        {itemCount > 0 && (
          <div className="text-white/70 text-sm mt-2">
            {itemCount} item{itemCount !== 1 ? 's' : ''} matched
          </div>
        )}
      </div>
    </div>
  );
}