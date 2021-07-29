import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Tutorial.scss";
import axios from "axios";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const Tutorial = () => {
  const [token, setToken] = useState();
  const [ tutorial, setTutorial ] =useState();

  useEffect(() => {
    let checkingCookie = cookies.get("reto");
    setToken(checkingCookie);
  }, []);

  useEffect(() => {
    const putTutorial = async () =>
      await axios.put("/tutorials", { tutorial: false }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (tutorial) putTutorial();
  }, [tutorial,token]);

  const nextPage = (page) => {
   
    if (page === "1") {
      document.getElementById("tuto1").style.display = "none";
      document.getElementById("tuto2").style.display = "block";
      document.getElementById("footer1").style.display = "none";
      document.getElementById("footer2").style.display = "block";
      document.getElementById("footer2-1").style.display = "block";
    }
    if (page === "2") {
      document.getElementById("footer2").style.display = "none";
      document.getElementById("footer2-1").style.display = "none";
      document.getElementById("tuto2").style.display = "none";
      document.getElementById("tuto3").style.display = "block";
      document.getElementById("footer3").style.display = "block";

      document.getElementById("footer3").style.display = "block";
      document.getElementById("footer3-1").style.display = "block";
    }
    if (page === "3") {
      document.getElementById("footer3").style.display = "none";
      document.getElementById("footer3-1").style.display = "none";
      document.getElementById("tuto3").style.display = "none";
      document.getElementById("tuto4").style.display = "block";
      document.getElementById("footer4").style.display = "block";
    }
    if (page === "4") {
      document.getElementById("footer4").style.display = "none";

      document.getElementById("tuto4").style.display = "none";

      finishTutorial();
    }
  };

  const finishTutorial = async () => {
    document.getElementById("tutoContainer").style.display = "none";
    setTutorial(true)
  };
  return (
    <div id="tutoContainer" className="Tutorial">
      <div id="tuto1" className="tuto1">
        <p className="saltar">
          <Link onClick={() => finishTutorial()}>Saltar tutorial</Link>
        </p>
        <button className="next" onClick={() => nextPage("1")}>
          →
        </button>

        <p>Descubre</p>
        <p>Los aseos accesibles</p>
        <p>cercanos a tu zona </p>
      </div>
      <div id="tuto2" className="tuto2">
        <p className="saltar">
          <Link onClick={() => finishTutorial()}>Saltar tutorial</Link>
        </p>
        <button className="next" onClick={() => nextPage("2")}>
          →
        </button>

        <p>Valora</p>
        <p>Tu aporte creará una</p>
        <p>comunidad mejor para todos</p>
      </div>
      <div id="tuto3" className="tuto3">
        <p className="saltar">
          <Link onClick={() => finishTutorial()}>Saltar tutorial</Link>
        </p>
        <button className="next" onClick={() => nextPage("3")}>
          →
        </button>

        <p>Planifica</p>
        <p>Activa recordatorios</p>
        <p>para organizar mejor el</p>
        <p>viaje</p>
      </div>

      <div id="tuto4" className="tuto4">
        <p className="saltar">
          <Link onClick={() => finishTutorial()}>Saltar tutorial</Link>
        </p>
        <button className="next" onClick={() => nextPage("4")}>
          →
        </button>

        <p>Descubre</p>
        <p>Los aseos accesibles</p>
        <p>cercanos a tu zona </p>
      </div>

      <div className="menuTutoContainer">
        <div id="footer1" className="footer1"></div>
        <div id="footer2" className="footer2"></div>
        <div id="footer2-1" className="footer2-1"></div>
        <div id="footer3" className="footer3"></div>
        <div id="footer3-1" className="footer3-1"></div>
        <div id="footer4" className="footer4"></div>
      </div>
    </div>
  );
};

export default Tutorial;
