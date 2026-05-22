import { useState } from 'react';
import type { GameState } from '../types/game';
import { getCategoryNames } from '../data/wordBank';

interface ResultsScreenProps {
  gameState: GameState;
  onNextRound: (category: string) => void;
}

export default function ResultsScreen({ gameState, onNextRound }: ResultsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState(getCategoryNames()[0]);

  const votes = new Map<number, number>();
  gameState.players.forEach((p) => {
    if (p.vote !== undefined) votes.set(p.vote, (votes.get(p.vote) || 0) + 1);
  });

  let maxVotes = 0;
  let mostVotedId = -1;
  votes.forEach((count, id) => {
    if (count > maxVotes) { maxVotes = count; mostVotedId = id; }
  });

  const votedOutPlayer = gameState.players.find((p) => p.id === mostVotedId);
  const impostersFound = votedOutPlayer?.isImposter;

  const sortedScores = Array.from(gameState.scores.entries())
    .map(([id, score]) => ({ id, score, player: gameState.players.find((p) => p.id === id) }))
    .filter((s) => s.player)
    .sort((a, b) => b.score - a.score);

  const imposters = gameState.players.filter((p) => p.isImposter);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        {/* Result banner */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: '16px',
          padding: '32px 24px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-card)',
          border: impostersFound ? '1px solid rgba(95,201,146,0.3)' : '1px solid rgba(255,99,99,0.3)',
          marginBottom: '12px',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>{impostersFound ? '🎉' : '😈'}</div>
          <p style={{
            fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase',
            color: impostersFound ? 'var(--green)' : 'var(--accent)',
            marginBottom: '6px',
          }}>
            {impostersFound ? 'Players Win' : 'Imposter Wins'}
          </p>
          <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
            {votedOutPlayer ? `${votedOutPlayer.name} was voted out` : 'No consensus'}
          </p>

          {/* Secret word */}
          <div style={{ display: 'inline-block', background: 'var(--surface-2)', borderRadius: '10px', padding: '10px 24px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.3px', textTransform: 'uppercase', marginBottom: '4px' }}>
              The word was
            </p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
              {gameState.secretWord}
            </p>
          </div>
        </div>

        {/* Imposters reveal */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: '14px',
          padding: '18px 20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border)',
          marginBottom: '12px',
        }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.3px', textTransform: 'uppercase', marginBottom: '12px' }}>
            The imposters were
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {imposters.map((p) => (
              <span key={p.id} style={{
                padding: '6px 14px',
                background: 'var(--accent-dim)',
                border: '1px solid rgba(255,99,99,0.3)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--accent)',
              }}>
                🕵️ {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* Scores */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: '14px',
          padding: '18px 20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border)',
          marginBottom: '16px',
        }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.3px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Scores
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {sortedScores.map(({ player, score }, idx) => (
              <div key={player!.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: idx === 0 ? 'rgba(255,188,51,0.08)' : 'var(--surface-2)',
                borderRadius: '8px',
                border: idx === 0 ? '1px solid rgba(255,188,51,0.2)' : '1px solid transparent',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '·'}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{player!.name}</span>
                  {player!.isImposter && <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>imposter</span>}
                </div>
                <span style={{ fontSize: '15px', fontWeight: 700, color: idx === 0 ? '#ffbc33' : 'var(--text-secondary)' }}>
                  {score} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next round */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: '14px',
          padding: '20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border)',
          marginBottom: '12px',
        }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.3px', textTransform: 'uppercase', marginBottom: '10px' }}>
            Next category
          </p>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
              cursor: 'pointer',
            }}>
            {getCategoryNames().map((cat) => (
              <option key={cat} value={cat} style={{ background: 'var(--surface)' }}>{cat}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => onNextRound(selectedCategory)}
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
          Play Again →
        </button>

        <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '12px', marginTop: '16px' }}>
          Round {gameState.roundNumber} complete
        </p>
      </div>
    </div>
  );
}
