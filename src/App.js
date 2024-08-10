import { useState } from "react";
import "./App.css";
import GameStarter from "./components/gameStarter/gameStarter";

const defaultPlayers = {
  1: { id: 1, name: "Player 1" },
  2: { id: 2, name: "Player 2" },
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

  function handleAddPlayer() {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [Object.keys(prevPlayers).length + 1]: {
        id: Object.keys(prevPlayers).length + 1,
        name: `Player ${Object.keys(prevPlayers).length + 1}`,
      },
    }));
  }

  function handleGameStart() {
    setGameStarted(true);
  }

  return (
    <div className="App">
      {!gameStarted && (
        <GameStarter
          players={Object.values(players)}
          onPlayerNameChange={handlePlayerNameChange}
          onAddPlayer={handleAddPlayer}
          onStartGame={handleGameStart}
        />
      )}
    </div>
  );
}

export default App;
