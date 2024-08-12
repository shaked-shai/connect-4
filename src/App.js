import { useState } from "react";
import "./App.css";
import GameStarter from "./components/gameStarter/gameStarter";
import Board from "./components/game/board/board.js";
import SideBar from "./components/game/sideBar/sideBar.js";

const defaultPlayers = {
  1: { id: 1, name: "Player 1", color: "#ff0000" },
  2: { id: 2, name: "Player 2", color: "#0000FF" },
};

function App() {
  const [players, setPlayers] = useState(defaultPlayers);
  const [gameStarted, setGameStarted] = useState(false);

  function handlePlayerNameChange(name, id) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [id]: { ...prevPlayers[id], name },
    }));
  }

  function handlePlayerColorChange(color, id) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [id]: { ...prevPlayers[id], color },
    }));
  }

  function handleAddPlayer() {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [Object.keys(prevPlayers).length + 1]: {
        id: Object.keys(prevPlayers).length + 1,
        name: `Player ${Object.keys(prevPlayers).length + 1}`,
        color: "",
      },
    }));
  }

  function handleGameStart() {
    setGameStarted(true);
  }

  return (
    <div className="App">
      {!gameStarted ? (
        <GameStarter
          players={Object.values(players)}
          onPlayerNameChange={handlePlayerNameChange}
          onPlayerColorChange={handlePlayerColorChange}
          onAddPlayer={handleAddPlayer}
          onStartGame={handleGameStart}
        />
      ) : (
        <div className="game">
          <SideBar players={Object.values(players)} />
          <Board />
        </div>
      )}
    </div>
  );
}

export default App;
