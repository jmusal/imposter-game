import { useState } from 'react';
import type { GameState } from '../types/game';
import { castVote, calculateResults } from '../utils/gameLogic';

interface VotingScreenProps {
  gameState: GameState;
  onStateChange: (state: GameState) => void;
}

export default function VotingScreen({ gameState, onStateChange }: VotingScreenProps) {
  const [votedPlayers, setVotedPlayers] = useState<Set<number>>(new Set());
  const allVoted = votedPlayers.size === gameState.players.length;

  const handleVote = (voterId: number, votedForId: number) => {
    onStateChange(castVote(gameState, voterId, votedForId));
    setVotedPlayers((prev) => new Set([...prev, voterId]));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🗳️</div>
          <h2 style={{ fontSize: '32px', fontWeight: 500, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.8px' }}>
            Vote
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginTop: '8px', fontWeight: 400 }}>
            Who do you think is the imposter?
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '13px', marginTop: '4px' }}>
            {votedPlayers.size} of {gameState.players.length} voted
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          {gameState.players.map((player) => (
            <div key={player.id} style={{
              background: 'var(--surface)',
              borderRadius: '16px',
              padding: '16px 20px',
              border: player.vote !== undefined ? '2px solid var(--green)' : '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: player.vote === undefined ? '12px' : 0 }}>
                <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {player.name}
                </span>
                {player.vote !== undefined && (
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 500, color: 'var(--green)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                    ✓ voted
                  </span>
                )}
              </div>

              {player.vote === undefined ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {gameState.players.filter((p) => p.id !== player.id).map((target) => (
                    <button
                      key={target.id}
                      onClick={() => handleVote(player.id, target.id)}
                      style={{
                        padding: '8px 4px',
                        fontSize: '13px',
                        fontWeight: 500,
                        borderRadius: '50px',
                        border: '1.5px solid var(--border)',
                        background: 'var(--surface-2)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        fontFamily: 'inherit',
                        letterSpacing: '-0.1px',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.border = '1.5px solid var(--red)';
                        e.currentTarget.style.color = 'var(--red)';
                        e.currentTarget.style.background = 'var(--red-dim)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.border = '1.5px solid var(--border)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.background = 'var(--surface-2)';
                      }}>
                      {target.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 400 }}>
                  Voted for <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{gameState.players.find((p) => p.id === player.vote)?.name}</span>
                </p>
              )}
            </div>
          ))}
        </div>

        {allVoted && (
          <button
            onClick={() => onStateChange(calculateResults(gameState))}
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
            Reveal Results →
          </button>
        )}
      </div>
    </div>
  );
}
