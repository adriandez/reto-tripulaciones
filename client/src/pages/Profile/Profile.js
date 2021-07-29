import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPost from "../../hooks/useAxiosPost";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import useCookie from "../../hooks/useCookie";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpValidation from "../../validations/signUpValidation"
import Back from "../../img/back.png";
import Close from "../../img/close.png";
import Avatar from "../../img/avatarProfile.png"
import Next from "../../img/nextBlack.png";
import Cookies from "universal-cookie";
import Footer  from "../../components/Footer";
import "./Profile.scss";
const cookies = new Cookies();



const SignUp = () => {
  const cookie = useCookie();
  const [name, setName] = useState();

useEffect(() => {
  if (cookie) setName(cookie.data.name);
}, [cookie]);


  const logout = () =>{
    cookies.remove("reto")
    window.location = "/home";
  }
  
  return (
    <div className="Profile"> 
    <div className="SingUpContainer">
   
   <h1>Mi perfil</h1>
 
      <div className="avatar">
<img src={Avatar}></img>
<h4>{name}</h4>
      </div>
      <div className="containerButtonsProfile"
>     <button>
            <Link to={"/profileData/"}>Datos personales</Link>
            <img src={Next} />
          </button>
          <br/>
          <button>
            <Link to={"/medicaldata/"}>Datos médicos</Link>
            <img src={Next} />
          </button>
          <br/>
          <button>
            <Link to={"/profileData/"}>Promociones</Link>
            <img src={Next} />
          </button>
          </div> 
      <div className="logUpForm">
        <h4 onClick={logout}>Cerrar sesión</h4>
      </div>
      <Footer></Footer>
    </div>
    </div>
  );
};

export default SignUp;
