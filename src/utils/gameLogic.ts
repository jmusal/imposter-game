import type { Player, GameState, GameSettings } from '../types/game';
import { getRandomWord } from '../data/wordBank';

export const initializeGame = (settings: GameSettings, playerNames: string[]): GameState => {
  const players: Player[] = Array.from({ length: settings.playerCount }, (_, i) => ({
    id: i,
    name: playerNames[i] || `Player ${i + 1}`,
    isImposter: false,
    hasSeenRole: false,
    vote: undefined,
  }));

  // Randomly assign imposters
  const imposterIndices = new Set<number>();
  while (imposterIndices.size < settings.imposterCount) {
    imposterIndices.add(Math.floor(Math.random() * settings.playerCount));
  }

  players.forEach((p) => {
    p.isImposter = imposterIndices.has(p.id);
  });

  const secretWordData = getRandomWord(settings.category);

  return {
    phase: 'roleReveal',
    players,
    numImposters: settings.imposterCount,
    roundDuration: settings.roundDuration,
    secretWord: secretWordData.word,
    categoryHint: secretWordData.hint,
    exampleWords: [], // No longer needed - we use specific word hints
    clues: [],
    timeRemaining: settings.roundDuration,
    currentPlayerIndex: 0,
    scores: new Map(),
    roundNumber: 1,
  };
};

export const moveToNextRoleReveal = (state: GameState): GameState => {
  const allRevealed = state.players.every((p) => p.hasSeenRole);

  if (allRevealed) {
    // All players have seen their roles, move to clue round
    return {
      ...state,
      phase: 'clueRound',
      timeRemaining: state.roundDuration,
      currentPlayerIndex: 0,
    };
  }

  // Find next player who hasn't seen their role
  const nextIndex = state.players.findIndex((p) => !p.hasSeenRole);

  return {
    ...state,
    currentPlayerIndex: nextIndex,
  };
};

export const markRoleAsSeen = (state: GameState): GameState => {
  const updated = { ...state };
  updated.players[state.currentPlayerIndex].hasSeenRole = true;
  return moveToNextRoleReveal(updated);
};

export const addClue = (state: GameState, clue: string): GameState => {
  const player = state.players[state.currentPlayerIndex];
  return {
    ...state,
    clues: [
      ...state.clues,
      {
        playerId: player.id,
        playerName: player.name,
        clue,
      },
    ],
  };
};

export const moveToVoting = (state: GameState): GameState => {
  return {
    ...state,
    phase: 'voting',
    timeRemaining: 0,
  };
};

export const castVote = (state: GameState, voterId: number, votedForId: number): GameState => {
  const updated = { ...state };
  const voter = updated.players.find((p) => p.id === voterId);
  if (voter) {
    voter.vote = votedForId;
  }
  return updated;
};

export const calculateResults = (state: GameState): GameState => {
  const votes = new Map<number, number>();
  state.players.forEach((p) => {
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

  const updated = { ...state };
  updated.phase = 'results';

  // Award points
  if (mostVotedId >= 0) {
    const votedPlayer = updated.players[mostVotedId];
    if (votedPlayer.isImposter) {
      // Crewmates win
      updated.players.forEach((p) => {
        if (!p.isImposter) {
          updated.scores.set(p.id, (updated.scores.get(p.id) || 0) + 1);
        }
      });
    } else {
      // Imposter wins
      updated.players.forEach((p) => {
        if (p.isImposter) {
          updated.scores.set(p.id, (updated.scores.get(p.id) || 0) + 1);
        }
      });
    }
  }

  return updated;
};

export const startNewRound = (state: GameState, category: string): GameState => {
  const settings: GameSettings = {
    playerCount: state.players.length,
    imposterCount: state.numImposters,
    category,
    roundDuration: state.roundDuration,
  };

  const playerNames = state.players.map(p => p.name);
  const newGameState = initializeGame(settings, playerNames);
  newGameState.scores = state.scores;
  newGameState.roundNumber = state.roundNumber + 1;

  return newGameState;
};
