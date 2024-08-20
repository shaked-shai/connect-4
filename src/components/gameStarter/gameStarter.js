import React from "react";
import "./gameStarter.css";
import PlayerInput from "./playerInput";

function GameStarter({
  //FIXME: cant start game if players dont have color
  players,
  onPlayerNameChange,
  onPlayerColorChange,
  onAddPlayer,
  onRemovePlayer,
  onStartGame,
  colors,
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
            onRemovePlayer={onRemovePlayer}
            colors={colors}
          >
            {player.id}
          </PlayerInput>
        ))}
        <button
          disabled={players.length >= 5}
          className={"addPlayer " + (players.length >= 5 ? "disabled" : "")}
          type="button"
          onClick={onAddPlayer}
        >
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
