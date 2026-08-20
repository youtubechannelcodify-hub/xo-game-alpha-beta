import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const nav = useNavigate();
  return (
    <div className="home">
      <h1>Tic Tac Toe</h1>
      <div className="modes">
        <button onClick={() => nav('/game/pvp')}>
          <span className="icon">👥</span>
          Player vs Player
        </button>
        <button onClick={() => nav('/game/ai')}>
          <span className="icon">🤖</span>
          Player vs AI
        </button>
      </div>
    </div>
  );
}