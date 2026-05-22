export type GamePhase = 'setup' | 'roleReveal' | 'clueRound' | 'voting' | 'results';

export interface Player {
  id: number;
  name: string;
  isImposter: boolean;
  hasSeenRole: boolean;
  vote?: number; // ID of player they voted for
  isRegularPlayer?: boolean; // true if NOT imposter (renamed from "crewmate")
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  numImposters: number;
  roundDuration: number; // in seconds
  secretWord: string;
  categoryHint: string;
  exampleWords: string[]; // Examples for imposters to help them guess
  clues: { playerId: number; playerName: string; clue: string }[];
  timeRemaining: number;
  currentPlayerIndex: number;
  scores: Map<number, number>; // player id -> score
  roundNumber: number;
}

export interface GameSettings {
  playerCount: number;
  imposterCount: number;
  category: string;
  roundDuration: number;
}
