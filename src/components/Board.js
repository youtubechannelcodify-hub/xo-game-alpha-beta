import React from 'react';

function Square({ v, i, win, onClick }) {
  return (
    <button
      className={`square ${v ? v.toLowerCase() : ''} ${win ? 'win' : ''}`}
      onClick={() => onClick(i)}
      disabled={!!v}
    >
      {v}
    </button>
  );
}

export default function Board({ board, line, onClick }) {
  return (
    <div className="board">
      {[0, 3, 6].map(start => (
        <div key={start} className="row">
          {[0, 1, 2].map(offset => {
            const i = start + offset;
            return (
              <Square
                key={i}
                v={board[i]}
                i={i}
                win={line.includes(i)}
                onClick={onClick}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}