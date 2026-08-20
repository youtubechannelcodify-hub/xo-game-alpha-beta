import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import GameStatus from '../components/GameStatus';
import ScoreBoard from '../components/ScoreBoard';
import useGameLogic from '../hooks/useGameLogic';
import useAI from '../hooks/useAI';

export default function Game() {
  const { mode } = useParams();
  const nav = useNavigate();
  const { getMove } = useAI();
  const { board, winner, line, isX, scores, click, reset, status } = useGameLogic();
  const [diff, setDiff] = useState('medium');

  useEffect(() => {
    if (!['pvp', 'ai'].includes(mode)) nav('/');
  }, [mode, nav]);

  useEffect(() => {
    if (mode === 'ai' && !isX && !winner) {
      const t = setTimeout(() => {
        const m = getMove(board, diff);
        if (m !== null) click(m);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [isX, winner, mode, board, diff, getMove, click]);

  return (
    <div className="game">
      <div className="header">
        <button onClick={() => nav('/')}>← Back</button>
        <h2>{mode === 'ai' ? 'vs AI' : 'Player vs Player'}</h2>
      </div>

      <ScoreBoard scores={scores} mode={mode} />

      <GameStatus
        status={winner ? status : (mode === 'ai' && !isX ? 'AI thinking...' : status)}
        winner={winner}
        onReset={reset}
      />

      <Board
        board={board}
        line={line}
        onClick={click}
      />

      {mode === 'ai' && (
        <div className="difficulty">
          <span>Difficulty:</span>
          <div className="buttons">
            {['easy', 'medium', 'hard'].map(d => (
              <button
                key={d}
                className={diff === d ? 'active' : ''}
                onClick={() => setDiff(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}