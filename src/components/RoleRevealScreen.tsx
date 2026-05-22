import { useState } from 'react';
import type { GameState } from '../types/game';
import { markRoleAsSeen } from '../utils/gameLogic';

interface RoleRevealScreenProps {
  gameState: GameState;
  onStateChange: (state: GameState) => void;
}

export default function RoleRevealScreen({ gameState, onStateChange }: RoleRevealScreenProps) {
  const [roleRevealed, setRoleRevealed] = useState(false);

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const playersRevealed = gameState.players.filter((p) => p.hasSeenRole).length;
  const isAllRevealed = playersRevealed === gameState.players.length;

  const handleRevealRole = () => {
    setRoleRevealed(true);
  };

  const handlePassPhone = () => {
    setRoleRevealed(false);
    const newState = markRoleAsSeen(gameState);
    onStateChange(newState);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full min-h-screen flex flex-col justify-center">
      {/* Progress */}
      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm font-semibold">
          ROUND {gameState.roundNumber} • Player {playersRevealed + 1} of {gameState.players.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((playersRevealed + 1) / gameState.players.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {!roleRevealed ? (
        <>
          {/* Instruction Screen - "Click to reveal" */}
          <div className="text-center mb-12">
            <p className="text-6xl font-bold text-purple-600 mb-6">{currentPlayer.name}</p>
            <p className="text-2xl text-gray-700 mb-8">Click the button below to reveal your role</p>
            <p className="text-gray-600 mb-6">
              Make sure no one else is looking at the screen!
            </p>

            <button
              onClick={handleRevealRole}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-2xl font-bold py-6 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
            >
              Reveal My Role
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Role Display Screen */}
          <div className="mb-12">
            {currentPlayer.isImposter ? (
              <>
                <div className="bg-red-50 border-4 border-red-400 rounded-xl p-12 text-center mb-8">
                  <p className="text-6xl mb-4">🕵️</p>
                  <p className="text-3xl font-bold text-red-600 mb-6">YOU ARE AN IMPOSTER!</p>
                  <p className="text-lg text-red-700 font-semibold mb-3">Your clue:</p>
                  <div className="bg-red-200 text-red-800 font-bold px-6 py-4 rounded-lg text-2xl inline-block">
                    {gameState.categoryHint}
                  </div>
                </div>
                <p className="text-center text-gray-700 text-lg">
                  You need to figure out the secret word by listening to others' clues. Blend in without revealing yourself!
                </p>
              </>
            ) : (
              <>
                <div className="bg-green-50 border-4 border-green-400 rounded-xl p-12 text-center mb-8">
                  <p className="text-6xl mb-4">✓</p>
                  <p className="text-3xl font-bold text-green-600 mb-4">YOU'RE A REGULAR PLAYER!</p>
                  <p className="text-lg text-green-700 font-semibold mb-4">The secret word is:</p>
                  <p className="text-4xl font-bold text-green-600 bg-white rounded-lg p-6">{gameState.secretWord}</p>
                </div>
                <p className="text-center text-gray-700 text-lg">
                  Give clues to help everyone find the word. Find the imposter without giving away the secret word!
                </p>
              </>
            )}
          </div>

          {/* Pass Phone Button */}
          <button
            onClick={handlePassPhone}
            className="w-full bg-gray-800 text-white text-2xl font-bold py-6 rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-lg"
          >
            {isAllRevealed ? 'Start Game' : 'Pass Phone to Next Player'}
          </button>
        </>
      )}
    </div>
  );
}
