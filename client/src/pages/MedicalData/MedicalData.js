import React, { useState, useEffect } from "react";
import "./MedicalData.scss";
import Back from "../../img/back.png";
import Close from "../../img/close.png";
import Footer from "../../components/Footer";
import useCookie from "../../hooks/useCookie"

import Next from "../../img/next.png";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const MedicalData = () => {

  const cookie = useCookie();
  const [userID, setUserID] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    if (cookie) setUserID(cookie.data.user_ID);
  }, [cookie]);

  useEffect(() => {
    if (userID) getData({ user_ID: userID });
  }, [userID]);

  const getData = async (body) => {
    const resp = await axios.post("/user", body)
    setData(resp.data);
  }

  return (
    <div className="MedicalData">
      <div className="container"></div>
      <div className="headerContainer">
        <div className="containerButtonsMD">
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
        <p>
          <h4>Afecciones médicas</h4>
        </p>
        <p>
          <h5>{data ? data.enfermedad : ""}</h5>
        </p>
        <p className="separator"></p>
        <p>
          <h4>Medicación</h4>
        </p>
        <p>
          <h5>{data ? data.medical : ""}</h5>
        </p>
        <p className="separator"></p>
        <p>
          <h4>Grupo Sanguineo</h4>
        </p>
        <p>
          <h5>{data ? data.blood : ""}</h5>
        </p>
        <p className="separator"></p>
        <p>
          <h4>Altura y peso</h4>
        </p>
        <p>
          <h5>{data ? `${data.cm}cm ${data.kg}kg` : ""}</h5>
        </p>
        <p className="separator"></p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MedicalData;
