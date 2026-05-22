import { useState } from 'react';
import type { GameState } from '../types/game';
import { castVote, calculateResults } from '../utils/gameLogic';

interface VotingScreenProps {
  gameState: GameState;
  onStateChange: (state: GameState) => void;
}

export default function VotingScreen({ gameState, onStateChange }: VotingScreenProps) {
  const [votedPlayers, setVotedPlayers] = useState<Set<number>>(new Set());
  const allVoted = votedPlayers.size === gameState.players.length;

  const handleVote = (voterId: number, votedForId: number) => {
    const newState = castVote(gameState, voterId, votedForId);
    onStateChange(newState);

    const newVoted = new Set(votedPlayers);
    newVoted.add(voterId);
    setVotedPlayers(newVoted);
  };

  const handleFinishVoting = () => {
    const resultsState = calculateResults(gameState);
    onStateChange(resultsState);
  };

  const handleQuickVoteAll = () => {
    let newState = { ...gameState };
    gameState.players.forEach((player) => {
      if (player.vote === undefined) {
        // Skip themselves, vote for first non-self player
        const target = gameState.players.find((p) => p.id !== player.id);
        if (target) {
          newState = castVote(newState, player.id, target.id);
        }
      }
    });
    onStateChange(newState);
    setVotedPlayers(new Set(gameState.players.map((p) => p.id)));
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">🗳️ Voting Time!</h2>

      <p className="text-center text-gray-700 mb-8 text-lg">
        Each player votes for who they think is the imposter.
      </p>

      <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
        {gameState.players.map((player) => (
          <div key={player.id} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-800">
                {player.name}
                {player.vote !== undefined && (
                  <span className="ml-2 text-green-600 font-bold">✓ Voted</span>
                )}
              </p>
            </div>

            {player.vote === undefined ? (
              <div className="grid grid-cols-3 gap-2">
                {gameState.players
                  .filter((p) => p.id !== player.id)
                  .map((target) => (
                    <button
                      key={target.id}
                      onClick={() => handleVote(player.id, target.id)}
                      className="bg-purple-500 text-white font-semibold py-2 px-3 rounded-lg hover:bg-purple-600 transition-all duration-200 text-sm"
                    >
                      {target.name}
                    </button>
                  ))}
              </div>
            ) : (
              <div className="bg-green-100 border-2 border-green-400 rounded-lg p-3 text-center">
                <p className="text-green-800 font-semibold">
                  Voted for: <span className="text-lg">{gameState.players.find((p) => p.id === player.vote)?.name}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {!allVoted && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleQuickVoteAll}
            className="flex-1 bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 text-lg"
          >
            Auto-Fill Votes
          </button>
        </div>
      )}

      {allVoted && (
        <button
          onClick={handleFinishVoting}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-xl"
        >
          Reveal Results
        </button>
      )}

      <p className="text-center text-gray-600 text-sm mt-4">
        Progress: {votedPlayers.size} / {gameState.players.length} voted
      </p>
    </div>
  );
}
