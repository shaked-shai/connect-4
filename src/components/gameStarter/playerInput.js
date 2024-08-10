import React from "react";
import "./playerInput.css";

export default function PlayerInput({ children, player, onPlayerNameChange }) {
  return (
    <div className="player">
      <label>Player {children} Name:</label>
      <input
        type="text"
        value={player.name}
        onChange={(e) => onPlayerNameChange(e.target.value, player.id)}
      />
    </div>
  );
}
