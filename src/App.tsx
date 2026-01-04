import { useState } from 'react';
import { GameStart } from './components/GameStart';
import { LevelMap } from './components/LevelMap';
import { LevelGame } from './components/LevelGame';
import { VictoryScreen } from './components/VictoryScreen';

export type GameState = 'start' | 'map' | 'playing' | 'victory';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface PlayerProgress {
  level: number;
  totalStars: number;
  badges: string[];
  completedLevels: Set<number>;
  difficulty: Difficulty;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [playerProgress, setPlayerProgress] = useState<PlayerProgress>({
    level: 1,
    totalStars: 0,
    badges: [],
    completedLevels: new Set(),
    difficulty: 'medium'
  });

  const handleStartGame = (difficulty: Difficulty) => {
    setPlayerProgress({ ...playerProgress, difficulty });
    setGameState('map');
  };

  const handleSelectLevel = (level: number) => {
    setCurrentLevel(level);
    setGameState('playing');
  };

  const handleLevelComplete = (stars: number, newBadge?: string) => {
    const newProgress = { ...playerProgress };
    newProgress.totalStars += stars;
    newProgress.completedLevels.add(currentLevel);
    if (newBadge && !newProgress.badges.includes(newBadge)) {
      newProgress.badges.push(newBadge);
    }
    if (currentLevel >= newProgress.level) {
      newProgress.level = currentLevel + 1;
    }
    setPlayerProgress(newProgress);
    
    if (currentLevel === 8) {
      setGameState('victory');
    } else {
      setGameState('map');
    }
  };

  const handleBackToMap = () => {
    setGameState('map');
  };

  const handleRestart = () => {
    setPlayerProgress({
      level: 1,
      totalStars: 0,
      badges: [],
      completedLevels: new Set(),
      difficulty: 'medium'
    });
    setCurrentLevel(1);
    setGameState('start');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {gameState === 'start' && <GameStart onStart={handleStartGame} />}
      {gameState === 'map' && (
        <LevelMap
          playerProgress={playerProgress}
          onSelectLevel={handleSelectLevel}
        />
      )}
      {gameState === 'playing' && (
        <LevelGame
          level={currentLevel}
          difficulty={playerProgress.difficulty}
          onComplete={handleLevelComplete}
          onBack={handleBackToMap}
        />
      )}
      {gameState === 'victory' && (
        <VictoryScreen
          playerProgress={playerProgress}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}