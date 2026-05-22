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

  const handleFinishVoting = () => {
    onStateChange(calculateResults(gameState));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🗳️</div>
          <h2 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
            Vote
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '8px', fontWeight: 500 }}>
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
              borderRadius: '12px',
              padding: '16px',
              border: player.vote !== undefined ? '1px solid rgba(95,201,146,0.3)' : '1px solid var(--border)',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: player.vote === undefined ? '12px' : 0 }}>
                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {player.name}
                </span>
                {player.vote !== undefined && (
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--green)', letterSpacing: '0.3px' }}>
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
                        fontSize: '12px',
                        fontWeight: 600,
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        background: 'var(--surface-2)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        fontFamily: 'inherit',
                        letterSpacing: '0.2px',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.border = '1px solid var(--accent)';
                        e.currentTarget.style.color = 'var(--accent)';
                        e.currentTarget.style.background = 'var(--accent-dim)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.border = '1px solid var(--border)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.background = 'var(--surface-2)';
                      }}>
                      {target.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  Voted for <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{gameState.players.find((p) => p.id === player.vote)?.name}</span>
                </p>
              )}
            </div>
          ))}
        </div>

        {allVoted && (
          <button
            onClick={handleFinishVoting}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '12px',
              border: '1px solid rgba(95,201,146,0.4)',
              background: 'rgba(95,201,146,0.12)',
              color: 'var(--green)',
              cursor: 'pointer',
              letterSpacing: '0.3px',
              transition: 'opacity 0.15s ease',
              fontFamily: 'inherit',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>
            Reveal Results →
          </button>
        )}
      </div>
    </div>
  );
}
