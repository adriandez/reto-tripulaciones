import React ,{useState, useEffect} from "react";
import Back from "../../img/back.png";
import Close from "../../img/close.png";
import GirlChair from "../../img/girlChair.png";
import Next from "../../img/next.png";
import { useParams, Link } from "react-router-dom";
import "./Assistant.scss";
import useCookie from "../../hooks/useCookie";

const Assistant = () => {

const cookie = useCookie();
const [ name, setName ] = useState();

useEffect(() => {
  if (cookie) setName(cookie.data.name);
}, [cookie]);


  return (
    <div className="container">
      <div className="Assistant">
        <div className="containerButtonsAssistant">
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
          <h2>!{name}¡</h2>
          <p>
            Para poder mejorar tu experiencia y ayudarte en caso de emergencia ,
            nos gustaría conocerte algo mejor
          </p>
          <button>
            <Link to={"/profileData/"}>!Sí, claro¡</Link>
            <img src={Next} />
          </button>
          <h5> <Link to={"/map"}>  En otro momento</Link></h5>
          <p>
            Estos datos no los almacenaremos ni compartiremos con terceros.Son Privados
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
