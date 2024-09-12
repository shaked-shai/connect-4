import { useState } from "react";
import "./board.css";

const defaultBoardHeight = 6;
const defaultBoardWidth = 7;

export default function Board({ players }) {
  const [board, setBoard] = useState(
    Array(defaultBoardHeight)
      .fill()
      .map(() => Array(defaultBoardWidth).fill(null))
  );

  const [currentPlayer, setCurrentPlayer] = useState(0);

  const [winner, setWinner] = useState(null);

  function handleClick(col) {
    setBoard((currentBoard) => {
      const newBoard = currentBoard.map((row) => [...row]);
      for (let i = newBoard.length - 1; i >= 0; i--) {
        if (!newBoard[i][col]) {
          newBoard[i][col] = players[currentPlayer].color;
          if (checkForWin(newBoard, i, col, players[currentPlayer].color)) {
            setWinner(players[currentPlayer]);
          } else {
            setCurrentPlayer((currentPlayer + 1) % Object.keys(players).length);
          }
          break;
        }
      }

      return newBoard;
    });
  }

  function checkForWin(newBoard, i, j, color) {
    const directions = [
      [
        // up and down
        [-1, 0],
        [1, 0],
      ],
      [
        // left and right
        [0, -1],
        [0, 1],
      ],
      [
        // top right and bottom left
        [-1, 1],
        [1, -1],
      ],
      [
        // bottom right and top left
        [1, 1],
        [-1, -1],
      ],
    ];

    function checkValidCell(i, j) {
      if (
        i < 0 ||
        j < 0 ||
        i >= newBoard.length ||
        j >= newBoard[i].length ||
        newBoard[i][j] !== color
      ) {
        return false;
      }

      return true;
    }

    function dfsDirection(i, j, count, directions) {
      if (count === 3 || !checkValidCell(i, j)) {
        return count;
      }

      return dfsDirection(
        i + directions[0],
        j + directions[1],
        count + 1,
        directions
      );
    }
    for (const direct of directions) {
      let directionCount = 1;
      for (const [dx, dy] of direct) {
        directionCount += dfsDirection(i + dx, j + dy, 0, [dx, dy]);
      }

      if (directionCount >= 4) {
        return true;
      }
    }

    return false;
  }

  return (
    <div className="connect4">
      {winner && (
        <div className="winner">
          <h1 style={{ color: winner.color }}>Winner: {winner.name}</h1>
        </div>
      )}
      {
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
                  onClick={() => (winner ? null : handleClick(colIndex))}
                >
                  <div className="disc" style={{ backgroundColor: cell }}></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      }
    </div>
  );
}
