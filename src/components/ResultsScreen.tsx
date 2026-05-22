import type { GameState } from '../types/game';
import { getCategoryNames } from '../data/wordBank';
import { useState } from 'react';

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
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Result banner */}
        <div style={{
          background: impostersFound
            ? 'linear-gradient(135deg, #f0fff7, #ffffff)'
            : 'linear-gradient(135deg, #fff5f5, #ffffff)',
          borderRadius: '20px',
          padding: '36px 24px',
          textAlign: 'center',
          border: impostersFound ? '2px solid var(--green)' : '2px solid var(--red)',
          marginBottom: '12px',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>{impostersFound ? '🎉' : '😈'}</div>
          <p style={{
            fontFamily: 'monospace', fontSize: '12px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase',
            color: impostersFound ? 'var(--green)' : 'var(--red)',
            marginBottom: '6px',
          }}>
            {impostersFound ? 'Players Win' : 'Imposter Wins'}
          </p>
          <p style={{ fontSize: '18px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '20px', letterSpacing: '-0.2px' }}>
            {votedOutPlayer ? `${votedOutPlayer.name} was voted out` : 'No consensus'}
          </p>

          <div style={{ display: 'inline-block', background: 'var(--surface-2)', borderRadius: '16px', padding: '12px 28px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '4px' }}>
              The word was
            </p>
            <p style={{ fontSize: '28px', fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              {gameState.secretWord}
            </p>
          </div>
        </div>

        {/* Imposters reveal */}
        <div style={{ background: 'var(--surface)', borderRadius: '16px', padding: '18px 20px', border: '1px solid var(--border)', marginBottom: '12px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            The imposters were
          </span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {imposters.map((p) => (
              <span key={p.id} style={{
                padding: '6px 14px',
                background: 'var(--red-dim)',
                border: '1.5px solid var(--red)',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--red)',
                letterSpacing: '-0.1px',
              }}>
                🕵️ {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* Scores */}
        <div style={{ background: 'var(--surface)', borderRadius: '16px', padding: '18px 20px', border: '1px solid var(--border)', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            Scores
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {sortedScores.map(({ player, score }, idx) => (
              <div key={player!.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: idx === 0 ? 'rgba(255,196,71,0.1)' : 'var(--surface-2)',
                borderRadius: '12px',
                border: idx === 0 ? '1.5px solid rgba(255,196,71,0.3)' : '1.5px solid transparent',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '·'}
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)' }}>{player!.name}</span>
                  {player!.isImposter && <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--red)', fontWeight: 500, letterSpacing: '0.3px', textTransform: 'uppercase' }}>imposter</span>}
                </div>
                <span style={{ fontSize: '15px', fontWeight: 500, color: idx === 0 ? '#c88600' : 'var(--text-secondary)' }}>
                  {score} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next round */}
        <div style={{ background: 'var(--surface)', borderRadius: '16px', padding: '20px', border: '1px solid var(--border)', marginBottom: '12px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
            Next category
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'var(--surface-2)',
              border: '1.5px solid var(--border)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontSize: '15px',
              fontWeight: 400,
              fontFamily: 'inherit',
              outline: 'none',
              letterSpacing: '-0.1px',
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
          Play Again →
        </button>

        <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '13px', marginTop: '16px' }}>
          Round {gameState.roundNumber} complete
        </p>
      </div>
    </div>
  );
}
