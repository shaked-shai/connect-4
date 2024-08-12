import React from "react";
import "./playerInput.css";

export default function PlayerInput({
  children,
  player,
  onPlayerNameChange,
  onPlayerColorChange,
}) {
  return (
    <div className="player-input">
      <label>Player {children} Name:</label>
      <input
        type="text"
        className="playerName"
        value={player.name}
        onChange={(e) => onPlayerNameChange(e.target.value, player.id)}
      />
      <input
        type="color"
        className="playerColor"
        value={player.color}
        onChange={(e) => onPlayerColorChange(e.target.value, player.id)}
      />
    </div>
  );
}
