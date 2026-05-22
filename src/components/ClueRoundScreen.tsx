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
      onStateChange(addClue(gameState, clueInput));
      setClueInput('');
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft < 30;
  const progress = (timeLeft / gameState.roundDuration) * 100;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        {/* Timer */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.3px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Round {gameState.roundNumber} — Give your clues
          </p>
          <div style={{
            display: 'inline-block',
            padding: '16px 40px',
            borderRadius: '14px',
            background: isWarning ? 'var(--accent-dim)' : 'var(--surface)',
            border: isWarning ? '1px solid rgba(255,99,99,0.3)' : '1px solid var(--border)',
            boxShadow: 'var(--shadow-card)',
            fontSize: '52px',
            fontWeight: 700,
            color: isWarning ? 'var(--accent)' : 'var(--text-primary)',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-1px',
            transition: 'all 0.3s ease',
          }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          {/* Timer progress bar */}
          <div style={{ width: '100%', height: '3px', background: 'var(--surface-2)', borderRadius: '2px', marginTop: '16px' }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: isWarning ? 'var(--accent)' : 'var(--blue)',
              borderRadius: '2px',
              transition: 'width 1s linear',
            }} />
          </div>
        </div>

        {/* Clue history */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: '14px',
          padding: '20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border)',
          marginBottom: '16px',
          maxHeight: '220px',
          overflowY: 'auto',
        }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.3px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Clues ({gameState.clues.length})
          </p>
          {gameState.clues.length === 0 ? (
            <p style={{ color: 'var(--text-dim)', fontSize: '14px', fontStyle: 'italic' }}>No clues yet...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {gameState.clues.map((clue, idx) => (
                <div key={idx} style={{
                  padding: '10px 14px',
                  background: 'var(--surface-2)',
                  borderRadius: '8px',
                  borderLeft: '2px solid var(--accent)',
                }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dim)', marginRight: '8px' }}>{clue.playerName}</span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{clue.clue}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clue input */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: '14px',
          padding: '20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border)',
          marginBottom: '12px',
        }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.3px', textTransform: 'uppercase', marginBottom: '10px' }}>
            Add a clue
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={clueInput}
              onChange={(e) => setClueInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddClue()}
              placeholder="One word..."
              maxLength={20}
              style={{
                flex: 1,
                padding: '12px 14px',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '15px',
                fontWeight: 500,
                fontFamily: 'inherit',
                outline: 'none',
                letterSpacing: '0.2px',
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid var(--border-strong)';
                e.target.style.boxShadow = '0 0 0 3px var(--blue-dim)';
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid var(--border)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={handleAddClue}
              style={{
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '8px',
                border: '1px solid var(--border-strong)',
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-button)',
                transition: 'opacity 0.15s ease',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>
              Add
            </button>
          </div>
        </div>

        {/* End round */}
        <button
          onClick={() => onStateChange(moveToVoting(gameState))}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '15px',
            fontWeight: 600,
            borderRadius: '12px',
            border: '1px solid rgba(255,99,99,0.3)',
            background: 'var(--accent-dim)',
            color: 'var(--accent)',
            cursor: 'pointer',
            letterSpacing: '0.3px',
            transition: 'opacity 0.15s ease',
            fontFamily: 'inherit',
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>
          End Round & Vote
        </button>
      </div>
    </div>
  );
}
