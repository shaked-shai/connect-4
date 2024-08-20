import React from "react";

export default function PlayerColorInput({
  player,
  colors,
  onPlayerColorChange,
}) {
  if (player.id === 0 || player.id === 1) {
    return (
      <div style={{ backgroundColor: player.color, color: "white", width: 30 }}>
        {player.color}
      </div>
    );
  }
  return (
    <select
      className="player-color"
      value={player.color}
      style={{ backgroundColor: player.color }}
      onChange={(e) => onPlayerColorChange(e.target.value, player.id)}
    >
      <option value="">Select Color</option>
      {player.color && <option value={player.color}>{player.color}</option>}
      {Object.values(colors).map((color) => {
        return !color.selected ? (
          <option
            key={color.color}
            value={color.color}
            disabled={color.selected}
            style={
              color.selected
                ? { backgroundColor: "gray" }
                : { backgroundColor: color.color }
            }
          >
            {color.color}
          </option>
        ) : null;
      })}
    </select>
  );
}
