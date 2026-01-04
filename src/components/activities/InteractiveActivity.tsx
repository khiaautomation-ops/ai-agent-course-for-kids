import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Check, X, Sparkles } from 'lucide-react';
import { MatchingGame } from './MatchingGame';
import { ToolPicker } from './ToolPicker';
import { MemoryGame } from './MemoryGame';
import { PromptBuilder } from './PromptBuilder';
import { PlanningSequence } from './PlanningSequence';
import { TeamBuilder } from './TeamBuilder';
import { TestLab } from './TestLab';
import { FinalChallenge } from './FinalChallenge';

interface InteractiveActivityProps {
  level: number;
  activityData: any;
  onComplete: () => void;
}

export function InteractiveActivity({ level, activityData, onComplete }: InteractiveActivityProps) {
  const ActivityComponent = {
    'matching': MatchingGame,
    'tool-picker': ToolPicker,
    'memory-game': MemoryGame,
    'prompt-builder': PromptBuilder,
    'planning-sequence': PlanningSequence,
    'team-builder': TeamBuilder,
    'test-lab': TestLab,
    'final-challenge': FinalChallenge,
  }[activityData.type];

  if (!ActivityComponent) {
    return (
      <div className="text-center">
        <h3 className="text-white text-2xl mb-6">{activityData.title}</h3>
        <p className="text-white/80 mb-6">{activityData.description}</p>
        <Button onClick={onComplete} className="bg-gradient-to-r from-green-400 to-blue-500">
          Continue
        </Button>
      </div>
    );
  }

  return <ActivityComponent data={activityData} onComplete={onComplete} />;
}
