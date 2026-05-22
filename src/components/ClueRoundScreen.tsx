import { useState, useEffect } from 'react';
import type { GameState } from '../types/game';
import { addClue, moveToVoting } from '../utils/gameLogic';

interface ClueRoundScreenProps {
  gameState: GameState;
  onStateChange: (state: GameState) => void;
}

export default function ClueRoundScreen({ gameState, onStateChange }: ClueRoundScreenProps) {
  const [clueInput, setClueInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(gameState.roundDuration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onStateChange(moveToVoting(gameState));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, onStateChange]);

  const handleAddClue = () => {
    if (clueInput.trim()) {
      const newState = addClue(gameState, clueInput);
      setClueInput('');
      onStateChange(newState);
    }
  };

  const handleEndRound = () => {
    onStateChange(moveToVoting(gameState));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft < 30;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
      {/* Timer */}
      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm font-semibold mb-3">ROUND {gameState.roundNumber}</p>
        <div
          className={`inline-block px-8 py-4 rounded-xl text-5xl font-bold tabular-nums transition-all duration-300 ${
            isWarning
              ? 'bg-red-100 text-red-600 animate-pulse'
              : 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-600'
          }`}
        >
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      {/* Clue History */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6 max-h-64 overflow-y-auto">
        <p className="font-semibold text-gray-800 mb-4">Clues Given ({gameState.clues.length}):</p>
        {gameState.clues.length === 0 ? (
          <p className="text-gray-500 italic">No clues yet...</p>
        ) : (
          <div className="space-y-2">
            {gameState.clues.map((clue, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg border-l-4 border-purple-400">
                <p className="font-semibold text-gray-700">{clue.playerName}</p>
                <p className="text-gray-600">{clue.clue}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mb-6">
        <p className="font-semibold text-gray-800 mb-3">Add a Clue</p>
        <div className="flex gap-3">
          <input
            type="text"
            value={clueInput}
            onChange={(e) => setClueInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddClue();
              }
            }}
            placeholder="Enter one-word clue..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-purple-500"
            maxLength={20}
          />
          <button
            onClick={handleAddClue}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            Add
          </button>
        </div>
      </div>

      {/* End Round Button */}
      <button
        onClick={handleEndRound}
        className="w-full bg-gray-800 text-white text-lg font-bold py-4 rounded-lg hover:bg-gray-900 transition-all duration-200"
      >
        End Round & Vote
      </button>

      <p className="text-center text-gray-600 text-sm mt-4">
        💡 Give one-word clues to help find the secret word! Don't name the word directly.
      </p>
    </div>
  );
}
