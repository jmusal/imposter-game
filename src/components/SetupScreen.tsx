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
  const [roundDuration, setRoundDuration] = useState(300);

  const handleStart = () => {
    onStartGame({ playerCount, imposterCount, category, roundDuration });
  };

  const categories = getCategoryNames();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🕵️</div>
          <h1 style={{ fontSize: '32px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
            Imposter Game
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '8px', fontWeight: 500 }}>
            One of you doesn't know the word.
          </p>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--surface)', borderRadius: '16px', padding: '28px', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>

          {/* Players */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
                Players
              </span>
              <span style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)' }}>{playerCount}</span>
            </div>
            <input type="range" min="3" max="8" value={playerCount}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPlayerCount(val);
                if (imposterCount >= Math.floor(val / 2)) setImposterCount(Math.max(1, Math.floor(val / 2) - 1));
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-dim)', marginTop: '6px' }}>
              <span>3</span><span>8</span>
            </div>
          </div>

          {/* Imposters */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
                Imposters
              </label>
              <span style={{ fontSize: '24px', fontWeight: 600, color: 'var(--accent)' }}>{imposterCount}</span>
            </div>
            <input type="range" min="1" max={Math.max(1, Math.floor(playerCount / 2) - 1)} value={imposterCount}
              onChange={(e) => setImposterCount(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-dim)', marginTop: '6px' }}>
              <span>1</span><span>{Math.max(1, Math.floor(playerCount / 2) - 1)}</span>
            </div>
          </div>

          {/* Round Duration */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
                Round Duration
              </label>
              <span style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)' }}>{Math.floor(roundDuration / 60)}m</span>
            </div>
            <input type="range" min="60" max="600" step="60" value={roundDuration}
              onChange={(e) => setRoundDuration(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-dim)', marginTop: '6px' }}>
              <span>1m</span><span>10m</span>
            </div>
          </div>

          {/* Category */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.3px', textTransform: 'uppercase', marginBottom: '10px' }}>
              Category
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)}
                  style={{
                    padding: '8px 4px',
                    fontSize: '12px',
                    fontWeight: 500,
                    borderRadius: '8px',
                    border: category === cat ? '1px solid var(--accent)' : '1px solid var(--border)',
                    background: category === cat ? 'var(--accent-dim)' : 'var(--surface-2)',
                    color: category === cat ? 'var(--accent)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    letterSpacing: '0.2px',
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button onClick={handleStart}
            style={{
              width: '100%',
              padding: '16px',
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
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>
            Start Game →
          </button>
        </div>
      </div>
    </div>
  );
}
