import React from "react";

export default function PlayerTab({ player }) {
  return (
    <li className="playerTab" style={{ backgroundColor: player.color }}>
      <span>{player.name}</span>
    </li>
  );
}
