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
      <div style={{ width: '100%', maxWidth: '440px' }}>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
            Round {gameState.roundNumber} — Give your clues
          </span>
        </div>

        {/* Timer */}
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: isWarning ? 'var(--red-dim)' : 'var(--surface)',
          borderRadius: '20px',
          border: isWarning ? '2px solid var(--red)' : '1px solid var(--border)',
          marginBottom: '16px',
        }}>
          <div style={{
            fontSize: '52px',
            fontWeight: 500,
            color: isWarning ? 'var(--red)' : 'var(--text-primary)',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-2px',
            lineHeight: 1,
          }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div style={{ width: '100%', height: '3px', background: 'var(--border)', borderRadius: '2px', marginTop: '16px' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: isWarning ? 'var(--red)' : 'var(--text-primary)', borderRadius: '2px', transition: 'width 1s linear' }} />
          </div>
        </div>

        {/* Clue history */}
        <div style={{ background: 'var(--surface)', borderRadius: '16px', padding: '20px', border: '1px solid var(--border)', marginBottom: '12px', maxHeight: '240px', overflowY: 'auto' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            Clues ({gameState.clues.length})
          </span>
          {gameState.clues.length === 0 ? (
            <p style={{ color: 'var(--text-dim)', fontSize: '15px', fontStyle: 'italic' }}>No clues yet...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {gameState.clues.map((clue, idx) => (
                <div key={idx} style={{ padding: '10px 14px', background: 'var(--surface-2)', borderRadius: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-dim)', marginRight: '8px', fontFamily: 'monospace', letterSpacing: '0.3px', textTransform: 'uppercase' }}>{clue.playerName}</span>
                  <span style={{ fontSize: '15px', fontWeight: 400, color: 'var(--text-primary)' }}>{clue.clue}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clue input */}
        <div style={{ background: 'var(--surface)', borderRadius: '16px', padding: '20px', border: '1px solid var(--border)', marginBottom: '12px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
            Add a clue
          </span>
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
                padding: '12px 16px',
                background: 'var(--surface-2)',
                border: '1.5px solid var(--border)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '16px',
                fontWeight: 400,
                fontFamily: 'inherit',
                outline: 'none',
                letterSpacing: '-0.1px',
              }}
              onFocus={(e) => { e.target.style.border = '1.5px dashed var(--text-primary)'; }}
              onBlur={(e) => { e.target.style.border = '1.5px solid var(--border)'; }}
            />
            <button
              onClick={handleAddClue}
              style={{
                padding: '12px 22px',
                fontSize: '15px',
                fontWeight: 500,
                borderRadius: '50px',
                border: 'none',
                background: 'var(--text-primary)',
                color: 'var(--bg)',
                cursor: 'pointer',
                transition: 'opacity 0.15s ease',
                fontFamily: 'inherit',
                letterSpacing: '-0.1px',
                whiteSpace: 'nowrap',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.75')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>
              Add
            </button>
          </div>
        </div>

        <button
          onClick={() => onStateChange(moveToVoting(gameState))}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '15px',
            fontWeight: 500,
            borderRadius: '50px',
            border: '1.5px solid var(--red)',
            background: 'var(--red-dim)',
            color: 'var(--red)',
            cursor: 'pointer',
            letterSpacing: '-0.1px',
            transition: 'opacity 0.15s ease',
            fontFamily: 'inherit',
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.75')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>
          End Round & Vote
        </button>
      </div>
    </div>
  );
}
