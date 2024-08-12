import React from "react";
import "./sideBar.css";
import PlayerList from "./playerList";

export default function SideBar({ players }) {
  return (
    <div className="sideBar">
      <h1>Connect-4</h1>
      <hr />

      <PlayerList players={players} />
    </div>
  );
}
