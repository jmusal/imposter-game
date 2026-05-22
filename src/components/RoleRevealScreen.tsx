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
  const progress = ((playersRevealed) / gameState.players.length) * 100;

  const handleRevealRole = () => setRoleRevealed(true);
  const handlePassPhone = () => {
    setRoleRevealed(false);
    onStateChange(markRoleAsSeen(gameState));
  };

  const isImposter = currentPlayer.isImposter;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        {/* Progress */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
              Round {gameState.roundNumber}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
              {playersRevealed + 1} of {gameState.players.length}
            </span>
          </div>
          <div style={{ width: '100%', height: '3px', background: 'var(--surface-2)', borderRadius: '2px' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', borderRadius: '2px', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        {!roleRevealed ? (
          /* Instruction screen */
          <div style={{ background: 'var(--surface)', borderRadius: '16px', padding: '40px 28px', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ fontSize: '36px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
              {currentPlayer.name}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: 500, marginBottom: '40px' }}>
              Make sure no one else is looking
            </p>
            <button
              onClick={handleRevealRole}
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '12px',
                border: '1px solid var(--border-strong)',
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                letterSpacing: '0.3px',
                boxShadow: 'var(--shadow-button)',
                transition: 'opacity 0.15s ease',
                fontFamily: 'inherit',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>
              Reveal My Role
            </button>
          </div>
        ) : (
          /* Role reveal */
          <>
            <div style={{
              background: 'var(--surface)',
              borderRadius: '16px',
              padding: '36px 28px',
              boxShadow: 'var(--shadow-card)',
              border: isImposter ? '1px solid rgba(255,99,99,0.3)' : '1px solid rgba(95,201,146,0.3)',
              textAlign: 'center',
              marginBottom: '16px',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{isImposter ? '🕵️' : '✓'}</div>

              {isImposter ? (
                <>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    You are the imposter
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500, marginBottom: '28px' }}>
                    Figure out the secret word by listening carefully.
                  </p>
                  <div style={{ display: 'inline-block' }}>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.3px', textTransform: 'uppercase', marginBottom: '10px' }}>
                      Your clue
                    </p>
                    <div style={{
                      background: 'var(--accent-dim)',
                      border: '1px solid rgba(255,99,99,0.3)',
                      borderRadius: '10px',
                      padding: '14px 32px',
                      fontSize: '26px',
                      fontWeight: 700,
                      color: 'var(--accent)',
                      letterSpacing: '0.5px',
                    }}>
                      {gameState.categoryHint}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--green)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Regular Player
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500, marginBottom: '28px' }}>
                    Give clues without saying the word. Find the imposter!
                  </p>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.3px', textTransform: 'uppercase', marginBottom: '10px' }}>
                      Secret word
                    </p>
                    <div style={{
                      background: 'rgba(95,201,146,0.1)',
                      border: '1px solid rgba(95,201,146,0.3)',
                      borderRadius: '10px',
                      padding: '14px 32px',
                      fontSize: '30px',
                      fontWeight: 700,
                      color: 'var(--green)',
                      letterSpacing: '0.5px',
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
                padding: '18px',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '12px',
                border: '1px solid var(--border-strong)',
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                letterSpacing: '0.3px',
                boxShadow: 'var(--shadow-button)',
                transition: 'opacity 0.15s ease',
                fontFamily: 'inherit',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>
              {isAllRevealed ? 'Start Round →' : `Pass to ${gameState.players[gameState.currentPlayerIndex + 1]?.name ?? 'Next Player'}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
