import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Tutorial.scss";

const Tutorial = () => {
  const nextPage = (page) => {
    console.log(page);

    if (page == 1) {
      document.getElementById("tuto1").style.display = "none";
      document.getElementById("tuto2").style.display = "block";
    }
    if (page == 2) {
      document.getElementById("tuto2").style.display = "none";
      document.getElementById("tuto3").style.display = "block";
    }
    if (page == 3) {
      document.getElementById("tuto3").style.display = "none";
      document.getElementById("tutoContainer").style.display = "none";
    }
  };

  const finishTutorial = () => {
    document.getElementById("tutoContainer").style.display = "none";
  };
  return (
    <div id="tutoContainer" className="Tutorial">
      <div id="tuto1" className="tuto1">
        <p className="saltar">
          <Link onClick={() => finishTutorial()}>Saltar tutorial</Link>
        </p>
        <button className="next" onClick={() => nextPage("1")}>→</button>

        <p>Descubre</p>
        <p>Los aseos accesibles</p>
        <p>cercanos a tu zona (por ej.)</p>
      </div>
      <div id="tuto2" className="tuto2">
        <p className="saltar">
          <Link onClick={() => finishTutorial()}>Saltar tutorial</Link>
        </p>
        <button className="next" onClick={() => nextPage("2")}>→</button>

        <p>Valora</p>
        <p>Tu aporte creará una</p>
        <p>comunidad mejor para todos</p>
      </div>
      <div id="tuto3" className="tuto3">
        <p className="saltar">
          <Link onClick={() => finishTutorial()}>Saltar tutorial</Link>
        </p>
        <button className="next" onClick={() => nextPage("3")}>→</button>

        <p>Planifica</p>
        <p>Activa recordatorios</p>
        <p>para organizar mejor el</p>
        <p>viaje</p>
      </div>
    </div>
  );
};

export default Tutorial;
