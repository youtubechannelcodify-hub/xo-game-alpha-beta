import React from 'react';

export default function ScoreBoard({ scores, mode }) {
  return (
    <div className="scores">
      <div>
        <span>{mode === 'ai' ? 'You (X)' : 'Player X'}</span>
        <strong>{scores.X}</strong>
      </div>
      <div>
        <span>Draws</span>
        <strong>{scores.draw}</strong>
      </div>
      <div>
        <span>{mode === 'ai' ? 'AI (O)' : 'Player O'}</span>
        <strong>{scores.O}</strong>
      </div>
    </div>
  );
}