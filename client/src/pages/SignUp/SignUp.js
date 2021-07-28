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
import Avatar from "../../img/avatar.png"
import Eye from  "../../img/eye.png"

import "./SignUp.scss";

const SignUp = () => {
  const cookie = useCookie();

  useEffect(() => {
    if (cookie) {
      if (cookie.data.auth) {
        window.location = "/map";
      }
    }
  }, [cookie]);

  const [route] = useState("/auth/createUser");
  const [signUp, setSingUp] = useState();
  const response = useAxiosPost(route, signUp);

  if (response !== undefined && response.status === 200)
    window.location = "/signin";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpValidation) });

  const onSubmit = (data, e) => {
    setSingUp(data);
    e.target.reset();
  };

  return (
    <div className="SingUpContainer">
   
      <Link aria-label="Ir hacia atras" to="/home">
        <BiArrowBack />
      </Link>
      <div className="containerButtonsSU">
          <Link to={"/map"}>
            <img className="back" src={Back}></img>
          </Link>{" "}
          <Link to={"/map"}>
            <img className="close" src={Close}></img>
          </Link>
        </div>
      <div className="avatar">
<img src={Avatar}></img>
<h6>Sube tu foto de perfil</h6>
      </div>
   
      <div className="logUpForm">
     
      <form   onSubmit={handleSubmit(onSubmit)}>
        <label>
       
          <input type="text" placeholder="Nombre y apellidos*" name="name" {...register("name")} />
          <p>{errors.name?.message}</p>
        </label>
        <label>
     
          <input type="email"  placeholder="Email" name="email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </label>
        <label>
        <img className="eye" src={Eye}></img>
          <input type="password"  placeholder="Contraseña" name="password" {...register("password")} />
          <p>{errors.password?.message}</p>
        </label>
        <label>
        <img className="eye" src={Eye}></img>
          <input type="password" placeholder="Repetir contraseña" name="password2" {...register("password2")} />
          <p>{errors.password2?.message}</p>
        </label>
        <div className="checkbox">
        <input type="checkbox"/>He leído y acepto los términos y condiciones 
        <br></br>
        <input type="checkbox"/>Acepto recibir emails con promociones
        </div>

        <button type="submit">Acceder</button>
      </form>
      </div>
    </div>
  );
};

export default SignUp;
