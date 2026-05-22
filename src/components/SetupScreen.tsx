import { useState } from 'react';
import type { GameSettings } from '../types/game';
import { getCategoryNames } from '../data/wordBank';

interface SetupScreenProps {
  onStartGame: (settings: GameSettings) => void;
}

export default function SetupScreen({ onStartGame }: SetupScreenProps) {
  const [playerCount, setPlayerCount] = useState(5);
  const [imposterCount, setImposterCount] = useState(1);
  const [category, setCategory] = useState(getCategoryNames()[0]);
  const [roundDuration, setRoundDuration] = useState(300); // 5 minutes

  const handleStart = () => {
    onStartGame({
      playerCount,
      imposterCount,
      category,
      roundDuration,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">🕵️ Imposter Game</h1>

      <div className="space-y-6">
        {/* Player Count */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Number of Players: <span className="text-purple-600">{playerCount}</span>
          </label>
          <input
            type="range"
            min="3"
            max="8"
            value={playerCount}
            onChange={(e) => setPlayerCount(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>3</span>
            <span>8</span>
          </div>
        </div>

        {/* Imposter Count */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Number of Imposters: <span className="text-purple-600">{imposterCount}</span>
          </label>
          <input
            type="range"
            min="1"
            max={Math.floor(playerCount / 2)}
            value={imposterCount}
            onChange={(e) => setImposterCount(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>1</span>
            <span>{Math.floor(playerCount / 2)}</span>
          </div>
        </div>

        {/* Round Duration */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Round Duration: <span className="text-purple-600">{Math.floor(roundDuration / 60)}m</span>
          </label>
          <input
            type="range"
            min="60"
            max="600"
            step="60"
            value={roundDuration}
            onChange={(e) => setRoundDuration(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>1m</span>
            <span>10m</span>
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3">Word Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-purple-500"
          >
            {getCategoryNames().map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-bold py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg mt-8"
        >
          Start Game
        </button>
      </div>

      <p className="text-center text-gray-600 text-sm mt-6">
        💡 Tip: Pass the phone to each player in turn to reveal their role.
      </p>
    </div>
  );
}
