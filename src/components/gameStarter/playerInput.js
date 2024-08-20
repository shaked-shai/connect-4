import React from "react";
import "./playerInput.css";
import PlayerColorInput from "./playerColorInput";

export default function PlayerInput({
  children,
  player,
  onPlayerNameChange,
  onPlayerColorChange,
  onRemovePlayer,
  colors,
}) {
  return (
    <div className="player-input">
      <label className="player-name-lable">Player {children} Name:</label>
      <input
        type="text"
        className="player-name-input"
        value={player.name}
        onChange={(e) => onPlayerNameChange(e.target.value, player.id)}
      />
      <PlayerColorInput
        player={player}
        colors={colors}
        onPlayerColorChange={onPlayerColorChange}
      />
      {player.id !== 0 && player.id !== 1 && (
        <button
          className="remove-player-button"
          onClick={() => onRemovePlayer(player.id)}
        >
          X
        </button>
      )}
    </div>
  );
}
