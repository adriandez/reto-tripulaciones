import React from "react";
import Back from "../../img/back.png";
import Close from "../../img/close.png";
import GirlChair from "../../img/girlChair.png";
import Next from "../../img/next.png";
import { useParams, Link } from "react-router-dom";
import "./Assistant.scss";

const Assistant = () => {
  return (
    <div className="container">
      <div className="Assistant">
        <div className="containerButtons">
          <Link to={"/map"}>
            <img className="back" src={Back}></img>
          </Link>{" "}
          <Link to={"/map"}>
            <img className="close" src={Close}></img>
          </Link>
        </div>
        <div className="imgContainer">
          <img src={GirlChair}></img>
        </div>
        <div className="containerInfo">
          <h2>!Hola Yuri¡</h2>
          <p>
            Para poder mejorar tu experiencia y ayudarte en caso de emergencia ,
            nos gustaría conocerte algo mejor
          </p>
          <button>
            !Sí, claro¡
            <img src={Next} />
          </button>
          <h5>En otro momento</h5>
          <p>
            Estos datos no los almacenaremos ni compartiremos con terceros.Son Privados
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
