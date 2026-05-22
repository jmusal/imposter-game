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
  const progress = (playersRevealed / gameState.players.length) * 100;
  const isImposter = currentPlayer.isImposter;

  const handleRevealRole = () => setRoleRevealed(true);
  const handlePassPhone = () => {
    setRoleRevealed(false);
    onStateChange(markRoleAsSeen(gameState));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Progress */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
              Round {gameState.roundNumber}
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
              {playersRevealed + 1} of {gameState.players.length}
            </span>
          </div>
          <div style={{ width: '100%', height: '3px', background: 'var(--border)', borderRadius: '2px' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--text-primary)', borderRadius: '2px', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        {!roleRevealed ? (
          <div style={{ background: 'var(--surface)', borderRadius: '20px', padding: '48px 32px', border: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ fontSize: '36px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.8px' }}>
              {currentPlayer.name}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', fontWeight: 400, marginBottom: '40px' }}>
              Make sure no one else is looking
            </p>
            <button
              onClick={handleRevealRole}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                fontWeight: 500,
                borderRadius: '50px',
                border: 'none',
                background: 'var(--text-primary)',
                color: 'var(--bg)',
                cursor: 'pointer',
                letterSpacing: '-0.1px',
                transition: 'opacity 0.15s ease',
                fontFamily: 'inherit',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.75')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>
              Reveal My Role
            </button>
          </div>
        ) : (
          <>
            <div style={{
              background: isImposter
                ? 'linear-gradient(135deg, #fff5f5, #ffffff)'
                : 'linear-gradient(135deg, #f0fff7, #ffffff)',
              borderRadius: '20px',
              padding: '40px 28px',
              border: isImposter ? '2px solid var(--red)' : '2px solid var(--green)',
              textAlign: 'center',
              marginBottom: '16px',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{isImposter ? '🕵️' : '✓'}</div>

              {isImposter ? (
                <>
                  <p style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 500, color: 'var(--red)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    You are the imposter
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: 400, marginBottom: '32px' }}>
                    Figure out the secret word by listening carefully.
                  </p>
                  <div style={{ display: 'inline-block' }}>
                    <p style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Your clue
                    </p>
                    <div style={{
                      background: 'var(--red-dim)',
                      border: '2px solid var(--red)',
                      borderRadius: '16px',
                      padding: '16px 36px',
                      fontSize: '28px',
                      fontWeight: 500,
                      color: 'var(--red)',
                      letterSpacing: '-0.5px',
                    }}>
                      {gameState.categoryHint}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 500, color: 'var(--green)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Regular Player
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: 400, marginBottom: '32px' }}>
                    Give clues without saying the word. Find the imposter!
                  </p>
                  <div>
                    <p style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Secret word
                    </p>
                    <div style={{
                      background: 'var(--green-dim)',
                      border: '2px solid var(--green)',
                      borderRadius: '16px',
                      padding: '16px 36px',
                      fontSize: '32px',
                      fontWeight: 500,
                      color: 'var(--green)',
                      letterSpacing: '-0.8px',
                    }}>
                      {gameState.secretWord}
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handlePassPhone}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                fontWeight: 500,
                borderRadius: '50px',
                border: '1.5px solid var(--border-strong)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                letterSpacing: '-0.1px',
                transition: 'opacity 0.15s ease',
                fontFamily: 'inherit',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.75')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>
              {isAllRevealed ? 'Start Round →' : `Pass to ${gameState.players[gameState.currentPlayerIndex + 1]?.name ?? 'Next Player'}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
