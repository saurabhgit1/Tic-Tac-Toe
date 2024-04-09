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

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setxIsNext] = useState(true);

  function squareClick(i) {
    if (squares[i]) {
      return;
    }
    const nextSquare = squares.slice();
    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
    setSquares(nextSquare);
    setxIsNext(!xIsNext);
    console.log("sqqqq", squares);
  }

  return (
    <>
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

// A JSX element is a combination of JavaScript code and HTML tags that describes what you’d like to display

// Lifting state into a parent component is common when React components are refactored.

// setters of useState are async - you won't get updated value just after setValue
