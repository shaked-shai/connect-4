import React from "react";
import PlayerTab from "./playerTab";
import "./playerList.css";

export default function PlayerList({ players }) {
  return (
    <ul className="playerList">
      {players.map((player) => (
        <PlayerTab key={player.id} player={player} />
      ))}
    </ul>
  );
}
