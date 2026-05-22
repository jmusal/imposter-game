import { useState } from 'react';
import type { GameSettings } from '../types/game';
import { getCategoryNames } from '../data/wordBank';

export default function SetupScreen({ onStartGame }: { onStartGame: (s: GameSettings) => void }) {
  const [playerCount, setPlayerCount] = useState(5);
  const [imposterCount, setImposterCount] = useState(1);
  const [category, setCategory] = useState(getCategoryNames()[0]);
  const [roundDuration, setRoundDuration] = useState(300);

  const handleStart = () => onStartGame({ playerCount, imposterCount, category, roundDuration });
  const categories = getCategoryNames();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #7b61ff, #ff5eb3, #ffc447)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px', fontSize: '32px'
          }}>🕵️</div>
          <h1 style={{ fontSize: '40px', fontWeight: 500, color: 'var(--text-primary)', margin: 0, letterSpacing: '-1.2px', lineHeight: 1.1 }}>
            Imposter Game
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginTop: '10px', fontWeight: 400, letterSpacing: '-0.2px' }}>
            One of you doesn't know the word.
          </p>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--surface)', borderRadius: '16px', padding: '28px', border: '1px solid var(--border)' }}>

          {/* Players */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                Players
              </span>
              <span style={{ fontSize: '28px', fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>{playerCount}</span>
            </div>
            <input type="range" min="3" max="8" value={playerCount}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPlayerCount(val);
                if (imposterCount >= Math.floor(val / 2)) setImposterCount(Math.max(1, Math.floor(val / 2) - 1));
              }}
            />
          </div>

          {/* Imposters */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                Imposters
              </span>
              <span style={{ fontSize: '28px', fontWeight: 500, color: 'var(--red)', letterSpacing: '-0.5px' }}>{imposterCount}</span>
            </div>
            <input type="range" min="1" max={Math.max(1, Math.floor(playerCount / 2) - 1)} value={imposterCount}
              onChange={(e) => setImposterCount(Number(e.target.value))}
            />
          </div>

          {/* Duration */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                Round Duration
              </span>
              <span style={{ fontSize: '28px', fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>{Math.floor(roundDuration / 60)}m</span>
            </div>
            <input type="range" min="60" max="600" step="60" value={roundDuration}
              onChange={(e) => setRoundDuration(Number(e.target.value))}
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: '32px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Category
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)}
                  style={{
                    padding: '8px 4px',
                    fontSize: '12px',
                    fontWeight: 500,
                    borderRadius: '50px',
                    border: category === cat ? '1.5px solid var(--text-primary)' : '1.5px solid var(--border)',
                    background: category === cat ? 'var(--text-primary)' : 'var(--surface)',
                    color: category === cat ? 'var(--bg)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    letterSpacing: '-0.1px',
                    fontFamily: 'inherit',
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
              padding: '14px',
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
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
