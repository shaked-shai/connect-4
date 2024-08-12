import { useState } from "react";
import "./board.css";

const defaultBoardHeight = 6;
const defaultBoardWidth = 7;

export default function Board() {
  const [board, setBoard] = useState(
    Array(defaultBoardHeight)
      .fill()
      .map(() => Array(defaultBoardWidth).fill(null))
  );

  function handleClik(col) {
    setBoard((currentBoard) => {
      const newBoard = currentBoard.map((row) => [...row]);
      for (let i = newBoard.length - 1; i >= 0; i--) {
        if (!newBoard[i][col]) {
          newBoard[i][col] = "";
          break;
        }
      }

      return newBoard;
    });
  }
  return (
    <div className="connect4">
      <div
        className="board"
        style={{ gridTemplateRows: `repeat(${board.length}, 1fr)` }}
      >
        {board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row"
            style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}
          >
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                onClick={() => handleClik(colIndex)}
              >
                <div className="disc" style={{ backgroundColor: cell }}></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
