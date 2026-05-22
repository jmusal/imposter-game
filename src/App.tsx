import { useState } from 'react';
import type { GameState, GameSettings } from './types/game';
import { initializeGame, startNewRound } from './utils/gameLogic';
import SetupScreen from './components/SetupScreen';
import NamesScreen from './components/NamesScreen';
import RoleRevealScreen from './components/RoleRevealScreen';
import ClueRoundScreen from './components/ClueRoundScreen';
import VotingScreen from './components/VotingScreen';
import ResultsScreen from './components/ResultsScreen';
import './App.css';

type AppPhase = 'setup' | 'names' | 'game';

function App() {
  const [appPhase, setAppPhase] = useState<AppPhase>('setup');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [settings, setSettings] = useState<GameSettings | null>(null);

  const handleStartGame = (newSettings: GameSettings) => {
    setSettings(newSettings);
    setAppPhase('names');
  };

  const handleNamesSubmit = (names: string[]) => {
    if (settings) {
      const newGameState = initializeGame(settings, names);
      setGameState(newGameState);
      setAppPhase('game');
    }
  };

  const handleNextRound = (category: string) => {
    if (gameState && settings) {
      const newGameState = startNewRound(gameState, category);
      setGameState(newGameState);
    }
  };

  const handleGameStateUpdate = (newState: GameState) => {
    setGameState(newState);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {appPhase === 'setup' && (
          <SetupScreen onStartGame={handleStartGame} />
        )}
        {appPhase === 'names' && settings && (
          <NamesScreen settings={settings} onNamesSubmit={handleNamesSubmit} />
        )}
        {appPhase === 'game' && gameState && (
          <>
            {gameState.phase === 'roleReveal' && (
              <RoleRevealScreen gameState={gameState} onStateChange={handleGameStateUpdate} />
            )}
            {gameState.phase === 'clueRound' && (
              <ClueRoundScreen gameState={gameState} onStateChange={handleGameStateUpdate} />
            )}
            {gameState.phase === 'voting' && (
              <VotingScreen gameState={gameState} onStateChange={handleGameStateUpdate} />
            )}
            {gameState.phase === 'results' && (
              <ResultsScreen gameState={gameState} onNextRound={handleNextRound} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
