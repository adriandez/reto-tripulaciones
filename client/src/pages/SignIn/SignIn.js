import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPost from "../../hooks/useAxiosPost";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import useCookie from "../../hooks/useCookie";
import { yupResolver } from "@hookform/resolvers/yup";
import signInValidation from "../../validations/signInValidation";
import LogoChair from "../../img/homeLogo.png";
import registerUser from "../../img/registerUser.png"
import registerPass from "../../img/registerPass.png"
import "./SignIn.scss";

const SignIn = () => {
  const cookie = useCookie();

  useEffect(() => {
    if (cookie) {
      if (cookie.data.tutorial) {
        window.location = "/assistant";
      } else {
        window.location = "/map";
      }
    }
  }, [cookie]);

  const [route] = useState("/auth/login");
  const [signIn, setSingIn] = useState();
  useAxiosPost(route, signIn);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInValidation) });

  const onSubmit = (data, e) => {
    setSingIn(data);
    e.target.reset();
  };

  return (
    <section className="Home">
      <div className="weTravel">
        <h1>WeTravel</h1>
      </div>

      <div className="logoChair">
        <img src={LogoChair}></img>
      </div>
      <div className="logInForm">
        <form className="SignIn" onSubmit={handleSubmit(onSubmit)}>
      
          <label htmlFor="email">
            <h2>Inicia sesión</h2>
            <img class="icons" src={registerUser}/> 
            
            <input
              type="text"
              name="Username"
              placeholder="Email*"
              {...register("email")}
            >
       

            </input>
            <p>{errors.email?.message}</p>
          </label>
          <label htmlFor="password">
          <img class="icons" src={registerPass}/> 
            <input
              type="password"
              name="Password"
              placeholder="Contraseña"
              {...register("password")}
            />
            <p>{errors.password?.message}</p>
          </label>
          <h5>¿Has olvidado tu contraseña?</h5>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
