import { useState } from 'react';
import type { GameState } from '../types/game';
import { getCategoryNames } from '../data/wordBank';

interface ResultsScreenProps {
  gameState: GameState;
  onNextRound: (category: string) => void;
}

export default function ResultsScreen({ gameState, onNextRound }: ResultsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState(getCategoryNames()[0]);

  // Find who was voted out
  const votes = new Map<number, number>();
  gameState.players.forEach((p) => {
    if (p.vote !== undefined) {
      votes.set(p.vote, (votes.get(p.vote) || 0) + 1);
    }
  });

  let maxVotes = 0;
  let mostVotedId = -1;
  votes.forEach((count, id) => {
    if (count > maxVotes) {
      maxVotes = count;
      mostVotedId = id;
    }
  });

  const votedOutPlayer = gameState.players.find((p) => p.id === mostVotedId);
  const isCrewmateWin = votedOutPlayer?.isImposter;

  // Calculate scores
  const sortedScores = Array.from(gameState.scores.entries())
    .map(([id, score]) => ({
      id,
      score,
      player: gameState.players.find((p) => p.id === id),
    }))
    .filter((s) => s.player)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
      {/* Result Banner */}
      <div
        className={`rounded-xl p-8 mb-8 text-center border-4 ${
          isCrewmateWin
            ? 'bg-green-50 border-green-400'
            : 'bg-red-50 border-red-400'
        }`}
      >
        <p className="text-5xl mb-4">{isCrewmateWin ? '🎉' : '😈'}</p>
        <p className={`text-3xl font-bold mb-4 ${isCrewmateWin ? 'text-green-600' : 'text-red-600'}`}>
          {isCrewmateWin ? 'CREWMATES WIN!' : 'IMPOSTER WINS!'}
        </p>
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          {votedOutPlayer ? `${votedOutPlayer.name} was voted out!` : 'No consensus vote.'}
        </p>
      </div>

      {/* Secret Word Reveal */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 mb-8 text-center border-2 border-purple-300">
        <p className="text-gray-700 font-semibold mb-2">The Secret Word Was:</p>
        <p className="text-4xl font-bold text-purple-600">{gameState.secretWord}</p>
      </div>

      {/* Voted Out Player Details */}
      {votedOutPlayer && (
        <div className="bg-gray-50 rounded-xl p-6 mb-8 border-2 border-gray-300">
          <p className="font-semibold text-gray-800 mb-2">Voted Out:</p>
          <div className="flex items-center gap-4">
            <div className="text-3xl">
              {votedOutPlayer.isImposter ? '🕵️' : '✓'}
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">{votedOutPlayer.name}</p>
              <p className={`font-semibold ${votedOutPlayer.isImposter ? 'text-red-600' : 'text-green-600'}`}>
                {votedOutPlayer.isImposter ? 'IMPOSTER' : 'REGULAR PLAYER'}
              </p>
            </div>
            <div className="ml-auto text-2xl font-bold text-gray-700">
              {maxVotes} vote{maxVotes !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      )}

      {/* Scores */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <p className="font-semibold text-gray-800 mb-4">Scores:</p>
        <div className="space-y-2">
          {sortedScores.map(({ player, score }, idx) => (
            <div key={player!.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-600">
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '•'}
                </span>
                <span className="font-semibold text-gray-800">{player!.name}</span>
              </div>
              <span className="text-lg font-bold text-purple-600">{score} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Round */}
      <div className="space-y-4">
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3">Next Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-purple-500"
          >
            {getCategoryNames().map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => onNextRound(selectedCategory)}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-bold py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
        >
          Play Again
        </button>
      </div>

      <p className="text-center text-gray-600 text-sm mt-6">
        Round {gameState.roundNumber} Complete • Ready for Round {gameState.roundNumber + 1}
      </p>
    </div>
  );
}
