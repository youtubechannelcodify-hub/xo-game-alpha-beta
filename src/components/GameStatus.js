import React from 'react';

export default function GameStatus({ status, winner, onReset }) {
  return (
    <div className="status">
      <h3>{status}</h3>
      {winner && <button onClick={onReset}>Play Again</button>}
    </div>
  );
}