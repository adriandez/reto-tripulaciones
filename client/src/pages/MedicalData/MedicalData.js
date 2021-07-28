import React from "react";
import "./MedicalData.scss";
import Back from "../../img/back.png";
import Close from "../../img/close.png";

import Next from "../../img/next.png";
import { useParams, Link } from "react-router-dom";
const MedicalData = () => {
  return (
    <div className="MedicalData">
      <div className="container"></div>
      <div className="headerContainer">
        <div className="containerButtons">
          <Link to={"/map"}>
            <img className="back" src={Back}></img>
          </Link>{" "}
          Datos médicos 
          <Link to={"/map"}>
            <img className="close" src={Close}></img>
          </Link>
        </div>
      </div>
      <div>
        <p className="separator"></p>
        <p><h4>Afecciones médicas</h4></p>
        <p><h5>Asma</h5></p>
        <p className="separator"></p>
        <p><h4>Afecciones médicas</h4></p>
        <p><h5>Asma</h5></p>
        <p className="separator"></p>
        <p><h4>Afecciones médicas</h4></p>
        <p><h5>Asma</h5></p>
        <p className="separator"></p>
        <p><h4>Afecciones médicas</h4></p>
        <p><h5>Asma</h5></p>
        <p className="separator"></p>
      
        
      </div>
    </div>
  );
};

export default MedicalData;
