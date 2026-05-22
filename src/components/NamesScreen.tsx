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
      <div style={{ width: '100%', maxWidth: '440px' }}>

        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 500, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.8px' }}>
            Who's playing?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginTop: '8px', fontWeight: 400 }}>
            {settings.playerCount} players · {settings.imposterCount} imposter{settings.imposterCount > 1 ? 's' : ''}
          </p>
        </div>

        <div style={{ background: 'var(--surface)', borderRadius: '16px', padding: '28px', border: '1px solid var(--border)', marginBottom: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {names.map((name, index) => (
              <div key={index}>
                <label style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Player {index + 1}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Player ${index + 1}`}
                  style={{
                    width: '100%',
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
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1.5px dashed var(--text-primary)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1.5px solid var(--border)';
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
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
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
