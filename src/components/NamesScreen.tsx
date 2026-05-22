import React from 'react';
import type { GameSettings } from '../types/game';

interface NamesScreenProps {
  settings: GameSettings;
  onNamesSubmit: (names: string[]) => void;
}

export default function NamesScreen({ settings, onNamesSubmit }: NamesScreenProps) {
  const [names, setNames] = React.useState<string[]>(
    Array.from({ length: settings.playerCount }, (_, i) => `Player ${i + 1}`)
  );

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleSubmit = () => {
    const filledNames = names.map((n) => n.trim() || `Player ${names.indexOf(n) + 1}`);
    onNamesSubmit(filledNames);
  };

  const allFilled = names.every((n) => n.trim().length > 0);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Enter Player Names</h2>

      <p className="text-center text-gray-600 mb-6">
        Give each player a name so we know who's who!
      </p>

      <div className="space-y-3 mb-8">
        {names.map((name, index) => (
          <div key={index}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Player {index + 1}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              placeholder={`Enter name for Player ${index + 1}`}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-purple-500"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!allFilled}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-bold py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Game
      </button>

      <p className="text-center text-gray-600 text-sm mt-6">
        💡 You can skip and use default names if you prefer
      </p>
    </div>
  );
}
