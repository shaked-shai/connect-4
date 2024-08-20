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
    //FIXME: check the win by direction and not group
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    let N = newBoard.length;
    let count = 1;
    let queue = [[i, j]];
    let visit = new Set();
    visit.add(`${i},${j}`);
    function checkValidCell(i, j) {
      if (
        i < 0 ||
        j < 0 ||
        i >= N ||
        j >= N ||
        newBoard[i][j] !== color ||
        visit.has(`${i},${j}`)
      ) {
        return false;
      }

      return true;
    }

    while (queue.length) {
      console.log(JSON.stringify(queue));
      console.log(visit);
      let [row, col] = queue.shift();
      for (const [dx, dy] of directions) {
        let [x, y] = [row + dx, col + dy];
        if (checkValidCell(x, y)) {
          if (newBoard[x][y] === color) {
            queue.push([x, y]);
            visit.add(`${x},${y}`);
            count++;
          }
        }
      }
    }

    return count >= 4;
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
                  onClick={() => handleClick(colIndex)}
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
