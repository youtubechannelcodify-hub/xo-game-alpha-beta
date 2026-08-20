import { useState, useCallback } from 'react';

const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

export default function useGameLogic() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [line, setLine] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });

  const check = useCallback((b) => {
    for (let [a,b_,c] of LINES) {
      if (b[a] && b[a] === b[b_] && b[a] === b[c]) return { w: b[a], l: [a,b_,c] };
    }
    return null;
  }, []);

  const click = useCallback((i) => {
    if (winner || board[i]) return;
    const b = [...board];
    b[i] = isX ? 'X' : 'O';
    setBoard(b);
    setIsX(!isX);
    const r = check(b);
    if (r) {
      setWinner(r.w);
      setLine(r.l);
      setScores(s => ({ ...s, [r.w]: s[r.w] + 1 }));
    } else if (b.every(c => c)) {
      setWinner('draw');
      setScores(s => ({ ...s, draw: s.draw + 1 }));
    }
  }, [board, isX, winner, check]);

  const reset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsX(true);
    setWinner(null);
    setLine([]);
  }, []);

  const status = winner === 'draw' ? "It's a Draw!" :
    winner ? `Player ${winner} Wins!` :
    `Player ${isX ? 'X' : 'O'}'s Turn`;

  return { board, winner, line, isX, scores, click, reset, status };
}