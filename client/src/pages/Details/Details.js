import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import GoogleIcon from "../../img/ggmaps.png";
import iconLocation from "../../img/iconLocation.png";
import Back from "../../img/back.png";
import Close from "../../img/close.png";
import Clock from "../../img/clock.png";
import Ok from "../../img/ok.png";

import axios from "axios";
import "./Details.scss";

import Footer from "../../components/Footer"
const Details = () => {
  const [wcDetails, setwcDetails] = useState([]);
  const [showDiv, setShowDiv] = useState(false)
  const params = useParams();

  useEffect(() => {
  
    if(showDiv==false){
      document.getElementById("lineResume").style.display="block"
      document.getElementById("lineResena").style.display="none"
      document.getElementById("resume").style.display="block"
      document.getElementById("resena").style.display="none"
    }
    else if(showDiv==true){
      document.getElementById("lineResume").style.display="none"
      document.getElementById("lineResena").style.display="block"
      document.getElementById("resume").style.display="none"
      document.getElementById("resena").style.display="block"

    }

  }, [showDiv])
  useEffect(() => {
    axios(`/aseos/details/${params.id}`).then((resultado) => {
      setwcDetails(resultado.data);
    });
  }, []);

  const info = () => {
    return (
      <p>
        <h2>{wcDetails.nombre}</h2>
        <img src="https://fotografias.antena3.com/clipping/cmsimages02/2020/04/27/EEAB541D-C2A5-4254-A620-5F597E99F93D/58.jpg"></img>
        <button>
          <a
            href={`http://www.google.com/maps/place/${wcDetails.latitud},${wcDetails.longitud}`}
          >
            Cómo llegar{" "}
          </a>
        </button>
      </p>
    );
  };
 
  const containerInfo = () => {
    return (
      <div className="containerInfoDetails">
        <table >
          <tr  >
            <td>
            <h3 onClick={()=>setShowDiv(false)}>Resumen</h3>
            </td>
            <td>
            <h3 onClick={()=>setShowDiv(true)}>Reseña</h3>
            </td>
          </tr>
        </table>
        <div className="lineHead">
              <div id="lineResume" className="lineResume"></div>
              <div id="lineResena" className="lineResena"></div>
            </div>
        <div id="resume" className="resumen">
          <p>
            
          </p>

          <table>
            <tr>
              <td>
                <img className="okIcon" src={Ok} /> Rampa{" "}
              </td>
              <td>
                <img className="okIcon" src={Ok} /> Secador{" "}
              </td>
            </tr>
            <tr>
              <td>
                <img className="okIcon" src={Ok} /> Barras de apoyo{" "}
              </td>
              <td>
                <img className="okIcon" src={Ok} /> Espejo abatible{" "}
              </td>
            </tr>
          </table>
          <div className="line"></div>
          <table className="openWc">
            <tr className="locationInfo">
              <td className="iconLocation">
                {" "}
                <img src={iconLocation}></img>{" "}
              </td>
              <td>{wcDetails.direccion}</td>
            </tr>

            <div className="line2"></div>

            <tr className="locationInfo">
              <td className="iconLocation">
           
                <img src={Clock}></img> 
              </td>
              <td className="hour">
                <h6 className="open">Abierto - 09:00 a 22:00</h6> 
              </td>
            </tr>
          </table>
        </div>
        <div id="resena" className="resena">
          <div className="gallery">
            <img src="https://static1.elcomercio.es/www/multimedia/201711/14/media/cortadas/bano-publico-kP7-U50125382146OHD-624x385@El%20Comercio.jpg"></img>
            <img src="https://blog.ineleconline.com/hubfs/Blog%20Post/1906/BP%203%20%283%29.jpg"></img>
            <img src="https://blog.ineleconline.com/hs-fs/hubfs/Blog%20Post/1905/BP%204/BP%204%20(1).jpg?width=1206&name=BP%204%20(1).jpg"></img>
           <img src="https://blog.ineleconline.com/hs-fs/hubfs/Blog%20Post/1807/BP%203/INC%20-%20180625%20-%20BP%203-%20%20ba%C3%B1o.jpg?width=1200&name=INC%20-%20180625%20-%20BP%203-%20%20ba%C3%B1o.jpg"></img>
          </div>
          <button>Escribir reseña</button>
        </div>
      </div>
    );
  };

 
  return (
    <div>
    <div className="Details">
      <div className="container">
        <div className="containerButtonsDetails">
          <Link to={"/map"}>
            <img className="back" src={Back}></img>
          </Link>{" "}
          <Link to={"/map"}>
            <img className="close" src={Close}></img>
          </Link>
        </div>

        <p></p>
        {info()}
        {containerInfo()}
      </div>
     
    </div>
    <Footer></Footer>
    </div>
  );
};

export default Details;
