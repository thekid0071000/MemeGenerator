import React from "react";
import trollFace from "./images/trollface.png";

export default function Header() {
  // Simple header component.
  return (
    <header className="Header">
      <div className="Container">
        <img src={trollFace} alt="troll" className="TrollFace"></img>
        <h1>Meme Generator</h1>
      </div>
      <h3>React Course - Project 3</h3>
    </header>
  );
}
