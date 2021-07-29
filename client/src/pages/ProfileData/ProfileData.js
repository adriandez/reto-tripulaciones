import React, { useState ,useEffect} from "react";
import Back from "../../img/back.png";
import Close from "../../img/close.png";
import "./ProfileData.scss";

import { Link } from "react-router-dom";
import axios from "axios";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const ProfileData = () => {
  const [support, setSupport] = useState("");
  const [phone, setPhone] = useState("");
  const [kg, setKg] = useState("");
  const [cm, setCm] = useState("");
  const [blood, setBlood] = useState("");
  const [enfermedad, setEnfermedad] = useState("");
  const [medical, setMedical] = useState("");
  const [data, setData] = useState();
  const [token, setToken ] = useState();

  useEffect(() => {
    
    let checkingCookie = cookies.get("reto");
    setToken(checkingCookie);
  }, []);

 useEffect(() => {
   if (data) sendData(data);
 }, [data])

 const sendData = async (data) => {

  const resp = await axios.put("/user/update", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (resp && resp.statusText === "OK") window.location = "/map";

 }

  const apoyo = (data) => {
    setSupport(data);
  };
  const bloodButton = (data) => {
    setSupport(data);
  };

  const submitData = () => {

    let obj = {
      support,
      phone,
      kg,
      cm,
      blood,
      enfermedad,
      medical,
    };
    setData(obj)

  };

 
  return (
    <div className="containerProfileData">
     
      <div className="containerButtonsPD">
        <Link to={"/assistant"}>
          <img className="back" src={Back}></img>
        </Link>{" "}
        <Link to={"/map"}>
          <img className="close" src={Close}></img>
        </Link>
      </div>

      <div className="formContainer">
        <h2>Datos Discapacidad</h2>
        <h5>
          ¿Necesitas apoyo de alguien para poder hacer tus tareas diarias?
        </h5>
        <div className="containerButtons">
          <button onClick={() => apoyo("false")}>No, puedo yo sólo/a </button>
          <button onClick={() => apoyo("true")}>
            Sí, necesito ayuda{" "}
          </button>{" "}
        </div>
        <h5>
          ¿Podrías darnos el teléfono de alguien a quien llamar en caso de una
          emergencia?
        </h5>
        <select placeholder="+34">
          <option placeholder="+34">+34</option>
        </select>
        <input id="phoneIcon"
          type="number"
          name="phone"
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Escribe el teléfono"
        ></input>
        <h5>¿Cuánto pesas?</h5>
        <input
          type="number"
          name="kg"
          onChange={(event) => setKg(event.target.value)}
         
        >


          
        </input>
        <h5>¿Cuánto mides?</h5>
        <input
          type="number"
          name="cm"
          onChange={(event) => setCm(event.target.value)}
          placeholder="cm"
        >

 

        </input>
        <h5>¿Cuál es tu grupo sanguíneo?</h5>

        <div className="blood">
          <button
            name="blood"
            value="+A"
            onClick={(event) => setBlood(event.target.value)}
          >
            +A
          </button>
          <button
            name="blood"
            value="-A"
            onClick={(event) => setBlood(event.target.value)}
          >
            -A
          </button>
          <button
            name="blood"
            value="+B"
            onClick={(event) => setBlood(event.target.value)}
          >
            +B
          </button>
          <button
            name="blood"
            value="-B"
            onClick={(event) => setBlood(event.target.value)}
          >
            -B
          </button>
          <button
            name="blood"
            value="+0"
            onClick={(event) => setBlood(event.target.value)}
          >
            +0
          </button>
        </div>
        <h5>¿Padeces alguna enfermedad?</h5>
        <input
          type="text"
          name="enfermedad"
          onChange={(event) => setEnfermedad(event.target.value)}
          placeholder="Escribe aquí"
        ></input>
        <h5>¿Tomas alguna medicación?</h5>
        <input
          type="text"
          name="medicamentos"
          onChange={(event) => setMedical(event.target.value)}
          placeholder="Escribe aquí"
        ></input>

        <button type="submit" onClick={submitData}>
          Terminar
        </button>
      </div>
      <div className="message"></div>
    </div>
  );
};

export default ProfileData;
