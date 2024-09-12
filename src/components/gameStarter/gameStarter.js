import React, { useState } from "react";
import "./gameStarter.css";
import PlayerInput from "./playerInput";

const defaultColors = {
  green: {
    id: 0,
    color: "green",
    selected: false,
  },
  yellow: {
    id: 1,
    color: "yellow",
    selected: false,
  },
  purple: {
    id: 2,
    color: "purple",
    selected: false,
  },
};

function GameStarter({
  players,
  onPlayerChange,
  onAddPlayer,
  onRemovePlayer,
  onStartGame,
}) {
  const [colors, setColors] = useState(defaultColors);
  const [error, setError] = useState(null);

  function onPlayerNameChange(id, name) {
    const newPlayer = players[id];
    newPlayer.name = name;
    onPlayerChange(id, newPlayer);
  }

  function onPlayerColorChange(selectedColor, PlayerId) {
    setColors((prevColors) => {
      const prevColor = players[PlayerId].color;
      const newPlayer = players[PlayerId];
      newPlayer.color = selectedColor;
      onPlayerChange(PlayerId, newPlayer);

      const updatedColors = { ...prevColors };
      if (prevColor !== "") {
        updatedColors[prevColor].selected = false;
      }
      if (selectedColor !== "") {
        updatedColors[selectedColor].selected = true;
      }

      return updatedColors;
    });
  }

  function handleRemovePlayer(id) {
    if (players[id].color !== "") {
      setColors((prevColors) => {
        const updatedColors = { ...prevColors };
        updatedColors[players[id].color].selected = false;
        return updatedColors;
      });
    }
    onRemovePlayer(id);
  }

  function handleGameStart(e) {
    e.preventDefault();
    if (Object.values(players).some((player) => player.color === "")) {
      setError("Not all players have a color");
      return false;
    } else {
      onStartGame();
    }
  }

  return (
    <form className="gameStarter">
      <div className="players">
        {Object.values(players).map((player) => (
          <PlayerInput
            key={player.id}
            player={player}
            onPlayerNameChange={onPlayerNameChange}
            onPlayerColorChange={onPlayerColorChange}
            onRemovePlayer={handleRemovePlayer}
            colors={colors}
          >
            {player.id}
          </PlayerInput>
        ))}
        <button
          disabled={Object.values(players).length >= 5}
          className={
            "addPlayer " +
            (Object.values(players).length >= 5 ? "disabled" : "")
          }
          type="button"
          onClick={onAddPlayer}
        >
          add Player
        </button>
      </div>
      {error && (
        <div style={{ color: "red" }} className="error-message">
          {error}
        </div>
      )}
      <button className="startGamebtn" type="submit" onClick={handleGameStart}>
        Start Game
      </button>
    </form>
  );
}

export default GameStarter;
