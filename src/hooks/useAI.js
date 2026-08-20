import { useCallback } from 'react';

const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

export default function useAI() {
  const evaluate = (b, ai, hu) => {
    for (let [a,b_,c] of LINES) {
      if (b[a] && b[a] === b[b_] && b[a] === b[c])
        return b[a] === ai ? 10 : -10;
    }
    return 0;
  };

  const alphabeta = (b, d, a, beta, max, ai, hu) => {
    const s = evaluate(b, ai, hu);
    if (s === 10) return s - d;
    if (s === -10) return s + d;
    if (b.every(c => c)) return 0;

    const moves = b.map((c, i) => c ? null : i).filter(i => i !== null);
    
    if (max) {
      let best = -Infinity;
      for (let m of moves) {
        b[m] = ai;
        best = Math.max(best, alphabeta([...b], d+1, a, beta, false, ai, hu));
        a = Math.max(a, best);
        if (beta <= a) break;
        b[m] = null;
      }
      return best;
    } else {
      let best = Infinity;
      for (let m of moves) {
        b[m] = hu;
        best = Math.min(best, alphabeta([...b], d+1, a, beta, true, ai, hu));
        beta = Math.min(beta, best);
        if (beta <= a) break;
        b[m] = null;
      }
      return best;
    }
  };

  const getMove = useCallback((board, diff, ai = 'O') => {
    const moves = board.map((c, i) => c ? null : i).filter(i => i !== null);
    if (!moves.length) return null;

    if (diff === 'easy') return moves[Math.floor(Math.random() * moves.length)];
    if (diff === 'medium' && Math.random() < 0.4) return moves[Math.floor(Math.random() * moves.length)];

    const hu = ai === 'X' ? 'O' : 'X';
    const order = [4, 0, 2, 6, 8, 1, 3, 5, 7];
    moves.sort((a, b) => order.indexOf(a) - order.indexOf(b));

    let best = -Infinity, bestMove = moves[0];
    for (let m of moves) {
      board[m] = ai;
      const score = alphabeta([...board], 0, -Infinity, Infinity, false, ai, hu);
      board[m] = null;
      if (score > best) { best = score; bestMove = m; }
    }
    return bestMove;
  }, []);

  return { getMove };
}