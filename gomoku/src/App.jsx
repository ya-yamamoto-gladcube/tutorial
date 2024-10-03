import { useState } from "react";
import "./App.css";

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [square, setSquares] = useState(Array(9).fill(null)); // [null,null,null]
  const [currentMove , setCurrentMove] = useState(0);
  const currentSquares = history[history.length - 1];
  // console.log(currentSquares)

  // [X,O,X]
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0,currentMove + 1),nextSquares]
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = move + "番目に戻る";
    } else {
      description = 'スタートに戻る';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handlclick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handlclick(0)} />
        <Square value={squares[1]} onSquareClick={() => handlclick(1)} />
        <Square value={squares[2]} onSquareClick={() => handlclick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handlclick(3)} />
        <Square value={squares[4]} onSquareClick={() => handlclick(4)} />
        <Square value={squares[5]} onSquareClick={() => handlclick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handlclick(6)} />
        <Square value={squares[7]} onSquareClick={() => handlclick(7)} />
        <Square value={squares[8]} onSquareClick={() => handlclick(8)} />
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
