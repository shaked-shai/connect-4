import React from "react";
import "./gameStarter.css";
import PlayerInput from "./playerInput";

function GameStarter({
  players,
  onPlayerNameChange,
  onPlayerColorChange,
  onAddPlayer,
  onStartGame,
}) {
  return (
    <form className="gameStarter">
      <div className="players">
        {players.map((player) => (
          <PlayerInput
            key={player.id}
            player={player}
            onPlayerNameChange={onPlayerNameChange}
            onPlayerColorChange={onPlayerColorChange}
          >
            {player.id}
          </PlayerInput>
        ))}
        <button className="addPlayer" type="button" onClick={onAddPlayer}>
          add Player
        </button>
      </div>
      <button className="startGamebtn" type="submit" onClick={onStartGame}>
        Start Game
      </button>
    </form>
  );
}

export default GameStarter;
