import { useState } from "react";

function Square({ value, handleClick }) {
  // const [value, setValue] = useState(null);
  // function squareClick() {
  //   setValue("X");
  // }
  return (
    // <button className="square" onClick={squareClick}>
    //   {value}
    // </button>
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, handlePlay, history }) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [xIsNext, setxIsNext] = useState(true);
  let gameEnd = false;
  let squares = history;

  function squareClick(i) {
    if (squares[i] || gameEnd) {
      return;
    }
    const nextSquare = squares.slice();
    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
    // setSquares(nextSquare);
    // setxIsNext(!xIsNext);
    handlePlay(nextSquare);
    console.log("sqqqq", squares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    gameEnd = true;
    status = "Winner: " + winner;
  } else {
    status = "Next Chance: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} handleClick={() => squareClick(0)} />
        <Square value={squares[1]} handleClick={() => squareClick(1)} />
        <Square value={squares[2]} handleClick={() => squareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleClick={() => squareClick(3)} />
        <Square value={squares[4]} handleClick={() => squareClick(4)} />
        <Square value={squares[5]} handleClick={() => squareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleClick={() => squareClick(6)} />
        <Square value={squares[7]} handleClick={() => squareClick(7)} />
        <Square value={squares[8]} handleClick={() => squareClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // const [xIsNext, setxIsNext] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  function gamePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // setxIsNext(!xIsNext);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setxIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, index) => {
    let description;
    if (index > 0) {
      description = "Go to move: " + index;
    } else {
      description = "Go to game start";
    }

    return (
      <>
        <li key={index}>
          <button
            onClick={() => {
              jumpTo(index);
            }}
          >
            {description}
          </button>
        </li>
      </>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          history={currentSquares}
          handlePlay={gamePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// A JSX element is a combination of JavaScript code and HTML tags that describes what you’d like to display

// Lifting state into a parent component is common when React components are refactored.

// setters of useState are async - you won't get updated value just after setValue, 
// when component will re render then you will get updated value
// you can make it sync using callback

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
