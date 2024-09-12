import { useState } from "react";
import "./App.css";
import GameStarter from "./components/gameStarter/gameStarter";
import Board from "./components/game/board/board.js";
import SideBar from "./components/game/sideBar/sideBar.js";

const defaultPlayers = {
  0: { id: 0, name: "Player 0", color: "red" },
  1: { id: 1, name: "Player 1", color: "blue" },
};

function App() {
  const [players, setPlayers] = useState(defaultPlayers);
  const [gameStarted, setGameStarted] = useState(false);

  function handlePlayerChange(id, player) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [id]: player,
    }));
  }

  /*function handlePlayerNameChange(name, id) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [id]: { ...prevPlayers[id], name },
    }));
  }

  function handlePlayerColorChange(selectedColor, PlayerId) {
    console.log(selectedColor, PlayerId);

    setPlayers((prevPlayers) => {
      const prevColor = prevPlayers[PlayerId].color;

      const updatedPlayer = {
        ...prevPlayers[PlayerId],
        color: selectedColor,
      };

      /*setColors((prevColors) => {
        const updatedColors = { ...prevColors };
        if (prevColor !== "") {
          updatedColors[prevColor].selected = false;
        }
        if (selectedColor !== "") {
          updatedColors[selectedColor].selected = true;
        }
        return updatedColors;
      });

      return {
        ...prevPlayers,
        [PlayerId]: updatedPlayer,
      };
    });
  }*/

  function handleAddPlayer() {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [Object.keys(prevPlayers).length]: {
        id: Object.keys(prevPlayers).length,
        name: `Player ${Object.keys(prevPlayers).length}`,
        color: "",
      },
    }));
  }

  function handleRemovePlayer(id) {
    setPlayers((prevPlayers) => {
      const updatedPlayers = { ...prevPlayers };
      delete updatedPlayers[id];
      return updatedPlayers;
    });
  }

  function handleGameStart() {
    setGameStarted(true);
  }

  return (
    <div className="App">
      {!gameStarted ? (
        <GameStarter
          players={players}
          onPlayerChange={handlePlayerChange}
          onAddPlayer={handleAddPlayer}
          onRemovePlayer={handleRemovePlayer}
          onStartGame={handleGameStart}
        />
      ) : (
        <div className="game">
          <SideBar players={Object.values(players)} />
          <Board players={players} />
        </div>
      )}
    </div>
  );
}

export default App;
