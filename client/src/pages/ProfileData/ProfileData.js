import React from "react";
import Back from "../../img/back.png";
import Close from "../../img/close.png";
import "./ProfileData.scss";

 
 
import {  Link } from "react-router-dom";

const ProfileData = () => {




const formData = (e) =>{

  e.preventDefault();

  console.log(e.target.phone.value)
  console.log(e.target.apoyo.value)
  console.log(e.target.kg.value)
  console.log(e.target.cm.value)
  console.log(e.target.blood.value)
  console.log(e.target.enfermedad.value)
  console.log(e.target.medicamentos.value)
  


}








  return (
    <div className="containerProfileData">
     
          <div className="containerButtons">
          <Link to={"/map"}>
            <img className="back" src={Back}></img>
          </Link>{" "}
          <Link to={"/map"}>
            <img className="close" src={Close}></img>
          </Link>
        </div>
        <form onSubmit={formData}>
        <div className="formContainer">
          <h2>Datos Discapacidad</h2>
          <h5>¿Necesitas apoyo de alguien para poder hacer tus tareas diarias?</h5>
          <div className="containerButtons">
          <button name="apoyo" value="false">No, puedo yo sólo/a  </button>
          <button name="apoyo" value="true"> Sí, necesito ayuda  </button>
          
          </div>
          <h5>¿Podrías darnos el teléfono de alguien a quien llamar en caso de una emergencia?</h5>
          <select></select>
          <input type="number" name="phone" placeholder="Escribe el teléfono"></input>
          <h5>¿Cuánto pesas?</h5>
          <input   type="number" name="kg" placeholder="kg"></input>
          <h5>¿Cuánto mides?</h5>
          <input   type="number" name="cm"  placeholder="cm"></input>
          <h5>¿Cuál es tu grupo sanguíneo?</h5>
 
          <div className="blood">
          <button name="blood" value="+A">+A</button>
          <button name="blood" value="-A">-A</button>
          <button name="blood" value="+B">+B</button>
          <button name="blood" value="-A">-B</button>
          <button name="blood" value="+0">+0</button>
        
          </div>
          <h5>¿Padeces alguna enfermedad?</h5>
          <input   type="text" name="enfermedad"  placeholder="Escribe aquí"></input>
          <h5>¿Tomas alguna medicación?</h5>
          <input   type="text" name="medicamentos"  placeholder="Escribe aquí"></input>
          





          <button type="submit">Terminar</button>

        </div>
        
        </form>
    </div>
  )
}

export default ProfileData
