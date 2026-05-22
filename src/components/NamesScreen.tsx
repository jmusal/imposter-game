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
    const filledNames = names.map((n, i) => n.trim() || `Player ${i + 1}`);
    onNamesSubmit(filledNames);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
            Who's playing?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '8px', fontWeight: 500 }}>
            {settings.playerCount} players · {settings.imposterCount} imposter{settings.imposterCount > 1 ? 's' : ''} · {settings.category}
          </p>
        </div>

        <div style={{ background: 'var(--surface)', borderRadius: '16px', padding: '28px', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)', marginBottom: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
            {names.map((name, index) => (
              <div key={index}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.3px', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Player {index + 1}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Player ${index + 1}`}
                  style={{
                    width: '100%',
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
                    boxSizing: 'border-box',
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
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
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
              fontFamily: 'inherit',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
